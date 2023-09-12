export default [
    {path: '/index', pathName: '网站首页'},
    {
        path: '/gqgk', pathName: '馆情概况', children: [
            {path: '/bgjj', pathName: '本馆简介', parentName: '馆情概况'},
            {path: '/ldbz', pathName: '领导班子', parentName: '馆情概况'},
            {path: '/jgsz', pathName: '机构设置', parentName: '馆情概况'},
        ]
    },
    // {path: '/gzdt', pathName: '工作动态'},
    {
        path: '/xwzx', pathName: '新闻资讯', children: [
            {path: '/bddaxx', pathName: '本地档案信息', parentName: '新闻资讯'},
            {path: '/jrsmx', pathName: '今日三门峡', parentName: '新闻资讯'},
            {path: '/hydt', pathName: '行业动态', parentName: '新闻资讯'},
            {path: '/tzgg', pathName: '通知公告', parentName: '新闻资讯'},
        ]
    },
    // {path: '/tzgg', pathName: '通知公告'},
    {
        path: '/fgbz', pathName: '法规标准', children: [
            {path: '/zcfg', pathName: '政策法规', parentName: '法规标准'},
            {path: '/hybz', pathName: '行业标准', parentName: '法规标准'},
            {path: '/sggf', pathName: '市馆规范', parentName: '法规标准'},
        ]
    },
    {
        path: '/bmfw', pathName: '便民服务', children: [
            {path: '/cdxz', pathName: '查档须知', parentName: '便民服务'},
            {path: '/gcjs', pathName: '馆藏介绍', parentName: '便民服务'},
            {path: '/zlyy', pathName: '展览预约', parentName: '便民服务'},
        ]
    }, {
        path: '/dawh', pathName: '档案文化', children: [
            {path: '/bycg', pathName: '编研成果', parentName: '档案文化'},
            {path: '/hsjy', pathName: '红色记忆', parentName: '档案文化'},
            {path: '/tsda', pathName: '特色档案', parentName: '档案文化'},
            {path: '/ltby', pathName: '兰台榜样', parentName: '档案文化'},
        ]
    }, {path: '/jgdj', pathName: '机关党建'},
    {
        path: '/jlhd', pathName: '交流互动', children: [
            {path: '/dazj', pathName: '档案征集', parentName: '交流互动'},
        ]
    },
    // {path: '/wszt', pathName: '网上展厅'},

];
