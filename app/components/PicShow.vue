<template>
    <div>
        <div v-if="isloaded">
            <img :src="picurl" :style="{'width':w + 'px' , 'height' : h + 'px'}">
        </div>
        <div v-else class="loadingbox" :style="{'width':w + 'px' , 'height' : h + 'px' , 'position' : 'relative' , 'line-height' : h + 'px'}">
            <img src="/images/loading.svg" :style="{'width' : w / 2}">
        </div>
    </div>
</template>

<script>
    export default {
        props: ['picurl', 'w', 'h'],
        data(){
            return{
                isloaded: false
            }
        },
        created(){
            this.loadPic();
        },
        methods: {
            //加载图片
            loadPic(){
                //创建一个图片对象，Image，这是JavaScript内置的对象
                var img = new Image();
                //发出请求
                img.src = this.picurl;
                //监听是否加载完毕
                var self = this;
                img.onload = function(){
                    self.isloaded = true;
                }
            }
        },
        watch: {
            //当picurl改变的时候
            picurl(){
                this.isloaded = false;
                //加载图片
                this.loadPic();
            }
        }
    }
</script>

<style scoped lang="less">
    .loadingbox{
        text-align: center;
    }
</style>