<template>
    <div class="warp">
        <div class="pathTitle">
            <p @click="handleHome">三门峡市档案馆</p>
            <p v-for="item in pathTitleArr" :key="item.path" @click="handleTitleClick(item.path)">
                <i class="el-icon-arrow-right"></i>{{ item.pathName }} </p>
        </div>
        <div class="down">
            <div class="down-left">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>个人信息</span>
                    </div>
                    <div class="text item">用户名: {{ userinfo.userName }}</div>
                    <div class="text item">联系方式: {{ userinfo.phone }}</div>
                    <div class="text item">真实姓名: {{ userinfo.realName }}</div>
                    <div class="text item">性别: {{ userinfo.sex == 0 ? '男' : '女' }}</div>
                    <div class="text item">身份证号: {{ userinfo.cardNum }}</div>
                    <div class="text item">工作单位: {{ userinfo.workUnit }}</div>
                    <div class="text item">住址: {{ userinfo.address }}</div>
                    <div class="text item">邮箱: {{ userinfo.email }}</div>
                </el-card>
            </div>
            <div class="down-right">
                <el-tabs type="border-card">
                    <el-tab-pane label="当前上传">
                        <div>
                            <div class="title">{{ detail.title }}</div>
                            <div class="detailsText" v-html="detail.content"></div>
                        </div>
                        <div class="btn">
                            <el-button @click="openUpdate"
                                       style="background-color: #B83B13;border-color: #B83B13;"
                                       type="primary" >选择图片</el-button>
                        </div>

                        <el-dialog
                                title="上传文件"
                                :visible.sync="dialogUpload"
                                width="25%"
                                class="dialogUpload"
                        >
                            <el-form label-width="80px">
                                <el-form-item label="描述">
                                    <el-input style="margin:20px 0" v-model="input"
                                              aria-placeholder="请输入内容"></el-input>
                                </el-form-item>
                            </el-form>
                            <el-upload
                                    drag
                                    :limit="limitNum"
                                    :auto-upload="false"
                                    accept=".png"
                                    :action="UploadUrl()"
                                    :before-upload="beforeUploadFile"
                                    :on-change="fileChange"
                                    :on-exceed="exceedFile"
                                    :on-success="handleSuccess"
                                    :on-error="handleError"
                                    :file-list="dataFileList"
                            >
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <div class="el-upload__tip" slot="tip">
                                    只能上传png文件，且不超过50M
                                </div>
                            </el-upload>
                            <!--按钮-->
                            <div slot="footer" class="dialog-footer">
                                <el-button size="mini" @click="uploadExit">取 消</el-button>
                                <el-button size="mini" type="primary" @click="uploadSave"
                                >立即上传
                                </el-button
                                >
                            </div>
                        </el-dialog>
                    </el-tab-pane>
                    <el-tab-pane label="上传历史">
                        <div class="content">
                            <el-table
                                    :data="tableData"
                                    stripe
                                    style="text-align: center"
                                    height="800px">
                                <el-table-column
                                        prop="sysDescribe"
                                        label="描述"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="url"
                                        label="图片"
                                        width="180">
                                    <template slot-scope="scope">
                                        <el-image
                                                style="width: 100px;"
                                                mode="widthFix"
                                                :src="scope.row.url"
                                                :preview-src-list="[scope.row.url]">
                                        </el-image>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="createdAt"
                                        label="日期"
                                        width="180">
                                </el-table-column>
                            </el-table>
                        </div>
                        <el-pagination
                                :current-page="pageNum"
                                :page-size="pageSize"
                                @current-change="currentlist"
                                layout="prev, pager, next, jumper"
                                :total="total"
                                style="text-align: center;"
                        >
                        </el-pagination>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import CommonPage from "@/layout/ItemHeader";
import Publictable from "@/components/publictable";
import axios from "axios";

