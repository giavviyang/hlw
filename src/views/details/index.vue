<template>
    <div class="warp">
        <div class="pathTitle">
            <p @click="handleHome">三门峡市档案馆</p>
            <p v-for="item in pathTitleArr" :key="item.path" @click="handleTitleClick(item.path)">
                <i class="el-icon-arrow-right"></i>{{ item.pathName }} </p>
        </div>
        <div>
            <div class="title" v-show="detailData.publishTitle">{{ detailData.publishTitle }}</div>
            <div v-html="detailData.publishContent" class="detailsText" v-show="detailData.publishContent"></div>
        </div>
    </div>
</template>
<script>

import ChildMenu from "@/components/childMenu.vue";
import PathTitle from "@/components/pathTitle.vue";
import axios from "axios";


export default {
    components: {PathTitle, ChildMenu},
    name: 'gzdt',
    data() {
        return {
            detailData: '',
            pathTitleArr: []
        }
    },
    created() {
        this.getDetails();
    },
    methods: {
        getDetails() {
          axios({
            url: 'publishMessage/queryMessageDetailById',
            method: 'get',
            params: {id: this.$route.query.id}
          }).then(res => {
            this.detailData = res.data.data
            // 图片路径处理
            if (this.detailData.publishContent) {
              let reg = new RegExp('src="/publishMessage', 'g')//g代表全部
              this.detailData.publishContent = this.detailData.publishContent.replace(reg, 'src="/api/publishMessage')
            }
            this.pathTitleArr = [];
            if (this.detailData) {
                let publishType = this.detailData.publishType;
                this.$navList.forEach(item => {
                    if (publishType === item.pathName) {
                        this.pathTitleArr.push(item)
                    } else {
                        if (item.children) {
                            item.children.forEach(childItem => {
                                if (childItem.pathName === publishType) {
                                    this.pathTitleArr.push(item);
                                    this.pathTitleArr.push(childItem)
                                }
                            })
                        }
                    }
                })
                if(publishType==='网上展厅'){
                    this.pathTitleArr = [
                        {path: '/wszt', pathName: '网上展厅'}
                    ];
                }
            }

          })
        },
        // 点击首页
        handleHome() {
            this.$router.push({path: '/index'});
        },
        handleTitleClick(val) {
            this.$router.push({path: val});
            console.log('val', val)
        },
    }
}
</script>
<style scoped lang="scss">
.warp {
    min-height: 412px;
}

.title {
  font-size: 30px;
  color: #5a3201;
  line-height: 40px;
  text-align: center;
  margin: 20px;
}

::v-deep .detailsText {
  p, .ql-align-justify {
    text-indent: 2em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    font-size: 18px;
    color: #737373;
    line-height: 30px;

    br {
      display: none;
    }
      a{
          color: #B83B13;
        text-decoration: underline;
      }
  }
}
</style>

