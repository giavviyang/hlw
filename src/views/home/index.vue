<template>
    <div class="main">
        <div class="warp">
            <!--   中间部分第一个轮播图和新闻      -->
            <div class="main_content">
                <el-carousel :interval="5000" arrow="always">
                    <el-carousel-item v-for="(item,index) in bannerImages1" :key="index">
                        <img style="width: 100%;height: 100%;object-fit: cover;" :src="item.cover" :alt="item.alt"
                             @click="handleDetails(item)">
                    </el-carousel-item>
                </el-carousel>
                <!--      新闻资讯      -->
                <div class="main_right regulationNews">
                    <newList :newTitle1="newsTitle1" :newTitle2="newsTitle2"
                             @handleMore="handleMore('/xwzx', newsList)">
                        <div slot="newContent" class="slotContent">
                            <div class="new_button">
                                <div v-for="(item,index) in newsArr" :key="index"
                                     @click="handleTo(item.path)"
                                     @mouseover="newsOver(item, index)"
                                     @mouseleave="newsLeave(index)"
                                     :class="newsActive === index? 'isActive' : ''">{{ item.pathName }}
                                </div>
                            </div>
                            <div class="new_content">
                                <div class="list" v-for="(item,index) in newsList" :key="index"
                                     @click="handleDetails(item)">
                                    <p class="list_text">{{ item.publishTitle }}</p>
                                    <p class="list_time">{{ item.updateTime }}</p>
                                </div>
                            </div>
                        </div>
                    </newList>
                </div>
            </div>
            <!--   中间部分第二个轮播图     -->
            <div class="middle_banner">
                <el-carousel :interval="5000" arrow="always">
                    <el-carousel-item v-for="(item,index) in bannerImages2" :key="index">
                        <div style="width: 100%;height: 100%;"  @click="toBannerImages2(index)">
                            <img style="width: 100%;height: 100%;object-fit: cover;" :src="item.cover"/>
                        </div>

                    </el-carousel-item>
                </el-carousel>
            </div>
            <!--   中间新闻区域1     -->
            <div class="middle_news1">
                <!--     法规标准       -->
                <div class="noticeNews regulationNews">
                    <newList :newTitle1="regulationTitle1" :newTitle2="regulationTitle2"
                             @handleMore="handleMore('fgbz')">
                        <div slot="newContent" class="slotContent">
                            <div class="new_button">
                                <div v-for="(item,index) in regulationArr" :key="index"
                                     @click="handleTo(item.path)"
                                     @mouseover="regulationOver(item, index)"
                                     @mouseleave="regulationLeave(index)"
                                     :class="regulationActive === index? 'isActive' : ''">{{ item.pathName }}
                                </div>
                            </div>
                            <div class="new_content">
                                <div class="list" v-for="(item,index) in regulationList" :key="index"
                                     @click="handleDetails(item)">
                                    <p class="list_text">{{ item.publishTitle }}</p>
                                    <p class="list_time">{{ item.updateTime }}</p>
                                </div>
                            </div>
                        </div>
                    </newList>
                </div>
                <hr>
                <!--     机关党建       -->
                <div class="noticeNews">
                    <newList :newTitle1="partyTitle1" :newTitle2="partyTitle2" @handleMore="handleMore('/jgdj')">
                        <div slot="newContent" class="slotContent">
                            <div class="new_content">
                                <div class="list" v-for="(item,index) in partyList" :key="index"
                                     @click="handleDetails(item)">
                                    <p class="list_text">{{ item.publishTitle }}</p>
                                    <p class="list_time">{{ item.updateTime }}</p>
                                </div>
                            </div>
                        </div>
                    </newList>
                </div>
            </div>
            <!--   中间新闻区域2     -->
            <div class="middle_news2">
                <!--    便民服务        -->
                <div class="serviceNews">
                    <newList :newTitle1="serviceTitle1" :newTitle2="serviceTitle2" @handleMore="handleMore('bmfw')">
                        <div slot="newContent" class="serviceSlot">
                            <div class="service_img" @click="handleTo('cdxz')">
                                <img src="../../assets/img/service_img1.png">
                                <p>查档须知</p>
                            </div>
                            <div class="service_img" @click="handleTo('gcjs')">
                                <img src="../../assets/img/service_img2.png">
                                <p>馆藏介绍</p>
                            </div>
                            <div class="service_img" @click="handleTo('zlyy')">
                                <img src="../../assets/img/service_img3.png">
                                <p>展览预约</p>
                            </div>
                        </div>
                    </newList>
                </div>
                <hr>
                <!--     档案文化           -->
                <div class="serviceNews regulationNews">
                    <newList :newTitle1="archiveTitle1" :newTitle2="archiveTitle2" @handleMore="handleMore('/dawh')">
                        <div slot="newContent" class="slotContent">
                            <div class="new_button">
                                <div v-for="(item,index) in archiveArr" :key="index"
                                     @click="handleTo(item.path)"
                                     @mouseover="archiveOver(item, index)"
                                     @mouseleave="archiveLeave(item,index)"
                                     :class="archiveActive === index? 'isActive' : ''">{{ item.pathName }}
                                </div>
                            </div>
                            <div class="new_content">
                                <div class="list" v-for="(item,index) in archiveList" :key="index"
                                     @click="handleDetails(item)">
                                    <p class="list_text">{{ item.publishTitle }}</p>
                                    <p class="list_time">{{ item.updateTime }}</p>
                                </div>
                            </div>
                        </div>
                    </newList>
                </div>
            </div>
        </div>
        <!--    网上展厅    -->
        <div class="onlineExhibition">
            <div class="warp">
                <div class="online_left">
                    <newList :newTitle1="onlineTitle1" :newTitle2="onlineTitle2" @handleMore="handleMore('/wszt')">
                        <div slot="newContent" class="slotContent">
                            <el-carousel :loop="false" :autoplay="false" arrow="always" indicator-position="none">
                                <el-carousel-item class="el-car-item" v-for="(list, index) in dataList" :key="index">
                                    <div v-for="(item,index1) in list" :key="index1" class="divSrc">
                                        <img style="width: 100%;height: 100%;object-fit: cover;" class="img"
                                             :src="item.cover" @click="handleDetails(item)"/>
                                    </div>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </newList>
                </div>
                <div class="online_right">
                    <div class="right_title" @click="goArchives">
                        <div class="icon"><img src="../../assets/img/online_icon1.png" alt=""></div>
                        <p class="title">开放档案目录查询</p>
                    </div>
                    <div class="right_title" @click="goGovernment">
                        <div class="icon"><img src="../../assets/img/online_icon2.png" alt=""></div>
                        <p class="title">政府公开信息查询</p>
                    </div>
                    <div class="right_title" @click="goSource">
                        <div class="icon"><img src="../../assets/img/online_icon3.png" alt=""></div>
                        <p class="title">河南省档案资源共享系统</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from "axios";
