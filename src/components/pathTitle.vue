<template>
    <div class="pathTitle">
        <p @click="handleHome">三门峡市档案馆</p>
        <p v-for="item in pathTitleArr" :key="item.path" @click="handleTitleClick(item.path)">
            <i class="el-icon-arrow-right"></i>{{item.pathName}} </p>
    </div>
</template>
<script>
export default {
    name: 'PathTitle',
    data() {
        return {
            pathTitleArr:[],
        }
    },
    created() {
        this.getTitlePath();

    },


    methods: {
        // 点击首页
        handleHome() {
            this.$router.push({path: '/index'});
        },
        handleTitleClick(val) {
            this.$router.push({path: val});
            console.log('val',val)
        },
        getTitlePath() {
            this.pathTitleArr=[];
            this.$navList.forEach(item => {
                if (this.$route.path === item.path) {
                    this.pathTitleArr.push(item)
                } else {
                    if (item.children) {
                        item.children.forEach(childItem => {
                            if (childItem.path === this.$route.path) {
                                this.pathTitleArr.push(item);
                                this.pathTitleArr.push(childItem)
                            }
                        })
                    }
                }
            })
            if(this.$route.path==='/wszt'){
                this.pathTitleArr=[{path: '/wszt', pathName: '网上展厅'},];
            }
        },
    }
}
</script>

<style scoped lang="scss">

</style>
