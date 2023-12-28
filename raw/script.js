// document.addEventListener("DOMContentLoaded", function () {
//     // Fetch video data and render
//     setTimeout(fetchVideoData, 1000);
//     // fetchVideoData();
// });

// $(document).ready(function () {
//     fetchVideoData();
// });

window.addEventListener('load', function () {fetchVideoData();});

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const thisYear = new Date().getFullYear();

    const result = `${date.getMonth() + 1}-${date.getDate()}`;

    return year === thisYear ? result : `${year}-${result}`;
}

function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0)
        return "Invalid input";

    var hours = ~~(seconds / 3600);
    var minutes = ~~((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;

    var formattedTime = "";

    if (hours > 0)
        formattedTime += hours + ":";

    if (minutes < 10)
        formattedTime += "0";

    formattedTime += minutes + ":";

    if (remainingSeconds < 10)
        formattedTime += "0";

    formattedTime += remainingSeconds;

    return formattedTime;
}

function formatStat(data) {
    if (data >= 1e8) {
        return (data * 1e-8).toFixed(1) + "亿";
    } else if (data >= 1e4) {
        return (data * 1e-4).toFixed(1) + "万";
    } else {
        return data.toString();
    }
}

function fetchVideoData() {
    // Simulate fetching data from an API
    // videoData: Array<Object>
    const videoData = [{
        "aid": 46900196,
        "videos": 1,
        "tid": 250,
        "tname": "出行",
        "copyright": 1,
        "pic": "http://i0.hdslb.com/bfs/archive/f42edcdd84853a06e00a779162fa8655a74030a2.jpg",
        "title": "这集vlog我们拍了十年，致最美好的青春",
        "pubdate": 1553152210,
        "ctime": 1553152210,
        "desc": "我在18岁认识了你，\n然后我们开始了长达8年的异地恋，\n2019年03月16日\n我们在认识十年后终于结婚了，\n这当中的酸甜苦辣只有我们自己能懂。",
        "state": 0,
        "duration": 504,
        "rights": {
            "bp": 0,
            "elec": 0,
            "download": 0,
            "movie": 0,
            "pay": 0,
            "hd5": 1,
            "no_reprint": 1,
            "autoplay": 1,
            "ugc_pay": 0,
            "is_cooperation": 0,
            "ugc_pay_preview": 0,
            "no_background": 0,
            "arc_pay": 0,
            "pay_free_watch": 0
        },
        "owner": {
            "mid": 326257138,
            "name": "AresserA-Vlog",
            "face": "http://i1.hdslb.com/bfs/face/1917454d730732b0b1b091e5cce9f76ad06ea7f3.jpg"
        },
        "stat": {
            "aid": 46900196,
            "view": 5100793,
            "danmaku": 67639,
            "reply": 22102,
            "favorite": 241125,
            "coin": 549871,
            "share": 209277,
            "now_rank": 0,
            "his_rank": 1,
            "like": 499078,
            "dislike": 0,
            "vt": 0,
            "vv": 5100793
        },
        "dynamic": "请允许我在Hyperlapse的Vlog中间插播一集！\n刚拿到婚礼素材，终于可以把这集诠释着我们十年青春的vlog补完整了！",
        "cid": 82142406,
        "dimension": {
            "width": 1920,
            "height": 1080,
            "rotate": 0
        },
        "short_link_v2": "https://b23.tv/BV14b411J7ML",
        "bvid": "BV14b411J7ML",
        "season_type": 0,
        "is_ogv": false,
        "ogv_info": null,
        "enable_vt": 0,
        "ai_rcmd": null,
        "rcmd_reason": "暴风流泪推荐！今天也是为别人的神仙爱情流泪的一天！"
    }, {
        "aid": 47211520,
        "videos": 1,
        "tid": 251,
        "tname": "三农",
        "copyright": 1,
        "pic": "http://i1.hdslb.com/bfs/archive/fd6bc55d9a9a6fe25278670fb2c021580c3503f6.jpg",
        "title": "华农兄弟：兄弟家的鱼跑河里去了，帮他网回来，一网下去还不少",
        "pubdate": 1553427011,
        "ctime": 1553427013,
        "desc": "华农兄弟：兄弟家的鱼跑河里去了，帮他网回来，一网下去还不少",
        "state": 0,
        "duration": 312,
        "rights": {
            "bp": 0,
            "elec": 0,
            "download": 0,
            "movie": 0,
            "pay": 0,
            "hd5": 1,
            "no_reprint": 1,
            "autoplay": 1,
            "ugc_pay": 0,
            "is_cooperation": 0,
            "ugc_pay_preview": 0,
            "no_background": 0,
            "arc_pay": 0,
            "pay_free_watch": 0
        },
        "owner": {
            "mid": 250858633,
            "name": "华农兄弟",
            "face": "https://i1.hdslb.com/bfs/face/bac504655c69ab937b0be4557e27535f794b0c66.jpg"
        },
        "stat": {
            "aid": 47211520,
            "view": 2567171,
            "danmaku": 21671,
            "reply": 5648,
            "favorite": 4640,
            "coin": 28484,
            "share": 2636,
            "now_rank": 0,
            "his_rank": 10,
            "like": 76118,
            "dislike": 0,
            "vt": 0,
            "vv": 2567171
        },
        "dynamic": "华农兄弟：兄弟家的鱼跑河里去了，帮他网回来，一网下去还不少",
        "cid": 82681291,
        "dimension": {
            "width": 3840,
            "height": 2160,
            "rotate": 0
        },
        "short_link_v2": "https://b23.tv/BV15b41147uu",
        "bvid": "BV15b41147uu",
        "season_type": 0,
        "is_ogv": false,
        "ogv_info": null,
        "enable_vt": 0,
        "ai_rcmd": null,
        "rcmd_reason": "村霸兄弟又上线了！这次他们把魔抓伸向了兄弟家的鱼！"
    }, {
        "aid": 46567722,
        "videos": 3,
        "tid": 183,
        "tname": "影视剪辑",
        "copyright": 1,
        "pic": "http://i0.hdslb.com/bfs/archive/9130be4b624afc19e14c1bf702626d869989f8b4.jpg",
        "title": "【性转版】回家的诱惑",
        "pubdate": 1552823023,
        "ctime": 1552823023,
        "desc": "性转版回家的诱惑\n都市男人拯救幸福情仇大戏\n认真你就输了23333",
        "state": 0,
        "duration": 643,
        "rights": {
            "bp": 0,
            "elec": 0,
            "download": 0,
            "movie": 0,
            "pay": 0,
            "hd5": 1,
            "no_reprint": 1,
            "autoplay": 1,
            "ugc_pay": 0,
            "is_cooperation": 0,
            "ugc_pay_preview": 0,
            "no_background": 0,
            "arc_pay": 0,
            "pay_free_watch": 0
        },
        "owner": {
            "mid": 9813844,
            "name": "兰彻lancche",
            "face": "https://i1.hdslb.com/bfs/face/4992595a6351395da73538909fd86bfbd77cc7bf.jpg"
        },
        "stat": {
            "aid": 46567722,
            "view": 4782792,
            "danmaku": 43660,
            "reply": 13030,
            "favorite": 151575,
            "coin": 215393,
            "share": 159338,
            "now_rank": 0,
            "his_rank": 1,
            "like": 249017,
            "dislike": 0,
            "vt": 0,
            "vv": 4782792
        },
        "dynamic": "#回家的诱惑##刘亦菲##刘昊然#",
        "cid": 81577663,
        "dimension": {
            "width": 1920,
            "height": 1080,
            "rotate": 0
        },
        "short_link_v2": "https://b23.tv/BV1xb411n7L6",
        "pub_location": "湖南",
        "bvid": "BV1xb411n7L6",
        "season_type": 0,
        "is_ogv": false,
        "ogv_info": null,
        "enable_vt": 0,
        "ai_rcmd": null,
        "rcmd_reason": "无论是创意、配音还是剪辑，全都是超高质量！"
    }, {
        "aid": 47151947,
        "videos": 1,
        "tid": 253,
        "tname": "动漫杂谈",
        "copyright": 1,
        "pic": "http://i0.hdslb.com/bfs/archive/e5cd89d85f7518ef128400fc677b8cf78cddf78d.jpg",
        "title": "哆啦A梦结局背后的秘密？从未播出的黑历史？真相出人意料",
        "pubdate": 1553396443,
        "ctime": 1553365833,
        "desc": "微博：@瓶子君152\n关注关注关注关注关注关注关注关注关注关注关注关注\n三连三连三连三连三连三连三连三连三连三连三连三连\n谢谢谢谢谢谢谢谢谢谢谢谢谢谢谢谢谢谢谢谢谢谢谢谢",
        "state": 0,
        "duration": 415,
        "rights": {
            "bp": 0,
            "elec": 0,
            "download": 0,
            "movie": 0,
            "pay": 0,
            "hd5": 1,
            "no_reprint": 1,
            "autoplay": 1,
            "ugc_pay": 0,
            "is_cooperation": 0,
            "ugc_pay_preview": 0,
            "no_background": 0,
            "arc_pay": 0,
            "pay_free_watch": 0
        },
        "owner": {
            "mid": 730732,
            "name": "瓶子君152",
            "face": "https://i1.hdslb.com/bfs/face/951d0a41b33e0c73a0460d20ee83c4c62b0da45f.jpg"
        },
        "stat": {
            "aid": 47151947,
            "view": 2572367,
            "danmaku": 4956,
            "reply": 3379,
            "favorite": 53133,
            "coin": 134086,
            "share": 4251,
            "now_rank": 0,
            "his_rank": 6,
            "like": 159195,
            "dislike": 0,
            "vt": 0,
            "vv": 2572367
        },
        "dynamic": "#动漫杂谈##哆啦A梦##童年#\n重新投稿\n还是那句话，这期弄得挺用心的希望大家多三连支持\n长按推荐素质三连哦",
        "cid": 82579802,
        "dimension": {
            "width": 1920,
            "height": 1080,
            "rotate": 0
        },
        "short_link_v2": "https://b23.tv/BV1Qb41177Vm",
        "pub_location": "美国",
        "bvid": "BV1Qb41177Vm",
        "season_type": 0,
        "is_ogv": false,
        "ogv_info": null,
        "enable_vt": 0,
        "ai_rcmd": null,
        "rcmd_reason": ""
    }, {
        "aid": 46797630,
        "videos": 1,
        "tid": 212,
        "tname": "美食侦探",
        "copyright": 1,
        "pic": "http://i1.hdslb.com/bfs/archive/e6d407814892c54c5635943e69a4b1ffd8d6bccb.jpg",
        "title": "在中国挑战通宵卖烧烤！为啥美国没有这个？",
        "pubdate": 1553050747,
        "ctime": 1553050747,
        "desc": "在美国我们很少有深夜美食，但是在中国却很多，那么，通宵卖烧烤是怎样的一种生活呢？\n\n关注微信公众号“我是郭杰瑞”，不定期抽奖！",
        "state": 0,
        "duration": 326,
        "rights": {
            "bp": 0,
            "elec": 0,
            "download": 0,
            "movie": 0,
            "pay": 0,
            "hd5": 0,
            "no_reprint": 1,
            "autoplay": 1,
            "ugc_pay": 0,
            "is_cooperation": 0,
            "ugc_pay_preview": 0,
            "no_background": 0,
            "arc_pay": 0,
            "pay_free_watch": 0
        },
        "owner": {
            "mid": 176037767,
            "name": "我是郭杰瑞",
            "face": "http://i2.hdslb.com/bfs/face/6182455e4d61159121c223ddc7a3a381f2d4d056.jpg"
        },
        "stat": {
            "aid": 46797630,
            "view": 2623121,
            "danmaku": 14299,
            "reply": 3504,
            "favorite": 5228,
            "coin": 18858,
            "share": 2062,
            "now_rank": 0,
            "his_rank": 5,
            "like": 76981,
            "dislike": 0,
            "vt": 0,
            "vv": 2623121
        },
        "dynamic": "我差点把自己烤熟了！",
        "cid": 81965902,
        "dimension": {
            "width": 1920,
            "height": 1080,
            "rotate": 0
        },
        "short_link_v2": "https://b23.tv/BV1Rb411E7yi",
        "bvid": "BV1Rb411E7yi",
        "season_type": 0,
        "is_ogv": false,
        "ogv_info": null,
        "enable_vt": 0,
        "ai_rcmd": null,
        "rcmd_reason": ""
    }, {
        "aid": 47306249,
        "videos": 1,
        "tid": 17,
        "tname": "单机游戏",
        "copyright": 1,
        "pic": "http://i2.hdslb.com/bfs/archive/11547c3b159fdf21d7fe080f0c2bfc1a35b4007c.jpg",
        "title": "【纯黑】《鬼泣5》一周目无伤S评价攻略解说 第七期",
        "pubdate": 1553501956,
        "ctime": 1553499341,
        "desc": "一周目最高难度，不是游戏最高难度。剧情杀以外无伤。\n微博：@纯黑GK \n直播间：www.zhanqi.tv/666666 \n零食店：chlsd.taobao.com",
        "state": 0,
        "duration": 902,
        "rights": {
            "bp": 0,
            "elec": 0,
            "download": 0,
            "movie": 0,
            "pay": 0,
            "hd5": 1,
            "no_reprint": 1,
            "autoplay": 1,
            "ugc_pay": 0,
            "is_cooperation": 0,
            "ugc_pay_preview": 0,
            "no_background": 0,
            "arc_pay": 0,
            "pay_free_watch": 0
        },
        "owner": {
            "mid": 585267,
            "name": "-纯黑-",
            "face": "https://i0.hdslb.com/bfs/face/e8ab7b02d6576f4141ea857734b68b9dd35a5730.jpg"
        },
        "stat": {
            "aid": 47306249,
            "view": 1461659,
            "danmaku": 5802,
            "reply": 1956,
            "favorite": 19302,
            "coin": 75195,
            "share": 1045,
            "now_rank": 0,
            "his_rank": 4,
            "like": 64175,
            "dislike": 0,
            "vt": 0,
            "vv": 1461659
        },
        "dynamic": "#攻略##鬼泣5##纯黑#",
        "cid": 82850118,
        "dimension": {
            "width": 1920,
            "height": 1080,
            "rotate": 0
        },
        "short_link_v2": "https://b23.tv/BV1Cb41147EK",
        "bvid": "BV1Cb41147EK",
        "season_type": 0,
        "is_ogv": false,
        "ogv_info": null,
        "enable_vt": 0,
        "ai_rcmd": null,
        "rcmd_reason": ""
    }, {
        "aid": 47014688,
        "videos": 1,
        "tid": 24,
        "tname": "MAD·AMV",
        "copyright": 1,
        "pic": "http://i0.hdslb.com/bfs/archive/5a1c8d5c8d4b57cf71ec87a971d07db636d39499.jpg",
        "title": "化身修罗只为守护你！此刻世界将为之颤抖！",
        "pubdate": 1553256958,
        "ctime": 1553256959,
        "desc": "BGM：「Tommee Profitt,Jung Youth,Fleurie - In the End」素材：哥布林杀手，刺客五六七，Re:CREATORS，天狼，游戏人生，赤红之瞳，Fate系列，魔圆，黑色四叶草，DNF，东京喰种，野良神，宝石之国，境界的彼方，刀剑，火影，进击的巨人，灵能百分百，w'z，无彩限的怪灵，一拳超人，血界战线，rwby，平凡职业成就世界最强，噬神者，Flip Flappers，禁忌咒纹，绀青之拳，文豪野犬，电磁炮，空之境界全职高手剩下看热评",
        "state": 0,
        "duration": 163,
        "rights": {
            "bp": 0,
            "elec": 0,
            "download": 0,
            "movie": 0,
            "pay": 0,
            "hd5": 1,
            "no_reprint": 1,
            "autoplay": 1,
            "ugc_pay": 0,
            "is_cooperation": 0,
            "ugc_pay_preview": 0,
            "no_background": 0,
            "arc_pay": 0,
            "pay_free_watch": 0
        },
        "owner": {
            "mid": 15377173,
            "name": "烟季",
            "face": "https://i1.hdslb.com/bfs/face/3c657487f9a7993f50bcbafa82f64f99ff1229bd.jpg"
        },
        "stat": {
            "aid": 47014688,
            "view": 7078543,
            "danmaku": 16293,
            "reply": 6205,
            "favorite": 328754,
            "coin": 416745,
            "share": 31614,
            "now_rank": 0,
            "his_rank": 1,
            "like": 407584,
            "dislike": 0,
            "vt": 0,
            "vv": 7078543
        },
        "dynamic": "爆肝产出，一定要看完！",
        "cid": 82342112,
        "dimension": {
            "width": 1920,
            "height": 1080,
            "rotate": 0
        },
        "season_id": 26575,
        "short_link_v2": "https://b23.tv/BV1gb41177rt",
        "bvid": "BV1gb41177rt",
        "season_type": 0,
        "is_ogv": false,
        "ogv_info": null,
        "enable_vt": 0,
        "ai_rcmd": null,
        "rcmd_reason": ""
    }, {
        "aid": 46952333,
        "videos": 1,
        "tid": 17,
        "tname": "单机游戏",
        "copyright": 1,
        "pic": "http://i0.hdslb.com/bfs/archive/cb91293adb09c5f57eabe8c160207b794e049b54.jpg",
        "title": "破案大师老番茄",
        "pubdate": 1553227211,
        "ctime": 1553227217,
        "desc": "游戏：Return of the Obra Dinn",
        "state": 0,
        "duration": 1114,
        "rights": {
            "bp": 0,
            "elec": 0,
            "download": 0,
            "movie": 0,
            "pay": 0,
            "hd5": 0,
            "no_reprint": 1,
            "autoplay": 1,
            "ugc_pay": 0,
            "is_cooperation": 0,
            "ugc_pay_preview": 0,
            "no_background": 0,
            "arc_pay": 0,
            "pay_free_watch": 0
        },
        "owner": {
            "mid": 546195,
            "name": "老番茄",
            "face": "http://i0.hdslb.com/bfs/face/bc5ca101313d4db223c395d64779e76eb3482d60.jpg"
        },
        "stat": {
            "aid": 46952333,
            "view": 6461043,
            "danmaku": 15664,
            "reply": 4109,
            "favorite": 26764,
            "coin": 51356,
            "share": 2868,
            "now_rank": 0,
            "his_rank": 4,
            "like": 135868,
            "dislike": 0,
            "vt": 0,
            "vv": 6461043
        },
        "dynamic": "这游戏玩的我快瞎了。",
        "cid": 82235716,
        "dimension": {
            "width": 1920,
            "height": 1080,
            "rotate": 0
        },
        "short_link_v2": "https://b23.tv/BV1Sb411j75C",
        "bvid": "BV1Sb411j75C",
        "season_type": 0,
        "is_ogv": false,
        "ogv_info": null,
        "enable_vt": 0,
        "ai_rcmd": null,
        "rcmd_reason": ""
    }, {
        "aid": 47126553,
        "videos": 3,
        "tid": 171,
        "tname": "电子竞技",
        "copyright": 1,
        "pic": "http://i2.hdslb.com/bfs/archive/48a9c300999a712e8271e417d8d6da417f2c29d4.jpg",
        "title": "[LPL春季赛] 3月23日 RNG vs IG",
        "pubdate": 1553347231,
        "ctime": 1553347232,
        "desc": "[LPL春季赛] 3月23日 RNG vs IG",
        "state": 0,
        "duration": 9492,
        "rights": {
            "bp": 0,
            "elec": 0,
            "download": 0,
            "movie": 0,
            "pay": 0,
            "hd5": 0,
            "no_reprint": 0,
            "autoplay": 1,
            "ugc_pay": 0,
            "is_cooperation": 0,
            "ugc_pay_preview": 0,
            "no_background": 0,
            "arc_pay": 0,
            "pay_free_watch": 0
        },
        "owner": {
            "mid": 50329118,
            "name": "哔哩哔哩英雄联盟赛事",
            "face": "https://i2.hdslb.com/bfs/face/544c89e68f2b1f12ffcbb8b3c062a3328e8692d9.jpg"
        },
        "stat": {
            "aid": 47126553,
            "view": 3939014,
            "danmaku": 108343,
            "reply": 46600,
            "favorite": 21662,
            "coin": 25837,
            "share": 5743,
            "now_rank": 0,
            "his_rank": 9,
            "like": 40329,
            "dislike": 0,
            "vt": 0,
            "vv": 3939014
        },
        "dynamic": "",
        "cid": 82536177,
        "dimension": {
            "width": 1920,
            "height": 1080,
            "rotate": 0
        },
        "short_link_v2": "https://b23.tv/BV19b411774z",
        "pub_location": "上海",
        "bvid": "BV19b411774z",
        "season_type": 0,
        "is_ogv": false,
        "ogv_info": null,
        "enable_vt": 0,
        "ai_rcmd": null,
        "rcmd_reason": ""
    }, {
        "aid": 45031807,
        "videos": 1,
        "tid": 130,
        "tname": "音乐综合",
        "copyright": 2,
        "pic": "http://i0.hdslb.com/bfs/archive/aef6dc906a1a518430425c05d488dcec46555d51.jpg",
        "title": "the real suger baby已知最高画质",
        "pubdate": 1551437298,
        "ctime": 1551437298,
        "desc": "转自油管",
        "state": 0,
        "duration": 29,
        "rights": {
            "bp": 0,
            "elec": 0,
            "download": 0,
            "movie": 0,
            "pay": 0,
            "hd5": 0,
            "no_reprint": 0,
            "autoplay": 1,
            "ugc_pay": 0,
            "is_cooperation": 0,
            "ugc_pay_preview": 0,
            "no_background": 0,
            "arc_pay": 0,
            "pay_free_watch": 0
        },
        "owner": {
            "mid": 30194033,
            "name": "一嗷垚",
            "face": "https://i2.hdslb.com/bfs/face/782067e92ee35c5bb8d4397030f215701914f834.jpg"
        },
        "stat": {
            "aid": 45031807,
            "view": 29259808,
            "danmaku": 21853,
            "reply": 19575,
            "favorite": 701297,
            "coin": 240959,
            "share": 103966,
            "now_rank": 0,
            "his_rank": 65,
            "like": 772889,
            "dislike": 0,
            "vt": 0,
            "vv": 29259808
        },
        "dynamic": "#欧美音乐#",
        "cid": 78868295,
        "dimension": {
            "width": 1280,
            "height": 720,
            "rotate": 0
        },
        "short_link_v2": "https://b23.tv/BV16b411b71j",
        "bvid": "BV16b411b71j",
        "season_type": 0,
        "is_ogv": false,
        "ogv_info": null,
        "enable_vt": 0,
        "ai_rcmd": null,
        "rcmd_reason": ""
    }]

    // Render video items
    renderVideoItems(videoData);
}

function createVideoItem(video) {
    const videoItem = document.createElement("div");
    videoItem.classList.add("bili-video-card");

    const videoLinkUp = document.createElement("a");
    videoLinkUp.classList.add("video-preview");
    videoLinkUp.href = video.short_link_v2;

    const thumbnail = document.createElement("img");
    thumbnail.classList.add("video-thumbnail");
    thumbnail.src = video.pic;
    thumbnail.alt = video.desc;
    videoLinkUp.appendChild(thumbnail);

    // MASK
    const mask = document.createElement("div");
    mask.classList.add("video-mask");
    videoLinkUp.appendChild(mask);

    const stat = document.createElement("div");
    stat.classList.add("video-stat");
    mask.appendChild(stat);

    const statLeft = document.createElement("div");
    statLeft.classList.add("video-stat-left");
    stat.appendChild(statLeft);

    const view = document.createElement("span");
    view.classList.add("video-stat-item");
    const icon1 = document.createElement("svg");
    icon1.classList.add("video-stat-icon");
    icon1.innerHTML = '<use href="#widget-video-view"></use>';
    view.appendChild(icon1);
    const data1 = document.createElement("span");
    data1.textContent = formatStat(video.stat.view);
    view.appendChild(data1);
    statLeft.appendChild(view);

    const danmaku = document.createElement("span");
    danmaku.classList.add("video-stat-item");
    const icon2 = document.createElement("svg");
    icon2.classList.add("video-stat-icon");
    icon2.innerHTML = '<use xlink:href="#widget-video-danmaku"></use>';
    danmaku.appendChild(icon2);
    const data2 = document.createElement("span");
    data2.textContent = formatStat(video.stat.danmaku);
    danmaku.appendChild(data2);
    statLeft.appendChild(danmaku);

    const duration = document.createElement("span");
    duration.classList.add("video-duration");
    duration.textContent = formatTime(video.duration);
    stat.appendChild(duration);

    const videoLinkDown = document.createElement("a");
    videoLinkDown.classList.add("video-title");
    videoLinkDown.href = video.short_link_v2;

    // MASK END

    const title = document.createElement("h3");
    title.classList.add("video-title");
    title.textContent = video.title;
    videoLinkDown.appendChild(title);

    const bottom = document.createElement("a");
    bottom.classList.add("video-subtitle");
    bottom.href = `https://space.bilibili.com/${video.owner.mid}`;

    const uploaderIcon = document.createElement("svg");
    uploaderIcon.classList.add("uploader-icon");
    uploaderIcon.innerHTML = '<use xlink:href="#widget-up"></use>';
    bottom.appendChild(uploaderIcon);

    const uploader = document.createElement("span");
    uploader.classList.add("video-author");
    uploader.textContent = video.owner.name;
    bottom.appendChild(uploader);

    const date = document.createElement("span");
    date.classList.add("video_date");
    date.textContent = ` · ${formatTimestamp(video.pubdate * 1e3)}`;
    bottom.appendChild(date);

    videoItem.appendChild(videoLinkUp);
    videoItem.appendChild(videoLinkDown);
    videoItem.appendChild(bottom);
    return videoItem;
}

function renderVideoItems(videoData) {
    const videoGrid = document.getElementById("videoGrid");

    videoData.map(createVideoItem).forEach(it => videoGrid.appendChild(it));
    // window.location.reload("#videoGrid");
}

function search() {
    // Implement search functionality if needed
    const searchInput = document.getElementById("searchInput").value;
    console.log("Searching for:", searchInput);
    // You can update the video grid based on the search input
}
