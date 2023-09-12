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
                            <div class="title_center">
                                www.smxdag.gov.cn
                            </div>
                            <div class="title_bottom"></div>
                        </div>
                    </div>
                    <div class="sx">
                        <div class="sx_img"></div>
                        <el-form ref="searchForm" :inline="true">
                            <el-form-item prop="search">
                                <el-input v-model="search" prefix-icon="el-icon-search" >
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="search">
                                <el-button type="primary"  @click="handleSearch(search)">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="nav">
                <div class="warp">
                    <div class="list" v-for="(item,index) in navList" :key="index" @click="handleClick(navList,index)"
                         :class="parentActive === index? 'isActive' : ''">
                        <span v-if="!item.children">{{ item.pathName }}</span>
                        <el-dropdown v-else @command="handleCommand">
                            <span class="el-dropdown-link">
                                {{ item.pathName }}
                            </span>
                            <el-dropdown-menu slot="dropdown" :popper-append-to-body="false">
                                <el-dropdown-item :command="childItem" v-for="(childItem,index) in item.children"
                                                  :key="index">
                                    {{ childItem.pathName }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </div>
        </div>
        <floatBtn/>
    </div>
</template>

<script>
import floatBtn from '@/layout/floatBtn';

export default {
    components: {
        floatBtn
    },
    name: 'Header',

    data() {
        return {
            navList:[],
            search: '',
            parentActive: 0,
        }
    },
    created() {
        this.navList=this.$navList;
        this.getIndex();
    },
    methods: {
        // 点击首页
        handleHome() {
            this.$router.push({path: '/index'});
        },
        getIndex(){
            this.$navList.forEach((item,index) => {
                if (this.$route.path === item.path) {
                    this.parentActive=index
                } else {
                    if (item.children) {
                        item.children.forEach(childItem => {
                            if (childItem.path === this.$route.path) {
                                this.parentActive=index;
                            }
                        })
                    }
                }
            })
        },
        handleSearch(val) {
            if(val){
                this.$router.push({path: 'navSearch', query: {searchKey: val}});
            }else {
                return
            }
        },
        // 点击导航栏一级菜单
        handleClick(arr, index) {
            this.parentActive = index;
            this.$router.push({path: arr[index].path});
        },
        /* 点击导航栏二级菜单 */
        handleCommand(val) {
            this.$router.push({path: val.path});
        }
    },
}
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 374px;
  background-color: #B83B13;
    //display: flex;

  .header_top {
    height: 314px;
    width: 100%;
    background: url("../assets/img/bg.png") no-repeat 50% 50%;
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
          background: url("../assets/img/logo.png") no-repeat 50% 50%;
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
            background: url("../assets/img/title_top.png") no-repeat 50% 50%;
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
            height: 27px;
            width: 100%;
            background: url("../assets/img/title_bottom.png") no-repeat 50% 50%;
            background-size: cover;
          }
        }
      }

      .sx {
        width: 473px;
        height: 100%;

        .sx_img {
          height: 233px;
          width: 100%;
          background: url("../assets/img/sx.png") no-repeat 50% 50%;
          background-size: cover;

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

  .nav {
    height: 60px;
    width: 100%;

    .warp {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .list {
        span {
          width: auto;
          font-size: 18px;
          //font-family: SourceHanSansSC-Medium, SourceHanSansSC;
          font-weight: 600;
          color: #e5dddb;
          cursor: pointer;

        }

        .el-dropdown-link {
          width: auto;
          font-size: 18px;
          //font-family: SourceHanSansSC-Medium, SourceHanSansSC;
          font-weight: 600;
          color: #e5dddb;
          cursor: pointer;

        }
      }
      .isActive,.list:hover {
        span {
          font-family: SourceHanSansSC-Medium, SourceHanSansSC;
          font-weight: 800;
          color: #fff;
        }
        .el-dropdown-link {
          //width: auto;
          //font-size: 20px;
          font-family: SourceHanSansSC-Medium, SourceHanSansSC;
          font-weight: 800;
          color: #fff;
        }
      }

    }
  }
}

.el-dropdown-menu {
  background-color: #B83B13;
  border-color: #B83B13;
  top: 370px !important;
  .el-dropdown-menu__item {
    color: #e5dddb;
      font-weight: 600;
      font-size: 16px;

  }

  .el-dropdown-menu__item:hover {
    background: transparent;
    color: #fff;
  }
}

.el-popper .popper__arrow::after {
  border-bottom-color: #B83B13 !important;
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
