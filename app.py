from flask import Flask, request, jsonify, render_template, session, abort
from concurrent.futures import ThreadPoolExecutor, wait, ALL_COMPLETED
from threading import Thread
import os
import json
import random
import traceback

import user
from score import Score
from utils import *
from predict import get_prediction
from recommend import recommend

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Ciallo~(∠・ω< )⌒★'

DIR = './static/bili/'
ALL_VIDEOS = []
for file in os.listdir(DIR):
    if file.endswith('.json'):
        with open(os.path.join(DIR, file), 'r', encoding='utf-8') as f:
            ALL_VIDEOS += json.load(f)

random.shuffle(ALL_VIDEOS)

video_stat = {
    'coin': '硬币',
    'danmaku': '弹幕',
    'favorite': '收藏',
    'like': '点赞',
    'reply': '回复',
    'share': '分享',
    'view': '观看'
}
summary = {
    'view_popular_subject': '热门主题',
    'view_popular_up': '热门UP主'
}
misc = {
    'wordcloud': '词云'
}
all_available_selections = dict(**video_stat, **summary, **misc)

# 推荐的视频
videos_recommed = []
recommend_thread = None
def do_recommend(scores: Score, n: int = 60):
    global videos_recommed
    print('Recommend Thread Running')
    videos_recommed += recommend(scores, n)

@app.route('/')
def index():
    global recommend_thread

    videos = ALL_VIDEOS
    random.shuffle(videos)

    SIZE = 20

    # 若 登录 -> 启动推荐
    if session.get('id') and (recommend_thread is None or not recommend_thread.is_alive()) and len(videos_recommed) < 100:
        recommend_thread = Thread(target=do_recommend, args=[Score(session.get('id')), SIZE * 4])
        recommend_thread.start()

    recommendations = videos_recommed[:SIZE].copy()
    del videos_recommed[:SIZE]
    recommendations = [video for video in videos if video['aid'] in recommendations]

    # 如果推荐不够了, 补充随机推荐
    recommendations += videos[SIZE:SIZE*2-len(recommendations)]

    videos = videos[:SIZE]

    # 获取在线观看人数, 多线程
    online_viewers = {}
    with ThreadPoolExecutor(SIZE >> 1, 'online-viewers') as executor:
        tasks = {
            video['aid']: executor.submit(lambda video: SESSION.get(f'https://api.bilibili.com/x/player/online/total?aid={video["aid"]}&cid={video["cid"]}'), video)
            for video in videos + recommendations
        }
    wait(tasks.values(), timeout = 10 * SIZE, return_when = ALL_COMPLETED)

    # map to { aid: n }
    online_viewers = {
        aid: max(int(data['total']), int(data['count'])) - 1
        for aid, data in {
            aid: result.json()['data']
            for aid, result in { aid: t.result() for aid, t in tasks.items() }.items()
            if result.status_code == 200 and result.json()['code'] == 0
        }.items()
    }

    return render_template('index.html', videos = { '猜你喜欢': recommendations, '看看更多': videos }, online_viewers = online_viewers,
                           format_timestamp = format_timestamp, format_stat = format_stat, format_time = format_time)

