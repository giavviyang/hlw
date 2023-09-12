<template>
    <div class="warp">
        <pathTitle></pathTitle>
        <div class="flow">
            <p class="selectTitle">
                预约流程
            </p>
            <el-steps :align-center="true">
                <!--                <el-step title="1.下载表格，填写盖章，发送邮件" icon="el-icon-edit-outline"><i slot="icon">111</i></el-step>-->
                <!--                <el-step title="1.下载表格，填写盖章，发送邮件" icon=""></el-step>-->
                <el-step title="1.预约时间，填写信息" icon="el-icon-edit-outline"></el-step>
                <el-step title="2.已预约，成功后发送邮件通知" icon="el-icon-success"></el-step>
            </el-steps>
        </div>
        <div class="tab">
            <div class="tab_hd">
                <div class="appointment" v-for="(item,index) in tabTitle" :key="index"
                     :class="tabHdActive===index?'tabHdActive':''" @click="handleChange(index,'tabHdActive')">
                    <i class="iconfont icon-yuyue" v-show="index===0"></i>
                    <i class="iconfont icon-bianjiwenjian" v-show="index===1"></i>
                    <i class="iconfont icon-quxiao" v-show="index===2"></i>
                    <p>{{ item.title }}</p>
                </div>
            </div>
            <div class="tab_bd">
                <div class="tabBd tabBd1" v-show="tabHdActive===0||tabHdActive===1">
                    <div class="beforeTabBd beforeTabBd1" v-show="tabHdActive===0">
                        <i class="el-icon-arrow-up"></i>
                    </div>
                    <div class="beforeTabBd beforeTabBd2" v-show="tabHdActive===1">
                        <i class="el-icon-arrow-up"></i>
                    </div>
                    <div class="selected1">
                        <p class="selectTitle">
                            展馆选择
                        </p>
                        <div class="pavilion">
                            <div class="pavilionItem" v-for="(item,index) in pavilionArr" :key="index"
                                 @click="handleChange(index,'pavilionHdActive')"
                                 :class="pavilionHdActive===index?'pavilionHdActive':''">
                                <p>{{ item.name }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="selected2">
                        <p class="selectTitle">
                            选择入馆日期
                        </p>
                        <el-carousel :loop="false" :autoplay="false" arrow="always" indicator-position="none"
                                     class="entryDate">
                            <el-carousel-item v-for="(list, index) in entryDate" :key="index">
                                <div v-for="(item,index1) in list" :key="index1" class="divList">
                                    <div class="week">{{ item.week }}</div>
                                    <div class="date noAppointment" v-show="item.isAppointment==='不可预约'">
                                        <p>{{ item.date }}</p>
                                        <p>{{ item.isAppointment }}</p>
                                    </div>
                                    <div class="date" v-show="item.isAppointment==='可预约'"
                                         :class="dateActive===index1?'dateActive':''"
                                         @click.stop="handleChange(index1,'dateActive')">
                                        <p>{{ item.date }}</p>
                                        <p>{{ item.isAppointment }}</p>
                                    </div>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div class="selected1 selected3">
                        <p class="selectTitle">
                            选择入馆时间
                        </p>
                        <div class="entryTime">
                            <div class="entryTimeItem " v-for="(item,index) in entryTime" :key="index">
                                <div class="date noAppointment" v-show="item.isAppointment==='不可预约'">
                                    <p><span>{{ item.startTime }}</span>-<span>{{ item.endTime }}</span></p>
                                    <p>{{ item.isAppointment }}</p>
                                </div>
                                <div class="date" v-show="item.isAppointment==='可预约'"
                                     @click="handleChange(index,'timeActive')"
                                     :class="timeActive===index?'timeActive':''">
                                    <p><span>{{ item.startTime }}</span>-<span>{{ item.endTime }}</span></p>
                                    <p>{{ item.isAppointment }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="selected1 entryForm">
                        <p class="selectTitle">
                            填写入馆信息
                        </p>
                        <el-form ref="entryForm" :model="entryForm" :rules="rules">
                            <el-form-item label="单位类别:" prop="type">
                                <el-select v-model="entryForm.type" placeholder="请选择" clearable
                                           :popper-append-to-body="false">
                                    <el-option
                                            v-for="item in typeOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="单位:" prop="unit">
                                <el-input v-model="entryForm.unit" placeholder="请填写" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="人数:" prop="num">
                                <el-input v-model="entryForm.num" placeholder="请填写" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="省部级人数:" prop="sNum">
                                <el-input v-model="entryForm.sNum" placeholder="请填写" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="厅局级人数:" prop="tNum">
                                <el-input v-model="entryForm.tNum" placeholder="请填写" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="县处级人数:" prop="xNum">
                                <el-input v-model="entryForm.xNum" placeholder="请填写" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="处级以下人数:" prop="cNum">
                                <el-input v-model="entryForm.cNum" placeholder="请填写" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="联系人:" prop="name">
                                <el-input v-model="entryForm.name" placeholder="请填写" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="电子模板:" class="model">
                                <div> {{ entryForm.model }}
                                    <p @click="download"
                                       style="display: inline-block;float: right;color: #B83B13;font-weight: 600">
                                        下载 </p></div>
                            </el-form-item>
                            <div class="notice">

                                <span>*</span>请于预约成功后24小时内，报送填写完整并盖章的展厅参观学习申请表至邮箱

                            </div>
                            <div class="read">
                                <el-radio v-model="entryForm.read" label="0">我已阅读 <span @click="dialogVisible=true">参观须知</span>
                                </el-radio>
                            </div>
                            <div class="submit" v-show="tabHdActive===0">
                                <el-button type="primary" @click="onSubmit('entryForm')">立即预约</el-button>
                            </div>
                            <div class="submit" v-show="tabHdActive===1">
                                <el-button type="primary" @click="onChange('entryForm')">立即变更</el-button>
                            </div>
                        </el-form>
                    </div>
                </div>
                <div class="tabBd tabBd3" v-show="tabHdActive===2">
                    <div class="beforeTabBd beforeTabBd3">
                        <i class="el-icon-arrow-up"></i>
                    </div>
                    <el-form ref="cancelForm" class="cancelForm" :model="cancelForm" :rules="cancelRules">
                        <el-form-item label="预约码:" prop="code">
                            <el-input v-model="cancelForm.code" placeholder="请填写" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="联系人:" prop="name">
                            <el-input v-model="cancelForm.name" placeholder="请填写" clearable></el-input>
                        </el-form-item>
                        <div class="submit">
                            <el-button type="primary" @click="onCancel('cancelForm')">取消预约</el-button>
                        </div>
                    </el-form>

                </div>
            </div>
        </div>
        <el-dialog
                title="三门峡市档案馆参观须知"
                :visible.sync="dialogVisible"
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                :show-close="false"
                :modal='false'
                width="90%">
            <div class="visit">
                <p class="title">
                    {{ notice.visit.title }}
                </p>
                <p v-for="(item,index) in notice.visit.content" :key="index">{{ item.text }}</p>
                <p class="title">
                    {{ notice.attention.title }}
                </p>
                <p v-for="(item,index) in notice.attention.content" :key="index+'3'">{{ item.text }}</p>
            </div>
            <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false" :class="isShowBtn?'':'showBtn'"
                               :disabled="!isShowBtn">已阅读并同意</el-button>
                    <p v-show="!isShowBtn"> <span>{{ second }}</span>&nbsp;秒</p>
                </span>
        </el-dialog>

    </div>
</template>
<script>

import ChildMenu from "@/components/childMenu.vue";
import PathTitle from "@/components/pathTitle.vue";


export default {
    components: {PathTitle, ChildMenu},
    name: 'zlyy',
    data() {
        return {
            dialogVisible: true,
            notice: {
                visit: {
                    title: '一、预约参观',
                    content: [
                        {text: '1、团体预约可选择时段为：工作日09:30--10:30、10:30--11:30、15:00-16:00、16:00-17:00；任一时段约满后则无法预约。根据实际情况适时调整。'},
                        {text: '2、参观团体至少提前三天登陆网站进行预约，并认真填写资料；预约成功后，如需变更或取消预约，则至少提前一天登陆网站或致电告知。对预约成功未能如期到馆参观且不取消、不变更预约的团体，将被我馆记录一次失约行为。如遇重大活动或临时性闭馆，我馆有权变更预约日期或取消预约。'},
                        {text: '3、预约提交成功后，应及时下载并填写《参观学习申请表》，盖章后将电子版发送至报送邮箱（内容需清晰，可辨认），超过24小时未发送则视为自动放弃本次预约；我馆工作人员将在收到《参观学习申请表》后进行审核，审核结果以短信方式通知。'},
                        {text: '4、参观当天凭打印盖章的《参观学习申请表》入场，并交至展厅工作人员，为实现有序错峰观展，建议提前15分钟到场等候。'},
                        {text: '5、参观团体需确定一名联系人，确保团队成员了解并严格遵守《河南省档案馆参观须知》，并配合我馆完成各项工作。参观单位带队领导要对整个参观活动的组织、纪律、安全负责。对在参观期间违反规定造成不良影响的单位和个人，我馆将发函告知相关纪检部门。'},
                        {text: '6、百年恰是风华正茂”党史党性主题教育展有重温入党誓词区域（入党誓词和党旗已备），如需进行重温入党誓词活动，请提前确定领誓人。'},
                        {text: '预约联系部门：三门峡市档案馆编研展览处'},
                        {text: '查档电话：0398-2932663'},
                        {text: '手机号码：'},
                        {text: '报送邮箱：'},
                        {text: '参观地址：河南省三门峡市湖滨区黄河路31号'},
                    ]
                },
                attention: {
                    title: '二、注意事项',
                    content: [
                        {text: '（一）参观过程中请全程佩戴口罩，接受工作人员的引导，有序进入展厅集结候讲，禁止个人行为,非馆方工作人员禁止在展区内讲解展览内容。'},
                        {text: '（二）请自觉接受安全检查，禁止携带易燃易爆物品（打火机等）、管制械具、瓶装液体（饮料、矿泉水等）、宠物以及其他与参观活动不相关的物品入馆；请观展人员自觉保管好随身物品。'},
                        {text: '（三）请自觉遵守法律法规，禁止将违反国家法律的政治、宗教宣传品以及商业印刷品、旗帜标语带入场馆。'},
                        {text: '（四）展厅内禁止吸烟、使用明火、饮食、大声喧哗、躺卧及追跑打闹；请勿使用馆内电源；禁止随意走动或不经允许脱离参观区域。'},
                        {text: '（五）展厅禁止拍照、摄像、直播；如在场馆内进行讲学、调查、摄录等活动，须提前向馆方申请，依照规定获得许可后方可实施。'},
                        {text: '（六）请勿违反馆内警示标语，请勿触摸裸露模型或展品，请勿趴扶展柜玻璃，请爱惜使用互动设备，如有损坏应照价赔偿。'},
                        {text: '（七）无行为能力者、限制行为能力者、衣冠不整者、酗酒者、吸毒者、当天体温异常者等人员谢绝参观。'},
                        {text: '（八）展馆空间较为密闭，心脏病患者、孕妇或有其他不适宜症状的人员不建议前来参观。'},
                        {text: '（九）为保证良好的参观环境，当馆内人数达到上限时，我馆将采取限流措施，请大家耐心等待。'},
                        {text: '（十）参观车辆在停车场指定位置有序停放，请勿在禁停区乱停乱放，除登记车辆外其他车辆不允许进入。'},
                        {text: '（十一）如遇各类突发事件请服从我馆工作人员指挥。'},
                        {text: '  其他未尽事宜，按国家有关法律法规执行，本参观须知最终解释权归河南省档案馆所有，感谢您的理解与支持!'},
                    ]
                },


            },
            isShowBtn: false,
            second: 5,
            tabTitle: [
                {
                    icon: 'el-icon-edit',
                    title: '预约'
                }, {
                    icon: 'el-icon-edit',
                    title: '变更'
                }, {
                    icon: 'el-icon-edit',
                    title: '取消'
                },
            ],
            tabHdActive: 0,
            pavilionArr: [
                // {name: '“百年恰是风华正茂"党史党性主题教育展'},
                // {name: '“档案看河南” 固定陈列展'},
                // {name: '河南戏曲档案展'},
            ],
            pavilionHdActive: 0,
            entryDate: [
                {
                    week: '星期一',
                    date: '5月15日',
                    isAppointment: '不可预约'
                }, {
                    week: '星期二',
                    date: '5月16日',
                    isAppointment: '可预约'
                }, {
                    week: '星期三',
                    date: '5月17日',
                    isAppointment: '可预约'
                }, {
                    week: '星期四',
                    date: '5月18日',
                    isAppointment: '可预约'
                }, {
                    week: '星期五',
                    date: '5月19日',
                    isAppointment: '可预约'
                }, {
                    week: '星期一',
                    date: '5月22日',
                    isAppointment: '可预约'
                }, {
                    week: '星期二',
                    date: '5月23日',
                    isAppointment: '可预约'
                }, {
                    week: '星期三',
                    date: '5月24日',
                    isAppointment: '可预约'
                }, {
                    week: '星期四',
                    date: '5月25日',
                    isAppointment: '可预约'
                }, {
                    week: '星期五',
                    date: '5月26日',
                    isAppointment: '可预约'
                },
            ],
            dateActive: 1,
            entryTime: [
                {
                    startTime: '9:30',
                    endTime: '10:30',
                    isAppointment: '不可预约'
                }, {
                    startTime: '10:30',
                    endTime: '11:30',
                    isAppointment: '可预约'
                }, {
                    startTime: '15:00',
                    endTime: '16:00',
                    isAppointment: '可预约'
                }, {
                    startTime: '16:00',
                    endTime: '17:00',
                    isAppointment: '可预约'
                },
            ],
            timeActive: 1,
            entryForm: {
                type: '',
                unit: '',
                num: '',
                sNum: '',
                tNum: '',
                xNum: '',
                cNum: '',
                name: '',
                phone: '',
                model: '三门峡市档案馆展厅参观学习申请表',
                read: '1',
            },
            typeOptions: [],
            cancelForm: {
                code: '',
                name: '',
                phone: '',
            },
            rules: {
                type: [
                    {required: true, message: "单位类别不能为空", trigger: "change"},
                ],
                unit: [
                    {required: true, message: "单位不能为空", trigger: "blur"},
                ],
                num: [
                    {required: true, message: "人数不能为空", trigger: "blur"},
                    {pattern: /^[0-9]\d*$/, message: '请输入整数'},
                ],
                sNum: [
                    {required: true, message: "省部级人数不能为空", trigger: "blur"},
                    {pattern: /^[0-9]\d*$/, message: '请输入整数'},
                ],
                tNum: [
                    {required: true, message: "厅局人数不能为空", trigger: "blur"},
                    {pattern: /^[0-9]\d*$/, message: '请输入整数'},
                ],
                xNum: [
                    {required: true, message: "县处级人数不能为空", trigger: "blur"},
                    {pattern: /^[0-9]\d*$/, message: '请输入整数'},
                ],
                cNum: [
                    {required: true, message: "处级以下人数不能为空", trigger: "blur"},
                    {pattern: /^[0-9]\d*$/, message: '请输入整数'},
                ],
                name: [
                    {required: true, message: "联系人不能为空", trigger: "blur"},
                ],
            },
            cancelRules: {
                code: [
                    {required: true, message: "预约码不能为空", trigger: "blur"},
                ],
                name: [
                    {required: true, message: "联系人不能为空", trigger: "blur"},
                ],
            }
        }
    },
    mounted() {
        this.getSecond();
        this.byEvents()
    },
    methods: {
        // 倒计时
        getSecond() {
            const that = this
            const interval = window.setInterval(function () {
                that.second--
                if (that.second === 0) {
                    that.isShowBtn = true
                    window.clearInterval(interval)
                }
            }, 1000)
        },
        handleChange(index, str) {
            this[str] = index
            console.log('this[str]')
        },
        fa() {
            console.log('fa')
        },
        // 入馆日期轮播
        byEvents() {
            let newDataList = [];
            let current = 0
            if (this.entryDate && this.entryDate.length > 0) {
                for (let i = 0; i <= this.entryDate.length - 1; i++) {
                    if (i % 5 !== 0 || i === 0) {	//数据处理成几张展示
                        if (!newDataList[current]) {
                            newDataList.push([this.entryDate[i]])
                        } else {
                            newDataList[current].push(this.entryDate[i])
                        }
                    } else {
                        current++
                        newDataList.push([this.entryDate[i]])
                    }
                }
            }
            this.entryDate = [...newDataList]
        },
        //下载申请表模版
        download() {

        },
        // 预约
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.entryForm.read == '1') {
                        this.$message({
                            message: '请点击我已阅读参观须知',
                            type: 'warning'
                        });
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 变更
        onChange(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.entryForm.read == '1') {
                        this.$message({
                            message: '请点击我已阅读参观须知',
                            type: 'warning'
                        });
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 取消
        onCancel(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('submit!!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },


    },
}
</script>
<style scoped lang="scss">
@import "../../assets/style/iconfont/iconfont.css";

.warp {
  min-height: calc(100% - 500px);

  .flow {
    width: 100%;
    height: 257px;
    background-color: #fff;
    margin-top: 42px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    border: 1px solid #eee;
    padding: 30px 70px;
    box-sizing: border-box;

    ::v-deep .el-steps {
      margin-top: 40px;

      i {
        font-size: 50px;
        color: rgba(0, 0, 0, 0.3);
      }

      .el-step__title {
        color: #333;
      }
    }

  }

  .tab {
    width: 100%;
    height: auto;
    margin-top: 29px;
    margin-bottom: 10px;

    .tab_hd {
      height: 144px;
      width: 100%;
      display: flex;
      justify-content: space-between;

      .appointment {
        width: 30%;
        //background-color:#B83B13;
        height: 100%;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
        border: 1px solid #eee;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
          cursor: pointer;

        p, i {
          color: #B83B13;
          font-size: 24px;
          font-weight: 600;
          line-height: 33px;
          letter-spacing: 0.92px;
          font-family: "PingFang SC";

        }

        .iconfont {
          font-size: 34px;
        }

        p {
          margin-top: 10px;
        }

      }

      .tabHdActive {
        border: none;
        background-color: #B83B13;
        box-shadow: none;

        p, i {
          color: #fff;
        }
      }
    }

    .tab_bd {
      width: 100%;
      margin-top: 49px;

      .tabBd {
        width: 100%;
        height: auto;
        border: 2px solid #B83B13;
        position: relative;

        .beforeTabBd {
          width: 36px;
          height: 50px;
          background-color: #fff;
          z-index: 100;
          top: -37px;
          position: absolute;
          display: flex;
          justify-content: center;

          i {

            font-size: 50px;
            color: #B83B13;
          }
        }

        .submit {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;

          .el-button {
            //background-color: #AE3109;
            background-color: #B83B13;
            border: none;
            border-radius: 40px;
            font-weight: 600;
            font-size: 26px;
            padding: 20px 40px;
          }
        }
      }

      .tabBd1 {
        .beforeTabBd1 {
          left: 15%;
        }

        .beforeTabBd2 {
          left: 50%;
        }
      }


      .tabBd3 {
        .beforeTabBd {
          left: 85%;
        }

        ::v-deep .cancelForm {
          width: 100%;
          //height: 350px;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 70px 30px 30px 30px;
          box-sizing: border-box;

          .el-form-item {
            width: 80%;
            display: flex;
            justify-content: center;

            .el-form-item__label {
              width: 100px;
              //background-color: seagreen;
              text-align: left;
              font-size: 18px;
              color: #333;
              letter-spacing: 0.69px;
              font-weight: 400;
              font-family: "PingFang SC";
            }

            .el-form-item__content {
              width: calc(100% - 180px);

            }

          }
        }
      }
    }

    .selected1 {
      width: 100%;
      z-index: 200;
      position: relative;
      padding: 30px 70px 0 70px;
      box-sizing: border-box;

      .pavilion {
        height: 98px;
        display: flex;
        justify-content: space-between;
        //background-color: wheat;
        width: 100%;
        margin-top: 20px;

        .pavilionItem {
          height: 100%;
          border: 1px solid #dfdfdf;
          padding: 30px;
          //background-color:seagreen;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
            cursor: pointer;

          p {
            cursor: pointer;
            font-size: 18px;
            color: #333;
            letter-spacing: 0.69px;
            font-weight: 400;
          }
        }

        .pavilionHdActive {
          border: 2px solid #B83B13;;
        }
      }
    }

    .selected2 {
      width: 100%;

      .selectTitle {
        margin: 30px 70px 0 70px;
      }

      .entryDate {
        width: 100%;
        height: 156px;

        ::v-deep .el-carousel__container {
          height: 100%;

          .el-carousel__item {
            display: flex;
            width: calc(100% - 140px);
            padding-left: 70px;
            justify-content: space-between;
            align-items: center;

            .divList {
              height: 100%;
              width: calc(20% - 10px);

              .week {
                background-color: #eee;
                height: 39px;
                line-height: 39px;
                letter-spacing: 0.62px;
                font-size: 16px;
                text-align: center;
              }

              .date {
                height: 100px;
                border: 1px solid #ccc;
                margin-top: 9px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                cursor: pointer;

                p {
                  color: #333;
                }

                p:nth-of-type(2) {
                  color: #B83B13;
                  font-size: 16px;
                  letter-spacing: 0.62px;
                  margin-top: 6px;
                  font-weight: 600;

                }
              }

              .noAppointment {
                cursor: default;

                p {
                  color: #999 !important;
                }
              }

              .dateActive {
                height: 96px;
                width: 100%;
                border: 3px solid #B83B13;;
              }


            }
          }


          .el-carousel__arrow {
            background: transparent !important;
            display: block !important;
            width: 30px;
            border-radius: 4px;
            color: #1f2d3d;
            font-size: 40px;
            top: 50%;
            transform: translateY(-20%);

          }

          .el-carousel__arrow--right {
            right: 25px;
          }
        }
      }
    }

    .selected3 {
      .entryTime {
        height: 98px;
        display: flex;
        justify-content: space-between;
        //background-color: wheat;
        width: 100%;
        margin-top: 20px;

        .entryTimeItem {
          flex: 1;
          height: 100%;
          margin-right: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 1px solid #ccc;

          .date {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            p {
              color: #333;
            }

            p:nth-of-type(2) {
              color: #B83B13;
              font-size: 16px;
              letter-spacing: 0.62px;
              margin-top: 6px;
              font-weight: 600;

            }
          }

          .noAppointment {
            cursor: none;

            p {
              color: #999 !important;
            }
          }

          .timeActive {
            height: 96px;
            width: 100%;
            border: 3px solid #B83B13;;
          }
        }

        .entryTimeItem:last-of-type {
          margin-right: 0;
        }


      }
    }

    .entryForm {
      ::v-deep .el-form {
        margin-top: 20px;
        width: 100%;

        .el-form-item {
          //background-color: wheat;
          width: 100%;
          display: flex;

          .el-form-item__label {
            width: 150px;
            //background-color: seagreen;
            text-align: left;
            font-size: 18px;
            color: #333;
            letter-spacing: 0.69px;
            font-weight: 400;
            font-family: "PingFang SC";
          }

          .el-form-item__content {
            width: calc(100% - 500px);

            .el-select {
              width: 100%;

              .el-select-dropdown {
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
          }
        }

        .notice {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          color: #333;

          span {
            color: red;
            display: inline-block;
            position: relative;
            left: -5px;
            top: 5px;
            font-size: 24px;
          }
        }

        .read {
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;

          .el-radio {

            .el-radio__label {
              font-size: 16px;
              color: #333;

              span {
                display: inline-block;
                color: #B83B13;
                font-weight: 600;
                position: relative;
                left: 5px;
              }
            }

          }

          .is-checked {
            color: #333;

            .el-radio__inner {
              background-color: #B83B13;
              border: #B83B13;
            }
          }
        }


      }
    }
  }
}

.selectTitle {
  height: auto;
  padding-left: 10px;
  font-weight: bold;
  font-size: 21px;
  color: #333333;
  letter-spacing: 0.81px;
  position: relative;
}


.selectTitle:before {
  content: '';
  position: absolute;
  height: 20px;
  width: 4px;
  left: -2px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #AE3109;
  border-radius: 2px;
}

::v-deep.el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  .el-dialog {
    margin: 0 !important;
    border-radius: 10px;
    border: 1px solid #eee;
    height: calc(80vh);
    overflow: auto;

    .el-dialog__header {
      text-align: center;
      font-size: 34px;
      padding: 10px;
      font-weight: 800;
      //font-family: Arial, "PingFang SC", "Helvetica Neue", Helvetica, sans-serif, system-ui, -apple-system, BlinkMacSystemFont;
    }

    .el-dialog__body {
      padding: 10px 20px;

      p {
        text-align: left;
        font-size: 14px;
        line-height: 25px;
        //line-height: 1.5em;
        //padding: 15px 50px;
        text-indent: 2em;

      }

      .title {
        text-indent: 0;
        font-size: 16px;
        color: #333;
        font-weight: 600;
        line-height: 40px;
      }

      p:last-of-type {
        margin-top: 10px;
      }
    }

    .dialog-footer {
      display: flex;
      justify-content: center;
      align-items: center;

      .el-button {
        //background-color: #AE3109;
        background-color: #B83B13;
        border: none;
        border-radius: 20px;
        font-weight: 600;
        font-size: 20px;
      }

      .showBtn {
        background-color: rgba(174, 49, 8, 0.2);
      }

      p {
        margin-left: 10px;
      }
    }


    //background:transparent;
  }
}

</style>

