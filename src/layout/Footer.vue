<template>
    <div class="footer">
        <div class="warp">
            <div class="warp_center">
                <div class="des">
                    <p style="margin-bottom: 10px;line-height: 32px;height: 32px;"><span style="position: relative;top:2px">网站链接：</span>
                        <el-select v-model="stateValue" placeholder="请选择" size="small" style="width: 250px">
                            <el-option
                                v-for="item in stateOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value" @click.native="handleClick(item.url)">
                            </el-option>
                        </el-select>&nbsp;
                        <el-select v-model="areaValue" placeholder="请选择" size="small" style="width: 250px">
                            <el-option
                                v-for="item in areaOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value" @click.native="handleClick(item.url)">
                            </el-option>
                        </el-select>
                    </p>
                    <p>版权所有：三门峡档案馆  &nbsp;&nbsp;&nbsp;&nbsp; 所属分类：档案(资料)馆</p>
                    <p>查档电话：0398-2932663</p>
                    <p>地址：河南省三门峡市湖滨区黄河路31号</p>
                    <!--                    <p>友情链接：<a href="https://www.saac.gov.cn/" target = "_blank">国家档案局</a> &nbsp;<a href="https://www.hada.gov.cn/" target = "_blank">河南档案信息网</a> </p>-->

                </div>
                <div class="footer_img"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            stateValue: '国家级档案网站',
            areaValue: '省内地方档案网站',
            stateOptions: [
                {
                    value: 'saac',
                    label: '国家档案局',
                    url: 'https://www.saac.gov.cn/'
                }, {
                    value: 'fhac',
                    label: '中国第一历史档案馆',
                    url: 'https://www.fhac.com.cn/index.html'
                }, {
                    value: 'shac',
                    label: '中国第二历史档案馆',
                    url: 'http://www.shac.net.cn/'
                }, {
                    value: 'chinaarchives',
                    label: '中国档案网',
                    url: 'http://www.chinaarchives.cn/'
                }, {
                    value: 'idangan',
                    label: '中国档案学术网',
                    url: 'http://www.idangan.com/'
                }, {
                    value: 'zgdazxw',
                    label: '中国档案资讯网',
                    url: 'http://www.zgdazxw.com.cn/'
                },
            ],
            areaOptions: [
                {
                    value: 'hada',
                    label: '河南档案信息网',
                    url: 'https://www.hada.gov.cn/',
                }, {
                    value: 'zhengzhou',
                    label: '郑州市档案馆',
                    url: 'https://da.zhengzhou.gov.cn/'
                }, {
                    value: 'aysdag',
                    label: '安阳市档案馆',
                    url: 'http://www.aysdag.com/'
                }, {
                    value: 'nanyang',
                    label: '南阳市档案馆',
                    url: 'http://daj.nanyang.gov.cn/'
                }, {
                    value: 'jiaozuo',
                    label: '焦作市档案馆',
                    url: 'http://www.jiaozuo.gov.cn/sitesources/jiaozuo/page_pc/tbzt/jzda/index.html'
                },
                {
                    value: 'lhsdag',
                    label: '漯河市档案馆',
                    url: 'http://www.lhsdag.com/'
                }, {
                    value: 'jyda',
                    label: '济源市档案馆',
                    url: 'http://www.jyda.gov.cn/'
                },
            ],
        }
    },
    methods: {
        handleClick(url) {
            window.open(url)
        },
    }
}
</script>
<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 195px;
  background-color: #B83B13;

  .warp {
    .warp_center {
      height: 100%;
      width: auto;
      //background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;

      .des {
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;

        p {
          //width: 220px;
          height: 25px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 25px;

          a {
            height: 25px;
            font-size: 18px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 25px;
          }
        }
      }

      .footer_img {
        height: 80px;
        width: 80px;
        background: url("../assets/img/footer_img.png") no-repeat 50% 50%;
        background-size: contain;
        margin-left: 50px;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .footer {
    .center {
      display: block;

      p {
        font-size: 12px !important;
      }
    }
  }
}
</style>

