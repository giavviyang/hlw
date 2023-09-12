<template>
  <div>
    <div class="floatBtn"
         :class="[{moveBtn: 0}, `rightBtn`]" @click="doAppraise">

      <span><i class="el-icon-edit-outline" style="margin-right: 5px"></i>评价</span>
    </div>

    <el-dialog title="感谢您的评价"
               :visible.sync="showAppraise"
               width="35%"
               center>
      <div style="text-align: center">

        <div class="block" style="text-align: center; margin-top: 0px">
          <el-radio-group v-model="appraiseData">
            <el-radio :label="1">非常满意！</el-radio>
            <el-radio :label="2">满意！</el-radio>
            <el-radio :label="3">一般！</el-radio>
            <el-radio :label="4">不满意！</el-radio>
          </el-radio-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="closeAppraise">取 消</el-button>
      <el-button type="primary" @click="submitAppraise">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: 'floatBtn',
  data() {
    return {
      showAppraise: false,
      appraiseData: ''


    };
  },
  methods: {
    doAppraise() {
      this.showAppraise = true
    },
    // 关闭评价
    closeAppraise() {
      this.showAppraise = false
      this.appraiseData = ''
    },
    // 提交评价
    submitAppraise() {
      if (!this.appraiseData) {
        return
      }
      let appraise = {
        statisfaction: this.appraiseData
      }
      axios({
        url: 'publishMessage/appraise',
        method: 'post',
        data: appraise
      }).then(res => {
        if (res.data.code == 200) {
          this.$message({
            type: 'success',
            message: '提交成功！'
          })
        } else {
          this.$message({
            type: 'error',
            message: '提交失败！'
          })
        }
      })
      this.showAppraise = false
      this.closeAppraise()
    }
  }
};
</script>


<style lang="scss" scoped>
@mixin notSelect{
  -moz-user-select:none; /*火狐*/
  -webkit-user-select:none; /*webkit浏览器*/
  -ms-user-select:none; /*IE10*/
  -khtml-user-select:none; /*早期浏览器*/
  user-select:none;
}
@mixin not-touch {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.floatBtn {
  @include notSelect;
  @include not-touch();
  position: fixed;
  z-index: 1;
  overflow: hidden;
  width: 100px;
  left: calc(100% - 100px);
  top: calc(100% - 100px);
  /*color: #E0933A;*/
  color:  #B83B13;
  /*background: #FCEBD0;*/
  //color: #fff;
  background:  #d9e7f9;
  font-size: 14px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  &.rightBtn {
    border-radius: 20px 0 0 20px;
  }
  &.leftBtn {
    border-radius: 0 20px 20px 0;
  }
  &.moveBtn {
    border-radius: 20px;
  }
}
//.el-button--primary {
//  color: #FFF;
//  background-color: #B83B13;
//  border-color: #B83B13;
//}
//
//.el-button--primary:hover{
//  color: #FFF;
//  background-color: #B83B13;
//  border-color: #B83B13;
//}
</style>
