<template>
    <div class="warp">
        <div class="pathTitle">
            <p @click="handleHome">三门峡市档案馆</p>
            <p v-for="item in pathTitleArr" :key="item.path" @click="handleTitleClick(item.path)">
                <i class="el-icon-arrow-right"></i>{{ item.pathName }} </p>
        </div>
        <div class="importantCenter">
            <div class="detailsContent">
                <div class="title">{{ detailsData.publishTitle }}</div>
                <div class="title" style="font-size:14px">{{ detailsData.updateTime }}</div>
                <div v-html="detailsData.publishContent" class="detailsText"></div>
            </div>
            <div class="detailsRight">
                <p class="title">相关推荐</p>
                <div class="rightContent">
                    <div v-for="(item,index) in archiveList" :key="index" class="detailsList" @click="detailsData = archiveList[index]">
                        <div class="listImg">
                            <img :src="item.cover" alt="">
                        </div>
                        <div class="listContent">
                            <p>{{item.publishTitle}}</p>
                            <span>{{item.updateTime}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import PathTitle from "@/components/pathTitle.vue";

export default {
    name: "collectionDetails",
    components: {PathTitle},
    data() {
        return {
            pathTitleArr: [
                {path: '/importantAddress', pathName: '重要讲话'},
            ],
            detailsData: {},
            detailsList:[],

            queryParams: {
              type: '重要讲话',
              pageNum: 1,
              pageSize: 20
            },
            total: 0,
            archiveList: []
        };
    },
    created() {
        // this.getDetails();
        this.queryData()
    },
    methods: {
        /*getDetails() {
            axios({
                url: 'publishMessage/queryMessageDetailById',
                method: 'get',
                params: {id: this.$route.query.id}
            }).then(res => {
                this.detailsData = res.data.data
                // 图片路径处理
                if (this.detailsData.publishContent) {
                    let reg = new RegExp('src="/publishMessage', 'g')//g代表全部
                    this.detailsData.publishContent = this.detailsData.publishContent.replace(reg, 'src="/api/publishMessage')
                }
            })
        },*/
        handleTitleClick(val) {
            this.$router.push({path: val});
        },
        // 点击首页
        handleHome() {
            this.$router.push({path: '/index'});
        },

        queryData() {
          axios({
            url: 'publishMessage/queryMessageByType',
            method: 'get',
            params: this.queryParams
          }).then(res => {
            if (res.data.code == 200) {
              this.archiveList = res.data.data.rows
              this.total = res.data.data.total
              for (let item of this.archiveList) {
                // 图片路径处理
                if (item.publishContent) {
                  let reg = new RegExp('src="/publishMessage', 'g')//g代表全部
                  item.publishContent = item.publishContent.replace(reg, 'src="/api/publishMessage')
                }
                if (item.cover) {
                  let reg = new RegExp('/publishMessage', 'g')//g代表全部
                  item.cover = item.cover.replace(reg, '/api/publishMessage')
                }
              }
              this.detailsData = this.archiveList[0]
            }
          })
        },
    },
};
</script>

<style lang="scss" scoped>
.importantCenter {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .detailsContent {
    width: 65%;

    .title {
      font-size: 30px;
      color: red;
      line-height: 40px;
      text-align: center;
      margin: 20px;

    }

    .title:nth-of-type(2) {
      text-align: center;
      margin: 10px 0;
      font-size: 20px;
      color: #5a3201;
    }

   ::v-deep .detailsText {
      p, .ql-align-justify,h4{
        text-indent: 2em;
        margin-block-start: 1em;
        margin-block-end: 1em;
        font-size: 20px ;
        color: #737373;
        line-height: 30px;

        br {
          display: none;
        }

        a {
          color: #B83B13;
          text-decoration: underline;
        }
      }
    }
  }

  .detailsRight {
    width: calc(35% - 40px);
    margin: 20px 0;

    .title {
      height: 48px;
      font-size: 26px;
      font-weight: 600;
      color: #000000;
      line-height: 48px;
    }

      .rightContent:hover {
        cursor: pointer;
      }

      .rightContent{
          width: 100%;
          padding-left: 0;
          .detailsList{
              margin: 40px 0;
              width: 100%;
              height: 120px;
              display: flex;
              justify-content: space-between;
              .listImg{
                  width: 150px;
                  height: 100%;
                  img{
                      width: 100%;
                      height: 100%;
                      object-fit: cover;
                  }
              }
              .listContent{
                  flex: 1;
                  margin-left: 20px;
                  display: flex;
                  flex-direction: column;
                  justify-content:space-between;
                  p{
                      text-indent:0;
                      height: 60px;
                      font-size: 20px;
                      font-weight: 400;
                      color: #000000;
                      line-height: 30px;
                      -webkit-margin-before: 0;
                      margin-block-start: 0;
                      -webkit-margin-after: 0;
                      margin-block-end:0;
                      word-break: break-all;
                      overflow: hidden;
                      display: -webkit-box;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical;
                  }
              }
          }
          .detailsList:first-of-type{
              margin-top: 20px;
          }
      }
  }
}


@media screen and (max-width: 600px) {
  /deep/ .el-dialog {
    width: 90% !important;
  }
}
</style>
