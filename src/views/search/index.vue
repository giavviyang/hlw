<template>
    <div>
        <div class="header">
            <div class="header_top">
                <div class="warp">
                    <div class="warp_left">
                        <div class="logo">
                        </div>
                        <div class="title">
                            <div class="title_top" @click="handleHome"></div>
                            <div class="title_bottom"></div>
                        </div>
                    </div>
                    <div class="sx">
                        <div class="sx_img"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="search_content">
            <div class="warp">
                <div class="search">
                    <el-select v-model="selectTypeId"
                               @change="typeChange"
                               placeholder="请选择"
                               size="small"
                               :popper-append-to-body="false">
                        <el-option
                                v-for="item in allTypes"
                                :key="item.value"
                                :label="item.typeOrNickName"
                                :value="item.typeId">
                        </el-option>
                    </el-select>
                    <el-input placeholder="请输入关键字" v-model="selectVal" @clear="searchArchives" clearable
                              class="input-with-select" size="small">
                    </el-input>
                    <el-button slot="append" size="small" @click="searchArchives">查询</el-button>
                </div>
                <div class="searchTable">
                    <el-table
                            :data="tableData"
                            style="width: 100%" stripe>
                        <el-table-column prop="DH" label="档号" width="300"></el-table-column>
                        <el-table-column prop="AJTM" label="题名"></el-table-column>
                        <el-table-column prop="BGQX" label="保管期限" width="200"></el-table-column>
                        <el-table-column prop="MJ" label="密级" width="180"></el-table-column>
                        <el-table-column prop="ND" label="年度" width="150"></el-table-column>
                    </el-table>
                </div>
                <div class="searchPage">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="queryParams.pageNum+1"
                            :page-sizes="[20, 50, 100, 200]"
                            :page-size="queryParams.pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>

            </div>
        </div>
        <floatBtn/>
        <Footer/>
    </div>
</template>

<script>
import axios from "axios";
import floatBtn from '@/layout/floatBtn';
import Footer from "@/layout/Footer.vue";

export default {
    components: {
        Footer,
        floatBtn
    },
    name: 'Header',
    data() {
        return {
            allTypes: [],
            selectTypeId: '',
            selectVal: '',
            queryParams: {
                archivesTypeId: '',
                search: '',
                pageNum: 0,
                pageSize: 20
            },
            total: 0,
            tableData: [],
        }
    },
    created() {
        this.selectAllTypes()
    },

    methods: {
        // 查询所有档案类型
        selectAllTypes() {
            axios({
                url: 'type/queryArchivesAllType',
                method: 'get',
                params: {}
            }).then(res => {
                if (res.data.code == 200) {
                    this.allTypes = res.data.rows
                    if (res.data.rows.length > 0) {
                        this.selectTypeId = res.data.rows[0].typeId

                        this.searchArchives()
                    }
                }
            })
        },

        typeChange(type) {
            this.selectVal = ''
            this.selectTypeId = type
            this.searchArchives()
        },
        // 点击首页
        handleHome() {
            this.$router.push({path: '/index'});
        },
        // 搜索
        searchArchives() {
            this.queryParams.search = this.selectVal
            this.queryParams.archivesTypeId = this.selectTypeId
            axios({
                url: 'query/archivesList',
                method: 'get',
                params: this.queryParams
            }).then(res => {
                if (res.data.code == 200) {
                    this.tableData = res.data.data
                    this.total = res.data.count
                }
            })
        },

        handleSizeChange(val) {
            this.queryParams.pageSize = val
            this.searchArchives()
        },
        handleCurrentChange(val) {
            this.queryParams.pageNum = val - 1
            this.searchArchives()
        }
    }
}
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 314px;


  .header_top {
    height: 314px;
    width: 100%;
    background: url("../../assets/img/bg.png") no-repeat 50% 50%;
    background-size: cover;

    .warp {
      display: flex;
      justify-content: space-between;

      .warp_left {
        display: flex;
        justify-content: flex-start;

        .logo {
          width: 106px;
          height: 106px;
          position: relative;
          top: 149px;
          background: url("../../assets/img/logo.png") no-repeat 50% 50%;
          background-size: cover;
        }

        .title {
          width: 356px;
          height: 100px;
          position: relative;
          top: 155px;
          left: 25px;

          .title_top {
            height: 41px;
            width: 100%;
            background: url("../../assets/img/title_top.png") no-repeat 50% 50%;
            background-size: cover;
          }

          .title_center {
            width: 98px;
            height: 20px;
            font-size: 17px;
            color: #AE3109;
            line-height: 20px;
            margin: 5px 0 5px;
            font-weight: bold;
          }

          .title_bottom {
            height: 22px;
            width: 100%;
            margin-top: 20px;
            background: url("../../assets/img/title_bottom2.png") no-repeat;
          }
        }
      }

      .sx {
        width: 473px;
        height: 100%;

        .sx_img {
          height: 100%;
          width: 100%;
          background: url("../../assets/img/sx.png") no-repeat 50% 50%;
          //background-size: cover;

        }

        ::v-deep .el-form {
          position: relative;
          left: 10px;
          top: -20px;

          .el-form-item:first-of-type {
            width: 80%;

            .el-form-item__content {
              width: 100%;
            }
          }

          .el-button {
            background-color: #B83B13;
            border-color: #B83B13;
          }
        }
      }
    }
  }
}

.search_content {
  width: 100%;
  background-color: #fff;

  .warp {
    .search {
      margin-top: 30px;
        height: 40px;
      display: flex;
      justify-content: space-between;

      .el-select {
        width: 270px;
          height: 40px;

        ::v-deep .el-select-dropdown {
          border: 1px solid #B83B13;
        }

        .el-select-dropdown__item.hover,
        .el-select-dropdown__item:hover {
          color: #B83B13;
        }

        .selected {
          color: #B83B13;
        }
      }

      .input-with-select {
        width: calc(100% - 400px);
      }

      .el-select, .el-input {
        ::v-deep .el-input__inner {
          border: 1px solid #B83B13;
            height: 40px;
        }
      }
        .el-button {
            border-radius: 6px;
            background-color: #B83B13;
            color: #fff;
            width: 100px;
            height: 40px;
        }
    }

    .searchTable {
      width: 100%;
      min-height: calc(100vh - 651px);
      margin-top: 30px;
      //min-height: 500px;
      ::v-deep .el-table {
        .el-table__header-wrapper {
          border-radius: 4px;

          th {

            background-color: #F2E8E0;
          }
        }

        .el-table__cell {
          border: none;
        }
      }
    }
  }
}

@media screen and (min-width: 1200px) {
  .header {
    .logo {
      height: 88px;

      .center {
        font-size: 22px;
      }
    }
  }

  .nav {

    .center {
      height: auto !important;
      overflow: scroll;
      white-space: nowrap;

      li {
        font-size: 14px !important;
        margin: 0 10px !important
      }
    }

    .center::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }

  .el-dropdown-link {
    font-size: 14px;
  }
}
</style>
