<template>
    <div v-if="carinfo.images" @mouseleave="backtopage()">
        <div class="wrapper" :style="{'left' : -318 * page + 'px'}">
            <ul v-for="i in totalPages">
                <li v-for="j in 6" v-if="getImgName(i, j)" @click="changeIdx((i - 1) * 6 + (j - 1))" :class="{'cur' : nowIdx == (i - 1) * 6 + (j - 1)}">
                    <PicShow :picurl="`http://127.0.0.1:3000/images/carimages_small/${id}/${nowAlbum}/${getImgName(i,j)}`" :w="140" :h="93"></PicShow>
                </li>
            </ul>
        </div>
        
        <div class="nav">
            <span v-for="i in totalPages" :style="{'width':318 / totalPages + 'px'}" @mouseenter="changePage(i - 1)" :class="{'cur' : page == i - 1}"></span>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                page: 0
            }
        },
        computed: {
            //当前图集
            nowAlbum(){
                return this.$store.state.carpicStore.nowAlbum;
            },
            //车辆信息
            carinfo(){
                return this.$store.state.carpicStore.carinfo;
            },
            //图片展示的总页数，根据当前图集的图片数量计算，每页最多展示6张
            totalPages(){
                return Math.ceil(this.carinfo.images[this.nowAlbum].length / 6);
            },
            //当前车id
            id(){
                return this.$route.params.id;
            },
            //当前序号
            nowIdx(){
                return this.$store.state.carpicStore.nowIdx;
            }
        },
        methods: {
            //根据ul和li的循环索引获取图片的具体名称
            getImgName(i, j){
                return this.carinfo.images[this.nowAlbum][(i - 1) * 6 + (j - 1)];
            },
            //改变page
            changePage(n){
                this.page = n;
            },
            //回到page页，鼠标离开的事件监听
            backtopage(){
                this.page = parseInt(this.nowIdx / 6);
            },
            changeIdx(n){
                this.$store.commit("carpicStore/changeNowIdx" , {"nowIdx"  : n});
            }
        },
        watch: {
            //监听当前小图标号，让图集的page随之变化，主要用于使用大图上的button切换图片时
            nowIdx(){
                this.page = parseInt((this.nowIdx) / 6);
            }
        }
    }
</script>

<style scoped lang="less">
   .wrapper{
       background-color: pink;
       position: relative;
       width: 8000px;
       transition: all 0.4s ease 0s;
       ul{
           list-style: none;
           float: left;
           width: 318px;
           li{
               width: 140px;
               height: 93px;
               margin-bottom: 19px;
               margin-right: 19px;
               float: left;
               position: relative;
               &::before{
                   content: '';
                   position: absolute;
                   left: 0;
                   top: 0;
                   width: 100%;
                   height: 100%;
                   background: #000;
                   opacity: 0.6;
                   transition: all 0.4s ease 0s;
               }
               &.cur::before{
                   opacity: 0;
               }
               img{
                   width: 100%;
                   height: 100%;
               }
           }
       }
   }
   .nav{
       width: 318px;
       clear: both;
       span{
           float: left;
           height: 20px;
           background: #eee;
           border-right: 19px solid black;
           &::last-child{
               border-right: none;
           }
           &.cur{
               background: gold;
           }
       }
   }
</style>