<template>
        <div class="warp">
            <pathTitle></pathTitle>
            <div class="pathContainer">
                <ChildMenu></ChildMenu>
                <div class="path_right">
                    <div class="new_content">
                        <div class="list" v-for="(item,index) in archiveList" :key="index" @click="handleCollectDetails(item)">
                            <p class="list_text">{{ item.title }}</p>
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
                            layout="total, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>

        </div>

</template>
<script>

import ChildMenu from "@/components/childMenu.vue";
import PathTitle from "@/components/pathTitle.vue";
import axios from "axios";


export default {
    components: {PathTitle, ChildMenu},
    name: 'dazj',
    data() {
        return {
          archiveList: [],
          queryParams: {
            pageNum: 1,
            pageSize: 20
          },
          total: 0,
        }
    },
    created() {
      this.queryData()
    },
    methods: {
      queryData() {
        axios({
          url: "/sysCollect/queryPagingCollectData",
          method: "POST",
          data: this.queryParams,
        }).then(res => {
          if (res.data.code == 200) {
            this.archiveList = res.data.rows
            this.total = res.data.total
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
      handleCollectDetails(val){
        this.$router.push({path:'/collectionDetails', query:{id: val.id}});
      }
    },

}
</script>
<style scoped lang="scss">

</style>

