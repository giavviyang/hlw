<template>
    <div class="warp">
        <div class="pathTitle">
            <p @click="handleHome">三门峡市档案馆</p>
            <p v-for="item in pathTitleArr" :key="item.path" @click="handleTitleClick(item.path)">
                <i class="el-icon-arrow-right"></i>{{ item.pathName }} </p>
        </div>
        <div>
            <div class="detailsContent">
                <div class="title">{{ detailsData.title }}</div>
                <div class="title" style="font-size:12px">{{ detailsData.updateTime }}</div>
                <div v-html="detailsData.content" class="detailsText"></div>
            </div>
            <div style="text-align: center;padding-top: 20px;padding-bottom: 10px">
                <el-button style="background-color: #B83B13;border-color: #B83B13;"
                           type="primary"
                           @click="openUpdate">我要参展
                </el-button>
            </div>
        </div>

    <el-dialog title="个人身份信息认证" :visible.sync="perInfoAuth" width="30%">
      <el-tabs type="border-card" :value="tebIndex" @tab-click="tabFun">
        <el-tab-pane label="登录">
          <el-form
              :model="login"
              :rules="rules"
              ref="login"
              label-width="80px"
              class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="name">
              <el-input v-model="login.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input type="password" v-model="login.pwd"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册">
          <el-form
              :model="register"
              :rules="rules"
              ref="register"
              label-width="80px"
              class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="regname">
              <el-input v-model="register.regname"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="regpwd">
              <el-input
                  type="password"
                  v-model="register.regpwd"
                  autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPwd">
              <el-input
                  type="password"
                  v-model="register.confirmPwd"
                  autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="contactInfo">
              <el-input v-model="register.contactInfo"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="perInfoAuth = false">取 消</el-button>
        <el-button
            size="mini"
            v-if="tebIndex == 0"
            type="primary"
            @click="onSubmit('login')"
        >确 定</el-button
        >
        <el-button
            size="mini"
            v-if="tebIndex == 1"
            type="primary"
            @click="onSubmit('register')"
        >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
        title="上传文件"
        :visible.sync="dialogUpload"
        width="30%"
        class="dialogUpload"
    >
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
    <!--     完善信息 -->
    <el-dialog title="完善信息" :visible.sync="dialoginformation">
      <el-tabs type="border-card">
        <el-tab-pane label="完善信息">
          <el-form
              :model="information"
              :rules="rules"
              ref="information"
              label-width="80px"
              class="demo-ruleForm"
          >
            <el-form-item label="真实姓名" prop="Infoname">
              <el-input v-model="information.Infoname"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select v-model="information.gender" placeholder="请选择性别">
                <el-option label="男" value="0"></el-option>
                <el-option label="女" value="1"></el-option>
                <el-option label="未知" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件类型" prop="certificates">
              <el-select
                  v-model="information.certificates"
                  placeholder="请选择证件类型"
              >
                <el-option label="身份证" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件号码" prop="Infoname">
              <el-input v-model="information.cardnum"></el-input>
            </el-form-item>
            <el-form-item label="工作单位" prop="Infoname">
              <el-input v-model="information.workadd"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="Infoname">
              <el-input v-model="information.worksite"></el-input>
            </el-form-item>
            <el-form-item
                label="邮箱"
                prop="email"
                :rules="[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                {
                  type: 'email',
                  message: '请输入正确的邮箱地址',
                  trigger: ['blur', 'change'],
                },
              ]"
            >
              <el-input v-model="information.email"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!--按钮-->
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="infoExit">取 消</el-button>
        <el-button size="mini" type="primary" @click="infoSave('information')"
        >确认
        </el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ItemHeader from "@/layout/ItemHeader";
import axios from "axios";
import PathTitle from "@/components/pathTitle.vue";

