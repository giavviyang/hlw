<template>
    <div class="path_left">
        <p v-for="(item,index) in pathArr" :key="item.path" @click="handleChild(item.path,index)"
           :class="(archiveActive===index&&index!==0)?'isActive':''">{{
            item.pathName
            }}</p>
    </div>
</template>
<script>

export default {
    name: 'ChildMenu',
    data() {
        return {
            archiveActive: 0,
            pathArr: [],
        }
    },
    created() {
        this.getPath();
    },
    methods: {
        getPath() {
            this.pathArr = [];
            this.$navList.forEach((item, index) => {
                if (this.$route.path === item.path) {
                    this.pathArr.push(item)
                    if (item.children) {
                        this.pathArr.push(...item.children);
                    }
                } else {
                    if (item.children) {
                        item.children.forEach((childItem, childIndex) => {
                            if (childItem.path === this.$route.path) {
                                this.pathArr.push(item);
                                this.pathArr.push(...item.children);
                                this.pathArr.forEach((item2, index2) => {
                                    if (item2.path === this.$route.path) {
                                        this.archiveActive = index2
                                    }
                                })
                            }
                        })
                    }
                }
            })
            console.log('this.pathArr',this.pathArr)
        },
        handleChild(path, index) {
            this.archiveActive = index
            this.$router.push({path: path});
            if(path==='/gqgk'){
                this.archiveActive = 1
            }
        },
    }
}
</script>
<style scoped lang="scss">
.path_left {
  width: 255px;
  height: auto;

  p {
    width: 100%;
    height: 70px;
    line-height: 70px;
    font-size: 20px;
    font-weight: 500;
    background-color: #F2E8E0;
    text-align: center;
    border-bottom: 1px solid #fff;
    cursor: pointer;
  }

  p:first-of-type {
    background-color: #B83B13;
    color: #FFFFFF;
    border: none;
    font-size: 22px;
  }

  .isActive {
    color: #B83B13;
    position: relative;
  }

  .isActive:after {
    content: url("../assets/img/child_icon.png");
    position: absolute;
    height: 60px;
    width: 4px;
    right: 0;
  }
}
</style>
