<template>
<!--  子页面头部组件  -->
  <div>
    <div class="BreadcrumbNav">
      <div class="nowPosition">您当前的位置：</div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ pageTitle }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageTitle: {
      type: String,
    },
    // pageContent: {
    //   type: Array,
    // },
  }
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
</style>