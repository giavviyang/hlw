<template>
    <div class="main">
        <div class="warp">
            <pathTitle></pathTitle>
            <div class="pathContainer">
                <ChildMenu></ChildMenu>
                <div class="path_right">
                  <div>
                    <div class="title">{{detailData.publishTitle}}</div>
                    <div v-html="detailData.publishContent"></div>
                  </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>

import ChildMenu from "@/components/childMenu.vue";
import PathTitle from "@/components/pathTitle.vue";
import axios from "axios";


export default {
    components: {PathTitle, ChildMenu},
    name: 'ldbz',
    data() {
        return {
          detailData: ''
        }
    },

    created() {
      axios({
        url: 'publishMessage/queryMessageByType',
        method: 'get',
        params: {type: '领导班子'}
      }).then(res => {
        if (res.data.code == 200) {
          this.detailData = res.data.data.rows[0]
        }
      })
    },
    methods: {
        handleSizeChange(val) {
            console.log(val)
        },
        handleCurrentChange(val) {
            console.log(val)
        },

    },

}
</script>
<style scoped lang="scss">
.main {
    width: 100%;
    min-height: 450px;

    .new_content {
        height: 100%;
    }
}
</style>