export default {
    name: "collectionDetails",
    components: {PathTitle, ItemHeader},
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (this.register.regpwd !== "") {
                    this.$refs.register.validateField("checkPass");
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.register.regpwd) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            pathTitleArr: [
                {
                    path: '/jlhd', pathName: '交流互动',
                },
                {path: '/dazj', pathName: '档案征集', parentName: '交流互动'},
            ],
            publishType: "",
            title: "",
            publishContent: "",
            detailsData: {},
            perInfoAuth: false, //个人信息认证弹窗
            dialogUpload: false, //上传弹窗
            dialoginformation: false, //完善信息弹窗
            login: {
                name: "",
                pwd: "",
            },
            register: {
                regname: "",
                regpwd: "",
                confirmPwd: "",
                contactInfo: "",
            },
            information: {
                Infoname: "",
                gender: "",
                cardnum: "",
                workadd: "",
                worksite: "",
                email: "",
                certificates: "",
            },
            rules: {
                name: [{required: true, message: "请输入用户名称", trigger: "blur"}],
                pwd: [{required: true, message: "请输入密码", trigger: "blur"}],
                regname: [
                    {required: true, message: "请输入用户名称", trigger: "blur"},
                ],
                regpwd: [{validator: validatePass, trigger: "blur"}],
                confirmPwd: [{validator: validatePass2, trigger: "blur"}],
                contactInfo: [
                    {required: true, message: "请输入联系方式", trigger: "blur"},
                ],
                Infoname: [
                    {required: true, message: "请输入真实姓名", trigger: "blur"},
                ],
                gender: [{required: true, message: "请选择性别", trigger: "change"}],
                certificates: [
                    {required: true, message: "请选择证件类型", trigger: "change"},
                ],
                cardnum: [
                    {required: true, message: "请输入证件号码", trigger: "blur"},
                ],
                workadd: [
                    {required: true, message: "请输入工作单位", trigger: "blur"},
                ],
                worksite: [{required: true, message: "请输入地址", trigger: "blur"}],
            },
            tebIndex: 0,
            limitNum: 1,
            //数据包文件数据
            dataFileList: [],
        };
    },
    created() {
        axios({
            url: "/sysCollect/queryPagingCollectData",
            method: "POST",
            data: {id: this.$route.query.id, pageNum: 1, pageSize: 20},
        }).then(res => {
            if (res.data.code == 200) {
                this.detailsData = res.data.rows[0];
                console.log('this.detailsData ', res)
            }
        })
    },
    methods: {
        handleTitleClick(val) {
            this.$router.push({path: val});
        },
        openUpdate() {
            if (localStorage.getItem("token")) {
                axios({
                    url: "/appuser/getUserInfo",
                    method: "get",
                    headers: {
                        [`x-token`]: localStorage.getItem("token"),
                    },
                }).then((res) => {
                    console.log(res);
                    if (res.data.code == 200) {
                        console.log(res.data.data.status)
                        if (res.data.data.status == 0) {
                            this.dialoginformation = true; //完善信息弹窗
                        } else if (res.data.data.status == 2) {
                            this.$router.push({
                                path: 'personalcenter',
                                query: {detail: this.detailsData}
                            })
                        } else if (res.data.data.status == 1) {
                            this.$message.warning('您提交的资料待审批')
                        } else {
                            this.$message.error('您提交的资料被驳回，请核实后重新提交')
                            setTimeout(() => {
                                this.dialoginformation = true
                            }, 1000)
                        }
                    } else {
                        this.perInfoAuth = true
                    }
                });
            } else {
                this.perInfoAuth = true;
            }
        },
        tabFun(e) {
            this.tebIndex = e.index;
        },
        onSubmit(formName) {
            if (this.tebIndex == 0) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios({
                            url: "/appuser/login",
                            method: "POST",
                            params: {
                                userName: this.login.name,
                                passWord: this.login.pwd,
                            },
                        }).then((res) => {
                            if (res.data.code == 200) {
                                this.$message.success("登录成功");
                                this.perInfoAuth = false;
                                if (res.data.status == 0) {
                                    this.dialoginformation = true; //完善信息弹窗
                                } else if (res.data.status == 2) {
                                    this.$router.push({
                                        path: 'personalcenter',
                                        query: {detail: this.detailsData}
                                    })
                                } else if (res.data.status == 1) {
                                    this.$message.warning('您提交的资料待审批')
                                } else {
                                    this.$message.error('您提交的资料被驳回，请核实后重新提交')
                                    setTimeout(() => {
                                        this.dialoginformation = true
                                    }, 1000)
                                }
                                localStorage.setItem("token", res.data["x-token"]);
                            } else {
                                this.$message.error(res.data.data);
                            }
                        });
                    } else {
                        return false;
                    }
                });
            }
            // 点击注册
            if (this.tebIndex == 1) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios({
                            url: "/appuser/register",
                            method: "POST",
                            params: {
                                userName: this.register.regname,
                                passWord: this.register.regpwd,
                                phone: this.register.contactInfo,
                            },
                        }).then((res) => {
                            console.log(res);
                            if (res.data.code == 200) {
                                this.$message.success("注册成功");
                                this.tebIndex = "0";
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        });
                    } else {
                        return false;
                    }
                });
            }
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
                console.log(this.dataFileList)
                let form = new FormData();
                form.append('tid', this.detailsData.id);
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
                    console.log(res);
                    if (res.data.code == 200) {
                        this.dialogUpload = false;
                        this.$message.success(res.data.msg);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            } else {
                this.$message.error('请先上传文件');
            }
        },
        // 点击首页
        handleHome() {
            this.$router.push({path: '/index'});
        },
    },
    handleTitleClick(val) {
        this.$router.push({path: val});
        console.log('val', val)
    },
};
</script>

<style lang="scss" scoped>



.detailsContent {
  flex-grow: 1;
  width: 100%;
    .title {
        font-size: 30px;
        color: #5a3201;
        line-height: 40px;
        text-align: center;
        margin: 20px;
    }
    .title:nth-of-type(2){
        text-align: center;
        margin: 10px 0;
        font-size: 20px;
    }

    .title+div {
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
  .dialogUpload {
    ::v-deep .el-upload-dragger {
      width: auto;
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
}

@media screen and (max-width: 600px){
  /deep/ .el-dialog{
    width: 90% !important;
  }
}
</style>
