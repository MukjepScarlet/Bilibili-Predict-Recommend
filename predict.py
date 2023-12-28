from pyspark.ml.classification import GBTClassificationModel
from pyspark.ml.feature import VectorAssembler
from pyspark.sql import SparkSession

import os, sys

from utils import current_dir

# WINDOWS ENV
os.environ["PYSPARK_DRIVER_PYTHON"] = os.environ['PYSPARK_PYTHON'] = sys.executable
# WINDOWS ENV END

spark = SparkSession.builder.appName('model_inference').getOrCreate()
loaded_model = GBTClassificationModel.load(os.path.join(current_dir()[0], 'GBT_model'))

def create_new_feature_vector(video_info: dict):
    global spark
    # 从视频信息中提取用作特征的字段
    features = [video_info["stat"]["view"],
                video_info["stat"]["danmaku"],
                video_info["stat"]["reply"],
                video_info["stat"]["favorite"],
                video_info["stat"]["coin"],
                video_info["stat"]["share"],
                video_info["stat"]["like"]]

    # 创建包含新特征的数据框
    new_feature_data = [tuple(features)]
    new_feature_df = spark.createDataFrame(new_feature_data, schema=['view', 'danmaku', 'reply', 'favorite', 'coin', 'share', 'like'])

    # 使用 VectorAssembler 转换数据框，创建名为 features 的列
    required_features = ['view', 'danmaku', 'reply', 'favorite', 'coin', 'share', 'like']
    assembler = VectorAssembler(
        inputCols=required_features,
        outputCol='features'
    )
    new_feature_df = assembler.transform(new_feature_df)

    return new_feature_df

def get_prediction(video_data: dict) -> float:
    # 创建包含新特征向量的数据框
    new_feature_df = create_new_feature_vector(video_data)
    # 预测
    predictions = loaded_model.transform(new_feature_df)
    # 打印预测结果
    return predictions.select('prediction').collect()[0]['prediction']