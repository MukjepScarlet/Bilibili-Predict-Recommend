from pyspark.ml.recommendation import ALS
from pyspark.sql import SparkSession
from pyspark.sql.types import StructType, StructField, IntegerType, StringType, FloatType
from pyspark.sql import Row
from pyspark.sql.functions import coalesce, lit
from pyspark.sql.functions import col

import os, sys

from score import Score

# WINDOWS ENV
os.environ["PYSPARK_DRIVER_PYTHON"] = os.environ['PYSPARK_PYTHON'] = sys.executable
# WINDOWS ENV END

# 初始化 SparkSession
spark = SparkSession.builder.appName('item_based_collaborative_filtering').getOrCreate()

# 读取视频信息数据
video_data_path = 'hdfs://localhost:9000/user/willappear/bilibili_week3.txt'
fields = [
    StructField("avi", IntegerType(), False),
    StructField("up", StringType(), False),
    StructField("time", StringType(), False),
    StructField("title", StringType(), False),
    StructField("desc", StringType(), False),
    StructField("view", IntegerType(), False),
    StructField("danmaku", IntegerType(), False),
    StructField("reply", IntegerType(), False),
    StructField("favorite", IntegerType(), False),
    StructField("coin", IntegerType(), False),
    StructField("share", IntegerType(), False),
    StructField("like", IntegerType(), False),
    StructField("rcmd_reason", StringType(), False),
    StructField("tname", StringType(), False),
    StructField("his_rank", IntegerType(), False),
]

video_data = spark.read.text(video_data_path).rdd \
    .map(lambda x: x[0].split("\t")) \
    .map(lambda x: Row(*[int(x[0]), x[1], x[2], x[3], x[4], int(x[5]), int(x[6]), int(x[7]), int(x[8]), int(x[9]),
                            int(x[10]), int(x[11]), x[12], x[13], int(x[14])])) \
    .toDF(StructType(fields))

def recommend(scores: Score, num_recommendations: int = 20) -> list:
    # 将数据转为 DataFrame
    test_data_rows = [(int(avi), float(rating)) for avi, rating in scores.to_dict().items()]
    test_schema = StructType([StructField("avi", IntegerType(), False), StructField("rating", FloatType(), False)])
    ratings_data = spark.createDataFrame(test_data_rows, schema=test_schema)

    # 合并用户打分数据和视频信息数据
    combined_data = video_data.join(ratings_data, "avi", "left_outer")

    # 统计均值
    mean_rating = combined_data.agg({"rating": "mean"}).collect()[0][0]

    # 如果某个视频没有用户评分信息，设置均值作为评分
    combined_data = combined_data.withColumn("rating", coalesce("rating", lit(mean_rating)))

    # ALS模型训练
    als = ALS(maxIter=10, regParam=0.01, userCol="avi", itemCol="avi", ratingCol="rating",
                coldStartStrategy="drop", nonnegative=True)
    model = als.fit(combined_data)

    # 对所有物品进行预测
    predictions = model.transform(video_data)

    # 过滤掉已经在用户打分视频列表中的视频
    predictions = predictions.join(ratings_data, "avi", "left_anti")

    # 选择排名前几位的物品作为推荐结果
    user_unrated_items = predictions.orderBy(col("prediction").desc()).limit(num_recommendations).select("avi")
    
    return user_unrated_items.rdd.flatMap(lambda x: x).collect()