import newList from '../../components/newList.vue'

export default {
    name: "home",
    components: {newList},
    created() {
        this.getBanner()
        this.queryAllMessage()
        console.log(this.$isConstruction)
    },
    data() {
        return {
            newsTitle1: '新闻资讯',
            newsTitle2: 'news information',
            newsList: [],
            newsArr:[
                {path: '/bddaxx', pathName: '本地档案信息'},
                {path: '/jrsmx', pathName: '今日三门峡'},
                {path: '/hydt', pathName: '行业动态'},
                {path: '/tzgg', pathName: '通知公告'},
            ],
            newsActive:0,
            noticeTitle1: '通知公告',
            noticeTitle2: 'Notice Announcement',
            noticeList: [],
            regulationTitle1: '法规标准',
            regulationTitle2: 'Regulatory standards',
            regulationList: [],
            regulationArr: [
                {pathName: '政策法规', path: '/zcfg'},
                {pathName: '行业标准', path: '/hybz'},
                {pathName: '市馆规范', path: '/sggf'},
            ],
            partyTitle1: '机关党建',
            partyTitle2: 'Party building',
            partyList: [],
            regulationActive: 0,
            serviceTitle1: '便民服务',
            serviceTitle2: 'Convenient services',
            archiveTitle1: '档案文化',
            archiveTitle2: 'Archive Cultures',
            archiveArr: [
                {pathName: '编研成果', path: '/bycg'},
                {pathName: '红色记忆', path: '/hsjy'},
                {pathName: '特色档案', path: '/tsda'},
                {pathName: '兰台榜样', path: '/ltby'},
            ],
            archiveActive: 0,
            archiveList: [],
            onlineTitle1: '网上展厅',
            onlineTitle2: 'Online exhibition',
            dataList: [],
            bannerImages1: [], // 第一个轮播图
            bannerImages2: [], // 第二个轮播图
            allMessages: {},
            importantData: {},
        }
    },
    methods: {
        // 获取轮播图
        getBanner() {
            axios({
                url: 'publishMessage/queryBanner',
                method: 'get',
                params: {}
            }).then(res => {
                if (res.data.code == 200) {
                    this.bannerImages1 = []
                    this.bannerImages2 = []
                    let images = res.data.rows
                    for (let img of images) {
                        // 图片路径处理
                        if (img.publishContent) {
                            let reg = new RegExp('src="/publishMessage', 'g')//g代表全部
                            img.publishContent = img.publishContent.replace(reg, 'src="/api/publishMessage')
                        }

                        if (!img.cover.startsWith('/api')) {
                            img.cover = '/api' + img.cover
                        }
                        if (img.banner === 1) {
                            this.bannerImages1.push(img)
                        } else {
                            this.bannerImages2.push(img)
                        }
                    }
                }
            })
        },

        // 获取展示信息
        queryAllMessage() {
            axios({
                url: 'publishMessage/queryAllMessage',
                method: 'get',
                params: {}
            }).then(res => {
                this.allMessages = res.data.data;
                console.log('this.allMessages',this.allMessages)
                let keys = Object.keys(this.allMessages)
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i]
                    let value = this.allMessages[key]
                    for (let item of value) {
                        // 图片路径处理
                        if (item.publishContent) {
                            let reg = new RegExp('src="/publishMessage', 'g')//g代表全部
                            item.publishContent = item.publishContent.replace(reg, 'src="/api/publishMessage')
                        }
                        if (!item.cover.startsWith('/api')) {
                            item.cover = '/api' + item.cover
                        }
                        if(this.$isConstruction){
                            item.publishTitle='建设中';
                            item.publishTime=''
                        }
                    }
                }
                this.newsList = this.allMessages['新闻资讯']
                this.noticeList = this.allMessages['通知公告']
                this.partyList = this.allMessages['机关党建']
                this.noticeList = this.allMessages['通知公告']
                this.regulationList = this.allMessages['政策法规']
                this.archiveList = this.allMessages['编研成果']
                this.dataList = this.allMessages['网上展厅']
                this.importantData = this.allMessages['重要讲话'][0]
                this.byEvents()
            })
        },

        handleMore(val, dataList) {
            this.$router.push({path: val});
        },
        handleTo(val) {
            this.$router.push({path: val});
        },
        /* 跳转到详情页 */
        handleDetails(val) {
            this.$router.push({path: '/Details', query: {id: val.id}});
        },
        toBannerImages2(index) {
            let url = '';
            if (index === 0) {
                this.$router.push({path: '/importantAddress', query: {id: this.importantData.id}});
                return
            } else if (index === 1) {
                url = 'http://www.wenming.cn/sxll/';
            } else if (index === 2) {
                url = 'https://www.xuexi.cn/';
            } else if (index === 3) {
                url = 'https://www.xuexi.cn/xxqg.html?id=8168817f96614068a992924f7b3d4906';
            }
            window.open(url)
        },
        // 新闻资讯 鼠标移入赋值index
        newsOver(item, index) {
            this.newsActive = index;
            this.newsList = this.allMessages[item.pathName];
        },
        // 鼠标移出
        newsLeave(index) {
            this.newsActive = index;
        },
        // 法规标准 鼠标移入赋值index
        regulationOver(item, index) {
            this.regulationActive = index;
            this.regulationList = this.allMessages[item.pathName];
        },
        // 鼠标移出
        regulationLeave(index) {
            this.regulationActive = index;
        },
        // 档案文化 鼠标移入赋值index
        archiveOver(item, index) {
            this.archiveActive = index
            this.archiveList = this.allMessages[item.pathName]
        },
        // 鼠标移出
        archiveLeave(item,index) {
            this.archiveActive = index;

        },
        byEvents() {
            let newDataList = [];
            let current = 0
            if (this.dataList && this.dataList.length > 0) {
                for (let i = 0; i <= this.dataList.length - 1; i++) {
                    if (i % 3 !== 0 || i === 0) {	//数据处理成几张展示
                        if (!newDataList[current]) {
                            newDataList.push([this.dataList[i]])
                        } else {
                            newDataList[current].push(this.dataList[i])
                        }
                    } else {
                        current++
                        newDataList.push([this.dataList[i]])
                    }
                }
            }
            this.dataList = [...newDataList]

        },
        goArchives() {
            this.$router.push({path: '/search'});
        },
        goGovernment() {
            let url = 'http://www.smx.gov.cn/pageView/zhengfuxinxi.html?rlmid=4021&lmid=4051'
            window.open(url)
        },
        goSource() {
            let url = 'http://222.143.34.176:8080/hnxxgx/'
            window.open(url)

        },

    },
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: auto;

  .main_content {
    height: 320px;
    width: 100%;
    margin-top: 25px;
    display: flex;

    ::v-deep .el-carousel {
      width: 570px;
      height: calc(100% - 20px);
      //margin-top: 20px;

      .el-carousel__container {
        height: 100%;
      }
    }

    .main_right {
      margin-left: 50px;
      width: calc(100% - 620px);

      .slotContent {
        height: 220px;

      }
    }
  }

  .middle_banner {
    margin-top: 30px;
    height: 360px;
    width: 100%;

    ::v-deep .el-carousel {
      height: 100%;

      .el-carousel__container {
        height: 100%;
      }
    }
  }

  .slotContent {
    height: 220px;
    width: 100%;

    .new_content {
      height: 100%;
    }
  }

  .main_content, .middle_banner {
    ::v-deep .el-carousel {
      height: 100%;

      .el-carousel__arrow {
        border: 1px solid #fff;
        width: 25px;
        height: 25px;

        .el-icon-arrow-left {
          font-size: 18px;
          right: 1px;
          position: relative;

        }

        .el-icon-arrow-right {
          font-size: 18px;
          left: 1px;
          position: relative;
        }
      }

      ul {

        .el-carousel__button {
          height: 10px;
          width: 10px;
          border: 1px solid #fff;
          //background-color: transparent;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          margin-left: 10px;

        }

        .is-active {
          .el-carousel__button {
            width: 20px;
            border-radius: 10px;
          }

        }

      }
    }
  }

  .middle_news1 {
    height: 300px;
    width: 100%;
    //background-color: wheat;
    margin-top: 30px;
    display: flex;
    justify-content: space-around;

    .noticeNews {
      //width: 31%;
      width: 49%;
      height: 100%;

    }
  }

  .middle_news2 {
    height: 300px;
    width: 100%;
    //background-color: wheat;
    margin-top: 30px;
    display: flex;
    justify-content: space-around;

    .serviceNews {
      width: 49%;
      height: 100%;

      .serviceSlot {
        width: 100%;
        height: 200px;
        display: flex;
        justify-content: space-between;

        .service_img {
          height: 100%;
          width: 30%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          p {
            bottom: 30px;
            position: absolute;
            font-size: 18px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
        }
      }

    }
  }

  .onlineExhibition {
    height: 330px;
    width: 100%;
    //background-color: wheat;
    background-color: #EBE2D3;
    margin-top: 30px;
    padding: 30px 0;

    .warp {
      background-color: #EBE2D3;
      display: flex;
      justify-content: space-around;

      .online_left {
        width: 65%;
        height: 100%;

        ::v-deep .new_title2 {
          background-color: #EBE2D3 !important;
        }

        .el-carousel {
          width: 100%;
          height: 200px;

          ::v-deep .el-carousel__container {
            height: 100%;
            width: 100%;

            .el-car-item {
              width: calc(100% - 100px);
              height: 100%;
              padding-left: 50px;
              display: flex;
              justify-content: space-between;

              .divSrc {
                width: 30%;
                height: 100%;
                display: flex;
                justify-content: space-between;
                display: flex;
                align-items: center;

                .img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }

            }

            .el-carousel__arrow {
              background: #fff !important;
              display: block !important;
              height: 100%;
              width: 30px;
              border-radius: 4px;
              color: #1f2d3d;
              font-size: 24px;
            }

            .el-carousel__arrow--right {
              right: 5px;
            }

            .el-carousel__arrow--left {
              left: 5px;
            }
          }
        }

        .el-car-item {
          width: 100%;
          display: flex;

          .img {
            width: 30%;
            height: 184px;
            margin-right: 20px;
            cursor: pointer;
          }
        }
      }

      .online_right {
        width: 31%;
        height: calc(100% - 60px);
        position: relative;
        top: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .right_title {
          height: 30%;
          width: 100%;
          background-color: #E0D0B6;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;

          .icon {
            width: 18px;
            height: 18px;
            margin: 0 15px 0 30px;

            img {
              width: 18px;
              height: 18px;
            }
          }

          .title {
            height: 30px;
            font-size: 22px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #B83B13;
            line-height: 30px;
          }
        }
      }
    }


  }

  .regulationNews {
    .new_content {
      height: calc(100% - 43px);
      margin: 10px 0;
    }

    .new_button {
      display: flex;

      div {
        width: 90px;
        height: 30px;
        border-radius: 4px;
        border: 1px solid #B83B13;
        text-align: center;
        font-size: 14px;
        color: #B83B13;
        line-height: 30px;
        margin: 0 5px;
      }

      .isActive {
        background: #B83B13;
        border-color: #B83B13;
        color: #fff;
      }
    }
  }

  .new_content {
    .list {
      p {
        line-height: 35px;
      }

      .list_time {
        padding-right: 3px;
      }
    }

  }

  hr {
    opacity: 0.1;
    background-color: #B83B13;
    height: calc(100% - 30px);
    position: relative;
    top: 20px;
  }
}
</style>