export default {
    components: {"public-table": Publictable, CommonPage},
    data() {
        return {
            pathTitleArr: [
                {
                    path: '/personalcenter', pathName: '个人中心',
                }
            ],
            input: '',
            detail: {},
            userinfo: {},
            limitNum: 1,
            //数据包文件数据
            dataFileList: [],
            pageNum: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            dialogUpload: false, //上传弹窗
        }
    },
    created() {
        this.getDetail()
        this.getList()
        this.getTable()
    },
    methods: {
        handleHome() {
            this.$router.push({path: '/index'});
        },
        handleTitleClick(val) {
            this.$router.push({path: val.path});
        },
        getDetail() {
            axios({
                url: "/sysCollect/queryPagingCollectData",
                method: "POST",
                data: {id: this.$route.query.detailId, pageNum: 1, pageSize: 20},
            }).then(res => {
                if (res.data.code == 200) {
                    this.detail = res.data.rows[0]
                    // 图片路径处理
                    if (this.detail.publishContent) {
                        let reg = new RegExp('src="/publishMessage', 'g')//g代表全部
                        this.detail.publishContent = this.detail.publishContent.replace(reg, 'src="/api/publishMessage')
                    }
                }
            })
        },
        getList() {
            axios({
                url: "/appuser/getUserInfo",
                method: "get",
                headers: {
                    [`x-token`]: localStorage.getItem("token"),
                },
            }).then((res) => {
                if (res.data.code == 200) {
                    this.userinfo = res.data.data
                }
            });
        },
        getTable() {
            axios({
                url: "/sysCollect/getUserCollectData",
                method: "get",
                params: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                },
                headers: {
                    [`x-token`]: localStorage.getItem("token"),
                },
            }).then((res) => {
                if (res.data.code == 200) {
                    this.tableData = res.data.data;
                    this.total = res.data.total
                }
            });
        },
        currentlist(val) {
            this.pageNum = val
            this.getTable()
        },
        openUpdate() {
            this.dialogUpload = true
        },
        /*数据包上传*/
        UploadUrl() {
            // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
            return "";
        },
        // 文件上传失败时的钩子
        handleError(err, file, fileList) {
            this.$message.error("文件上传失败");
        },
        // 文件上传成功时的钩子
        handleSuccess(res, file, fileList) {
            this.$message.success("文件上传成功");
        },
        // 文件超出个数限制时的钩子
        exceedFile(files, fileList) {
            this.$message.warning(
                `只能选择${this.limitNum}个文件,请删除后上传`
            );
        },
        // 文件状态改变时的钩子
        fileChange(file, fileList) {
            if (fileList.length > 0) {
                this.dataFileList = [fileList[fileList.length - 1]]
            }
        },
        beforeUploadFile(file) {
            let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
            let size = file.size / 1024 / 1024;
            //指定上传类型
            if (extension !== "png") {
                this.$message.warning("上传文件只能是zip格式");
            }
            if (size > 50) {
                this.$message.warning("文件大小不得超过50M");
            }
        },
        infoSave(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios({
                        url: "/appuser/perfectInfo",
                        method: "POST",
                        headers: {
                            [`x-token`]: localStorage.getItem("token"),
                        },
                        params: {
                            realName: this.information.Infoname,
                            sex: this.information.gender,
                            cardType: this.information.certificates,
                            cardNum: this.information.cardnum,
                            workUnit: this.information.workadd,
                            address: this.information.worksite,
                            email: this.information.email,
                        },
                    }).then((res) => {
                        console.log(res);
                        if (res.data.code == 200) {
                            this.$message.success(res.data.msg);
                            console.log(res.data.msg);
                            this.dialoginformation = false;
                        } else {
                            // this.$message.warning(r);
                            this.dialoginformation = false;
                        }
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        infoExit() {
            this.dialoginformation = false;
        },
        /*数据包关闭、取消方法*/
        uploadExit() {
            this.dialogUpload = false;
            this.$message("取消上传文件");
        },
        /*数据包上传保存方法*/
        uploadSave() {
            if (this.dataFileList != '') {
                if (this.input != '') {
                    let form = new FormData();
                    form.append('tid', this.detail.id);
                    form.append('describe', this.input);
                    form.append('file', this.dataFileList[0].raw);
                    let data = form
                    axios({
                        url: "/sysCollect/uploadCollectData",
                        method: "POST",
                        headers: {
                            [`x-token`]: localStorage.getItem("token"),
                        },
                        data,
                    }).then((res) => {
                        if (res.data.code == 200) {
                            this.dialogUpload = false;
                            this.$message.success(res.data.msg);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                        this.getTable()
                    });
                } else {
                    this.$message.warning('请先输入一句话的描述哦')
                }
            } else {
                this.$message.error('请先上传文件');
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.BreadcrumbNav {
  display: flex;
  align-items: center;
  line-height: 33px;
  padding: 5px;
  border-bottom: 2px solid #D7D7D7;

  .nowPosition {
    position: relative;
    margin-left: 15px;
  }

  .nowPosition:before {
    content: "";
    display: block;
    width: 5px;
    height: 20px;
    background-color: #2F6EA2;
    position: absolute;
    top: 7px;
    left: -20px;
  }
}

.listContent {
  min-height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;

  .title {
    height: 38px;
    margin-top: 10px;

    span {
      width: 120px;
      display: inline-block;
      height: 32px;
      line-height: 32px;
      color: #fff;
      font-weight: bold;
      font-size: 20px;
      padding: 2px 5px;
      background: linear-gradient(-135deg, transparent 22px, #4D8EC4 22px, #97BFE2 100%) top right no-repeat,
      linear-gradient(-45deg, transparent 22px, #4D8EC4 22px, #97BFE2 100%) bottom right no-repeat;
      background-size: 100% 51%;
    }
  }

  .list {
    overflow: hidden;
    border: 1px #cdcdcd solid;
    flex-grow: 1;
    padding: 20px 0 0 32px;
    background: url("../../assets/img/list_con_bg.jpg") repeat-x 1px 1px;
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
          color: #2e6da1;
        }
      }

      li:before {
        content: "";
        width: 6px;
        height: 6px;
        background-color: #D2D2D2;
        border-radius: 50%;
        display: inline-block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }

      li:nth-of-type(5n) {
        border-bottom: 1px #D2D2D2 solid;
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
  }
}

.down {
    margin-top: 40px;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

  .down-left {
    width: 40%;

    .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both
    }

    .box-card {
      width: 100%;
    }

  }

  .down-right {
    width: 60%;
    margin-left: 20px;
      min-height: 100%;
::v-deep .el-tabs{
    height: 100%;
    .el-tabs__content{
        height: calc(100% - 40px);
        box-sizing: border-box;
        .el-tab-pane{
            height: 100%;
        }
        .el-tab-pane:first-of-type{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .btn{
                text-align: center;
            }
        }
    }
}
    .dialogUpload {
      ::v-deep .el-upload-dragger {
        width: 340px;
      }

      /deep/ .el-dialog__body {
        padding: 10px;

        & > div {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
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
            background-color: #BFDDF1;
          }
        }
      }
    }
  }

}

.el-form-item {
  margin-bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep .el-form-item__content {
  margin-left: 10px !important;
}

.el-form-item__label {
  padding: 0 5px 0 0;
}


@media screen and (max-width: 600px) {
  .down {
    display: block;

    .down-left {
      width: 100%;
    }

    .down-right {
      width: 100%;
      margin-left: 0;
      margin-top: 10px;
    }

    /deep/ .el-dialog {
      width: 90% !important;
    }
  }
}

.title {
  font-size: 30px;
  color: #5a3201;
  line-height: 40px;
  text-align: center;
  margin: 20px;
}

.detailsText {
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
