<template>
    <div class="newList">
        <div class="new_top">
            <div class="list_div">
                <div class="topDiv"></div>
                <div class="topLine"></div>
                <p class="moreNews" @click="handleMore">更多 <i class="el-icon-d-arrow-right"></i></p>
            </div>
            <div class="list_title">
                <p class="new_title1">{{ newTitle1 }}</p>
                <div class="new_title2">{{ newTitle2 }}</div>
            </div>
        </div>
        <slot name="newContent"/>
    </div>
</template>
<script>
export default {
    name: 'NewList',
    props: {
        newTitle1: {
            type: String,
            default: '',
        },
        newTitle2: {
            type: String,
            default: '',
        },
    },
    data() {
        return {}
    },
    methods: {
        handleMore(val) {
            this.$emit('handleMore', val);
        },
    }
}
</script>
<style scoped lang="scss">
.newList {
  height: 100%;
  width: 100%;

  .new_top {
    position: relative;
    width: 100%;
    .list_div {
      display: flex;
      width: 100%;
      height: 100px;
      justify-content: space-between;
      align-items: center;
      //position: relative;
      //top: 15px;

      .topDiv {
        width: 50px;
        height: 50px;
        transform: rotate(45deg);
        border: 1px solid #B83B13;
        opacity: 0.2;
        position: relative;
        left: 15px;
      }

      .topLine {
        //width: 250px;
     width: calc(100% - 300px);
        right: 80px;
        position: absolute;
        height: 2px;
        opacity: 0.2;
        background-color: #B83B13;
      }

      .moreNews {
        position: relative;
        top: -2px;
        color: #B83B13;
          cursor: pointer;
          z-index: 200;
      }
    }

    .list_title {
      top: 30px;
      display: flex;
      position: absolute;
      color: #B83B13;
      width: 100%;

      .new_title1 {
        color: #B83B13;
        width: 104px;
        font-size: 26px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        line-height: 37px;
        position: relative;
        top: 2px;
        left: 5px;
      }

      .new_title2 {
        height: 13px;
        font-size: 9px;
        width: auto;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #B83B13;
        line-height: 13px;
        background-color: #fff;
        position: relative;
        top: 15px;
        left: 15px;
        padding: 0 10px 0 5px;
      }
    }
  }
}
</style>
