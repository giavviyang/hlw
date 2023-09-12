<template>
    <div class="warp">
        <pathTitle :pathTitleArr="pathTitleArr" @handleTitleClick="handleTitleClick"></pathTitle>
        <div class="pathContainer">
            <childMenu @handleChild="handleChild" :pathArr="pathArr" :archiveActive="archiveActive"></childMenu>
            <div class="path_right">
                <div class="new_content">
                    <div class="list" v-for="(item,index) in archiveList" :key="index" @click="handleDetails(item)">
                        <p class="list_text">{{ item.publishTitle }}</p>
                        <p class="list_time">{{ item.updateTime }}</p>
                    </div>
                </div>
                <div class="searchPage">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="queryParams.pageNum"
                        :page-sizes="[20, 50, 100, 200]"
                        :page-size="queryParams.pageSize"
                        layout="total,  prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>

    </div>
</template>
<script>

import childMenu from "@/components/childMenu.vue";
import PathTitle from "@/components/pathTitle.vue";
import axios from "axios";

export default {
    components: {PathTitle, childMenu},
    name: 'bmfw',
    data() {
        return {
          pathTitleArr:[],
          pathArr: [],
          archiveActive:-1,
          queryParams: {
            type: '便民服务',
            pageNum: 1,
            pageSize: 20
          },
          total: 0,
          archiveList: []

        }
    },
    watch:{
        $route(to,from){
            console.log('to',to)
            this.getPath();
            this.getTitlePath();
        }
    },
    created() {
        console.log('this.$route', this.$route)
        this.getPath();
        this.getTitlePath();

      this.queryData()
    },
    methods: {
        getTitlePath() {
            this.pathTitleArr=[];
            this.$navList.forEach(item => {
                if (this.$route.path === item.path) {
                    this.pathTitleArr.push(item)
                } else {
                    if (item.children) {
                        item.children.forEach(childItem => {
                            if (childItem.path === this.$route.path) {
                                this.pathTitleArr.push(item);
                                this.pathTitleArr.push(childItem)
                            }
                        })
                    }
                }
            })
        },
        getPath() {
            this.pathArr=[];
            this.$navList.forEach(item => {
                if (this.$route.path === item.path) {
                    this.pathArr.push(item)
                    if (item.children) {
                        this.pathArr.push(...item.children)
                    }
                } else {
                    if (item.children) {
                        item.children.forEach(childItem => {
                            if (childItem.path === this.$route.path) {
                                this.pathArr.push(item);
                                this.pathArr.push(...item.children)
                            }
                        })
                    }
                }
            })
            console.log('this.pathArr', this.pathArr)
            // if(this.pathArr[0].pathName==='馆情概况'){
            //     this.archiveActive=0;
            // }
        },
        handleTitleClick(val){
            this.$router.push({path: val});
        },
        handleChild(val){
            this.$router.push({path: val});
            this.pathArr.forEach((item,index)=>{
                if(item.path===val){
                    this.archiveActive=index;
                }
            })
            console.log('this.archiveActive',this.archiveActive)
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
          }
        })
      },
      handleSizeChange(val) {
        this.queryParams.pageSize = val
        this.queryData()
      },
      handleCurrentChange(val) {
        this.queryParams.pageNum = val
        this.queryData()
      },
      /* 跳转到详情页 */
      handleDetails(val){
        this.$router.push({path:'/Details', query:{id:val.id}});
      }
    },

}
</script>
<style scoped lang="scss">

</style>

