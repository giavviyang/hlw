<template>
    <div class="mainBody">
        <Header/>
            <router-view :key="$router.fullPath" class="routerView "/>
        <Footer/>
    </div>
</template>

<script>
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

export default {
    components: {
        Footer,
        Header,
    },
    watch:{
        // 跳转路由时刷新页面
        $route(to,from){
            this.$router.go(0);
        }
    },

}
</script>

<style lang="scss" scoped>
.mainBody {
  min-width: 1300px;
}

</style>
