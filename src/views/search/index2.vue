<template>
    <div class="search">
        <div class="header">
            <div class="center">
                <div class="searchTitle">
                    <p>三门峡市档案馆</p>
                    <p>数字档案馆公共查询系统</p>
                </div>
                <div class="ipt">
                    <el-select v-model="value"
                               @change="archivesTypeChange"
                               placeholder="请选择档案类型">
                        <el-option
                                v-for="item in options"
                                :key="item.typeId"
                                :label="item.typeOrNickName"
                                :value="item.typeId">
                        </el-option>
                    </el-select>
                    <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
                    </el-input>
                </div>
            </div>
        </div>
        <div class="content">
            <el-table
                    border
                    :data="tableData"
                    stripe
                    height="800px">
                <el-table-column
                        prop="DH"
                        label="档号"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="AJTM"
                        label="题名">
                </el-table-column>
                <el-table-column
                        prop="BGQX"
                        label="保管期限"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="MJ"
                        label="密级"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="ND"
                        label="年度"
                        width="150">
                </el-table-column>
            </el-table>
        </div>
        <el-pagination
                :current-page="pageNum"
                :page-size="pageSize"
                @current-change = "currentlist"
                layout="prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
// import axios from "axios";
import {queryArchivesAllType, archivesTableList, archivesList} from "@/api/query"

export default {
    name: "Search1",
    data() {
        return {
            options: [],
            value: '',
            input: '',
            tableData: [],
            pageNum: 0,
            pageSize: 6,
            total: 0,
            name: ''
        }
    },
    mounted() {
        this.getselect()
    },
    methods: {
        getselect() {
            queryArchivesAllType().then(res => {
                if (res.data.code == 200) {
                    this.options = res.data.rows
                    if (this.options.length >= 0) {
                        this.value = this.options[0].typeId
                        this.getList()
                    }
                }
            })
        },

        searchData() {
            let params = {
                name: this.name,
                search: this.input,
                pageNum: 0,
                pageSize: 6
            }
            archivesList(params).then(res => {
                if (res.data.code == 200) {
                    console.log(res.data.count)
                    this.tableData = res.data.data
                    this.total = res.data.count
                }
            })
        },

        getList() {
            archivesTableList({archivesTypeId: this.value,}).then(res => {
                if (res.data.code == 200) {
                    this.name = res.data.data[0]["table_name"]
                    let params = {
                        name: this.name,
                        search: this.input,
                        pageNum: this.pageNum,
                        pageSize: this.pageSize
                    }
                    archivesList(params).then(res => {
                        if (res.data.code == 200) {
                            console.log(res.data.count)
                            this.tableData = res.data.data
                            this.total = res.data.count
                        }
                    })
                }
            })
        },
        getseleData(){
            let params = {
                name: this.name,
                search: this.input,
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }
            archivesList(params).then(res => {
                if (res.data.code == 200) {
                    console.log(res)
                    this.tableData = res.data.data
                }
            })
        },
        currentlist(val){
            // console.log("pageNum:",val)
            this.pageNum = val
            this.getseleData()
        },
        // 修改类型时触发，刷新数据
        archivesTypeChange(type) {
            this.input = ''
            this.getList()
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
  height: 260px;
  background: linear-gradient(180deg, #84c0f3, #3f85e3);
  //background: linear-gradient(180deg, #fae8cf, #edcd9f);

  .center {
    height: 260px;
    background: linear-gradient(180deg, #84c0f3, #3f85e3);
    //background: linear-gradient(180deg, #fae8cf, #edcd9f);
    overflow: hidden;

    .searchTitle {
      width: 100%;
      height: 40%;
      //color: #fff;
      p:first-of-type {
        font-size: 34px;
        font-weight: 600;
        //font-family: '华文仿宋';
        color:#fff;
        //color: #775e3c;
        letter-spacing: 2px;
        margin-top: 25px;
      }

      p:nth-of-type(2) {
        font-size: 24px;
        margin: 5px 0;
        letter-spacing: 2px;
        color: #fff;
        //color: rgba(0, 0, 0, 0.3);
      }

    }

    .ipt {
      width: 80%;
      margin: 20px auto;
      display: flex;
      justify-content: center;
      height: 50px;

      .iptType {
        width: 100px;
        line-height: 50px;
        margin-right: 10px;
        border: 1px solid #aaa;
        border-right: none;
        text-align: center;
        color: rgba(0, 0, 0, 0.5);
        background: linear-gradient(90deg, rgb(255, 255, 255), rgba(255, 255, 255, 0.1));
      }

      /deep/ .el-input {
        width: 75%;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

        .el-input__inner {
          height: 50px;
          border: none;
        }
      }

      /deep/ .el-input-group__append {
        background-color: #fff;
        border: none;

        .el-icon-search {
          //color: #fae8cf;
          color: #b2cef4;
          font-size: 24px;
        }
      }
    }
  }
}

.content {
  height: calc(100vh - 348px);
  //height: calc(100vh - 320px);
  background-color: orange;
  width: 99%;
  margin: 10px auto;
  overflow: hidden;

  /deep/ .el-table {
    overflow: auto;

    .cell {
      text-align: center;
    }

    .el-table__header-wrapper {
      .el-table__cell {
        //background-color: #fae8cf;
        background-color: #d9e7f9;
      }
    }
  }
}

/deep/ .el-pagination {
  display: flex;
  justify-content: center;

  .btn-prev {
    background-color: transparent;
  }

  .btn-next {
    background-color: transparent;
  }

  .el-pager li {
    background-color: transparent;
  }
}

@media screen and (max-width: 600px){
  .ipt {
    width: 100% !important;
  }
}
</style>
