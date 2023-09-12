import Vue from 'vue'
import VueRouter from 'vue-router'
//一级路由
import Layout from '../layout/Layout.vue'
//二级路由
import Home from '../views/home'  //首页
import Search from '../views/search/index.vue'  //查档预约
import Bgjj from "@/views/gqgk/bgjj.vue"; //本馆简介
import Ldbz from "@/views/gqgk/ldbz.vue"; //领导班子
import Jgsz from "@/views/gqgk/jgsz.vue"; //机构设置
import Xwzx from '@/views/xwzx/index.vue'  //新闻资讯
import Bddaxx from '@/views/xwzx/bddaxx.vue'  //本地档案信息
import Jrsmx from "@/views/xwzx/jrsmx.vue";  //今日三门峡
import Hydt from "@/views/xwzx/hydt.vue";  //行业动态
import Tzgg from "@/views/xwzx/tzgg.vue"; //通知公告
import Fgbz from "@/views/fgbz/index.vue"; //法规标准
import Zcfg from "@/views/fgbz/zcfg.vue"; //政策法规
import Hybz from "@/views/fgbz/hybz.vue"; //行业标准
import Sggf from "@/views/fgbz/sggf.vue"; //市管规范
import Bmfw from "@/views/bmfw/index.vue"; //便民服务
import Cdxz from "@/views/bmfw/cdxz.vue"; //查档须知
import Gcjs from "@/views/bmfw/gcjs.vue"; //馆藏介绍
import Zlyy from "@/views/bmfw/zlyy.vue"; //展览预约
import Dawh from "@/views/dawh/index.vue"; //档案文化
import Bycg from "@/views/dawh/bycg.vue"; //编研成果
import Hsjy from "@/views/dawh/hsjy.vue"; //红色记忆
import Tsda from "@/views/dawh/tsda.vue"; //特色档案
import Ltby from "@/views/dawh/ltby.vue"; //特色档案
import Jgdj from "@/views/jgdj/index.vue"; //机关党建
import Jlhd from "@/views/jlhd/index.vue"; //交流互动
import Dazj from "@/views/jlhd/dazj.vue"; //档案征集
import NavSearch from "@/views/navSearch/index.vue";  //导航搜索
import Wszt from "@/views/wszt/index.vue"; //网上展厅
import Details from '@/views/details/index.vue'  //详情页
import CollectionDetails from '@/views/jlhd/collectionDetails' // 档案征集详情页
import PersonalCenter from '@/views/jlhd/personalCenter'  // 个人中心
import ImportantAddress from '@/views/importantAddress/index.vue'  // 个人中心


Vue.use(VueRouter);
//解决路由跳转原路由或者刷新出错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


const routes = [//  一级路由
    {
        path: '/', component: Layout, redirect: '/index', //二级路由
        children: [{
            path: '/index', name: 'Home', component: Home,
        }, {
            path: '/navSearch', name: 'NavSearch', component: NavSearch,
        },
            {
                path: '/gqgk', name: 'Gqgk', component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                redirect: "/bgjj", children: [
                    {
                        path: '/bgjj', name: 'Bgjj', component: Bgjj,

                    }, {
                        path: '/ldbz', name: 'Ldbz', component: Ldbz,

                    }, {
                        path: '/jgsz', name: 'Jgsz', component: Jgsz,

                    }
                ]
            }, {
                path: '/xwzx', name: 'Xwzx', component: Xwzx,
            },{
                path: '/bddaxx', name: 'Bddaxx', component: Bddaxx,
            },{
                path: '/jrsmx', name: 'Jrsmx', component: Jrsmx,
            },{
                path: '/hydt', name: 'Hydt', component: Hydt,
            }, {
                path: '/tzgg', name: 'Tzgg', component: Tzgg,
            }, {
                path: '/fgbz', name: 'Fgbz', component: Fgbz,
            }, {
                path: '/zcfg', name: 'Zcfg', component: Zcfg,
            }, {
                path: '/hybz', name: 'Hybz', component: Hybz,
            }, {
                path: '/sggf', name: 'Sggf', component: Sggf,
            }, {
                path: '/bmfw', name: 'Bmfw', component: Bmfw,
            }, {
                path: '/cdxz', name: 'Cdxz', component: Cdxz,
            }, {
                path: '/gcjs', name: 'Gcjs', component: Gcjs,
            }, {
                path: '/zlyy', name: 'Zlyy', component: Zlyy,
            }, {
                path: '/dawh', name: 'Dawh', component: Dawh,
            }, {
                path: '/bycg', name: 'Bycg', component: Bycg,
            }, {
                path: '/hsjy', name: 'Hsjy', component: Hsjy,
            }, {
                path: '/tsda', name: 'Tsda', component: Tsda,
            }, {
                path: '/ltby', name: 'Ltby', component: Ltby,
            },
            {
                path: '/jgdj', name: 'Jgdj', component: Jgdj,
            }, {
                path: '/jlhd', name: 'Jlhd', component: Jlhd,
            } ,{
                path: '/dazj', name: 'Dazj', component: Dazj,
            },{
                path: '/wszt', name: 'Wszt', component: Wszt,
            },{
                path: '/details', name: 'Details', component: Details,
            },{
                path: '/collectionDetails', name: 'CollectionDetails', component: CollectionDetails
            },{
                path: '/personalcenter', name: 'PersonalCenter', component: PersonalCenter
            },{
                path: '/importantAddress', name: 'ImportantAddress', component: ImportantAddress
            }
        ]

    }, {
        path: '/search', name: 'Search', component: Search,
    }, ]

const router = new VueRouter({
    mode: 'history', base: process.env.BASE_URL, routes
})

export default router
