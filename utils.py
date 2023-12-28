from datetime import datetime
import os, sys, requests
from urllib.parse import urlencode

GLOBAL_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
}

SESSION = requests.Session()
SESSION.trust_env = False
SESSION.headers = GLOBAL_HEADERS

def get_video_data(**kwargs):
    data = SESSION.get('https://api.bilibili.com/x/web-interface/view?' + urlencode(kwargs))
    if data.status_code == 200:
        data = data.json()
        if data['code'] == 0:
            data = data['data']
            return data
    raise Exception('GET error')

def current_dir() -> tuple[str, str]:
    '''
    当前路径\n
    :return:
        tuple[0]: work directory
        tuple[1]: current file name
    '''
    return os.path.split(os.path.abspath(sys.argv[0]))

def format_timestamp(timestamp):
    date = datetime.fromtimestamp(timestamp)
    year = date.year
    this_year = datetime.now().year

    result = f"{date.month}-{date.day}"

    return result if year == this_year else f"{year}-{result}"

def format_time(seconds):
    if not isinstance(seconds, (int, float)) or seconds < 0:
        return "Invalid input"

    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    remaining_seconds = seconds % 60

    formatted_time = ""

    if hours > 0:
        formatted_time += f"{hours:02d}:"

    formatted_time += f"{minutes:02d}:{remaining_seconds:02d}"

    return formatted_time

def format_stat(data):
    if data >= 1e8:
        return f"{data * 1e-8:.2f}亿"
    elif data >= 1e4:
        return f"{data * 1e-4:.1f}万"
    else:
        return str(data)