@app.route('/sheet/')
def sheet():
    kw = request.args.get('kw', '')
    page = request.args.get('page', 1, int)
    page_size = request.args.get('pageSize', 30, int)
    sort_by = request.args.get('sortBy', '')
    sort_rev = request.args.get('sortRev', 'false') == 'true'
    show_thumbnail = request.args.get('showThumbnail', 'true') == 'true'

    videos = [v for v in ALL_VIDEOS if kw in v['title'] or kw in v['desc']] if len(kw) else ALL_VIDEOS
    videos_len = len(videos)

    other_params = request.args.copy()
    'page' in other_params.keys() and other_params.pop('page')

    if id := session.get('id'):
        scores = Score(id)
    else:
        scores = {}

    if videos_len > 0:
        # 乱序
        if sort_by == '':
            random.shuffle(videos)
        # 打分排序
        elif sort_by == 'score':
            videos.sort(key = lambda v: Score(id)[v['aid']] or 0, reverse = sort_rev)
        # 其他可行的排序
        else:
            if sort_by in videos[0].keys():
                key = lambda v: v[sort_by]
            else:
                key = None
                for k in videos[0].keys():
                    if isinstance(videos[0][k], dict) and sort_by in videos[0][k].keys():
                        key = lambda v: v[k][sort_by]
                        break
            
            if key is None:
                random.shuffle(videos)
            else:
                videos.sort(key = key, reverse = sort_rev)

    end = min(videos_len, page * page_size)
    
    start = max(0, (page - 1) * page_size)

    return render_template('sheet.html', total = videos_len, max_page = videos_len // page_size + 1, current_page = page, start = start, end = end, data = videos[start:end], scores = scores,
                           show_thumbnail = show_thumbnail, other_params = other_params, kw = kw, sort_by = sort_by, sort_rev = sort_rev,
                           format_timestamp = format_timestamp, format_stat = format_stat, format_time = format_time)

@app.route('/predict/')
def predict():
    return render_template('predict.html', param = '', video_stat = video_stat,
                           format_timestamp = format_timestamp, format_stat = format_stat, format_time = format_time)

@app.route('/predict/<id>')
def predict_with_id(id: str):
    if id.lower().startswith('av'):
        use = 'aid'
        param = id[2:]
    elif id.lower().startswith('bv'):
        use = 'bvid'
        param = id
    else:
        abort(404)

    try:
        data = get_video_data(**{ use: param })
    except:
        traceback.print_exc()
        abort(500)
    
    return render_template('predict.html', use = use, param = param, video = data, video_stat = video_stat,
                           format_timestamp = format_timestamp, format_stat = format_stat, format_time = format_time)

@app.route('/visualize/')
def visualize():
    return render_template('visualize.html', selections = all_available_selections)
    # return redirect('/visualize/wordcloud')

@app.route('/visualize/<key>')
def visualize_with_key(key: str):
    if key not in all_available_selections.keys():
        abort(404)

    if key in video_stat.keys():
        return render_template(f'visualize/{key}_data.html', current = key, selections = all_available_selections)
    
    return render_template(f'visualize/{key}.html', current = key, selections = all_available_selections)

@app.route('/logout/')
def logout():
    if id := session.get('id'):
        session.pop('id')
        return '<script>alert("%s, 你已经成功退出!"); window.close();</script>' % id
    else:
        return '<script>document.location.href = "/";</script>'

# ----------------------------------------------------------------
# API

# 预测
@app.route('/api/predict/', methods=['GET'])
def api_predict():
    return str(get_prediction(get_video_data(aid = request.args.get('aid'))))

# 用户
@app.route('/api/user/')
def get_user() -> 'str | None':
    return session.get('id')

# 登录
@app.route('/api/login', methods=['POST'])
def login_api():
    try:
        data = request.get_json()
        result = user.login(data['id'], data['pw'])
        if result:
            session['id'] = data['id']
        return jsonify({
            'code': 0 if result else 1
        })
    except Exception:
        traceback.print_exc()
        return jsonify({
            'code': -1
        })

# 注册
@app.route('/api/regist', methods=['POST'])
def regist_api():
    try:
        data = request.get_json()
        result = user.register(data['id'], data['pw'])
        if result:
            session['id'] = data['id']
        return jsonify({
            'code': 0 if result else 1
        })
    except Exception:
        traceback.print_exc()
        return jsonify({
            'code': -1
        })

# 更新用户打分数据/获取用户打分数据
@app.route('/api/scores', methods=['GET', 'POST'])
def scores():
    id = session.get('id')
    if id == None:
        return jsonify({
            'message': 'not logged in',
            'data': {}
        })
    
    score_file = Score(id)

    if request.method == 'POST':
        score_file += request.get_json()
                
        return jsonify({
            'message': 'success',
        })

    else:
        return jsonify({
            'message': 'success',
            'data': score_file.to_dict()
        })


 
if __name__ == '__main__':
    app.run(debug=False)
    # app.run(debug=False, host='xxxx', port=5000)


