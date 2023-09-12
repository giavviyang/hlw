<template>
    <div class="warp">
        <p class="searchDes">共为您找到 <span>{{ total }}</span> 条记录&nbsp;&nbsp; 共 <span>{{ totalPage }}</span> 页</p>
        <div class="search">
            <div v-if="searchContent!=null" class="searchContent">
                <div v-for="(item,index) in searchContent" class="searchText" @click="handleDetails(item)">
                    <p>{{ item.publishTitle }}</p>
                    <span>发布时间：{{ item.updateTime }}</span>
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
            <div v-else class="tips">
                <p v-for="(item,index) in tips" :key="index">{{ item }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import newList from "@/components/newList.vue";
import axios from "axios";

export default {
  name: "home",
  components: {newList},
  data() {
      return {
          queryParams: {
            searchKey: '',
            pageNum: 1,
            pageSize: 20,
          },
          total: 0,
          tips: [
              '建议您：',
              '请检查输入字词有无错误；',
              '请换用另外的查询字词；',
              '请改用较短、较为常见的字词重新查找。'
          ],
          searchContent: [],
      }
  },
  created() {
    this.queryParams.searchKey = this.$route.query.searchKey
    this.queryMessage()
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total/this.queryParams.pageSize)
    }
  },
  methods:{
        queryMessage() {
          axios({
            url: 'publishMessage/searchMessage',
            method: 'get',
            params: this.queryParams
          }).then(res => {
            this.searchContent = res.data.data.rows
            this.total = res.data.data.total
          })
        },
        handleSizeChange(val) {
          this.queryParams.pageSize = val
          this.queryMessage()
        },
        handleCurrentChange(val){
          this.queryParams.pageNum = val
          this.queryMessage()
        },
    /* 跳转到详情页 */
    handleDetails(val){
      this.$router.push({path:'/Details', query:{id:val.id}});
    },
    }
}
</script>

<style scoped lang="scss">
.warp {
  min-height: calc(100vh - 569px);
  padding: 40px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .searchDes {
    height: 30px;
    font-size: 16px;

    span {
      color: red;
    }
  }

  .search {
    width: 100%;
    flex: 1;
    border: 1px solid #ddd;

    .searchContent {

      .searchText {
        border-bottom: 1px dashed #ddd;
        padding: 10px 5px 15px;
        margin: 10px 20px;
        text-align: left;

        p {
          font-size: 18px;
          margin-bottom: 10px;
        }

        span {
          color: #999;
          font-size: 14px;
        }
      }
    }

    .tips {
      padding: 10px 30px;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      p {
        line-height: 30px;
      }

      p:first-of-type {
        color: red;
      }
    }
  }

}

</style>
