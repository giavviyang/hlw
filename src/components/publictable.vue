<template>
  <div>
    <div class="listContent">
      <div class="title">
        <span>{{ titleName }}</span>
      </div>
      <div class="list">
        <ul>
          <li
              v-for="item in catalogData"
              :key="item.id"
              @click="goDetailContent(item)"
          >
            <p>
              {{ item.publishTitle }} <span>{{ item.updateTime }}</span>
            </p>
          </li>
        </ul>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[20, 30, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import CommonPage from "@/layout/ItemHeader";
import axios from "axios";

export default {
  props: {
    titleName: {
      type: String,
    },
    requestUrl:{
      type: String,
    }
  },
  components: { CommonPage },
  created() {
    this.getCatalogData();
  },
  data() {
    return {
      activeName: "second",
      catalogData: {},
      details: {},
      pageNum: 1,
      pageSize: 20,
      total: 0,
      collectid: '',
      status: ''
    };
  },
  methods: {
    getCatalogData() {
      axios({
        url: this.requestUrl,
        method: 'get',
        params: {
          // publishType: this.titleName=='政务信息'?'法律法规':(this.titleName=='档案业务'?'档案工作状态':(this.titleName=='互动交流'?'互动交流':(this.titleName=='通知公告'?'公告信息':this.titleName))),
          publishType:this.titleName,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(res => {
        this.pageNum = res.data.pageNum;
        this.pageSize = res.data.pageSize;
        this.total = res.data.total;
        this.catalogData = res.data.rows
      })
    },
    goDetailContent(val) {
      console.log(val)
      window.localStorage.setItem('detailsData',JSON.stringify(val));
      this.$router.push({
        path: 'details' ,query:{publishTitle:val}
      })
    },
    handleSizeChange(val) {
      axios({
        url: "this.requestUrl",
        method: "POST",
        data: {
          publishType: this.titleName,
          pageNum: this.pageNum,
          pageSize: val,
        },
      }).then((res) => {
        if (res.data.code == 200) {
          this.catalogData = res.data
        } else {
          this.$message.error(res.data.data);
        }
      });
    },
    handleCurrentChange(val) {
      axios({
        url: "this.requestUrl",
        method: "POST",
        data: {
          publishType: this.titleName,
          pageNum: val,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        if (res.data.code == 200) {
          this.catalogData = res.data
        } else {
          this.$message.error(res.data.data);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.listContent {
  min-height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  padding-bottom: 5px;

  .title {
    height: 38px;
    //background-color: #f7f7f7;
    margin-top: 5px;

    span {
      width: 120px;
      display: inline-block;
      height: 32px;
      line-height: 32px;
      color: #fff;
      font-weight: bold;
      font-size: 20px;
      padding: 2px 5px;
      background-size: 100% 51%;
      background: linear-gradient(
              -135deg,
              transparent 22px,
              /*#fae8cf 22px,*/
              #d9e7f9 22px,
              /*#edcd9f 100%*/
              #3f85e3 100%
      )
      top right no-repeat,
      linear-gradient(-45deg, transparent 22px, #d9e7f9 22px, #3f85e3 100%)
      bottom right no-repeat;
      background-size: 100% 51%;
    }
  }

  .list {
    overflow: hidden;
    border: 1px #cdcdcd solid;
    flex-grow: 1;
    padding: 20px 0 0 32px;
    background: url("../assets/img/list_con_bg.jpg") repeat-x 1px 1px;
    display: flex;
    flex-direction: column;

    ul {
      width: 100%;
      //margin-bottom: 30px;
      flex-grow: 1;

      li {
        width: 100%;
        height: 34px;
        line-height: 34px;
        cursor: pointer;
        position: relative;

        p {
          cursor: pointer;
          font-size: 16px;
          font-family: "微软雅黑";
          width: 97%;
          display: inline-flex;
          justify-content: space-between;
          margin-left: 20px;

          span {
            display: inline-block;
            width: 180px;
          }
        }

        p:hover {
          color: #775e3c;
        }
      }

      li:before {
        content: "";
        width: 6px;
        height: 6px;
        background-color: #d2d2d2;
        border-radius: 50%;
        display: inline-block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }

      li:nth-of-type(5n) {
        border-bottom: 1px #d2d2d2 solid;
        padding-bottom: 20px;
        margin-bottom: 20px;
      }

      li:nth-of-type(5n):before {
        top: 35%;
      }
    }

    .el-pagination {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /deep/ .el-pager li.active {
      color: #775e3c;
      cursor: default;
    }
  }
}
@media screen and (max-width: 600px){
  .listContent .list{
    padding: 0;
  }
  /deep/ .el-pagination__jump{
    margin-left: 0;
  }
  .listContent .list ul li{
    overflow: auto;
  }
  .listContent .list .el-pagination{
    overflow: auto;
  }
  .listContent .list ul li p{
    display: block;
    width: auto;
    overflow: auto;
    white-space: nowrap;
  }
  .listContent .list ul li p span{
    display: contents;
  }
  .listContent::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .listContent .list ul li::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
</style>
