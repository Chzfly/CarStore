<template>
    <div class="wrap_bi">
        <div class="inner">
            <div class="picbox" ref="picbox">
                <!-- 图片 -->
                <img ref="img" class="img">
                <!-- loading图 -->
                <!-- <img src="/images/loading.svg" ref="loadinggif" class="loadinggif"> -->
                <!-- 两个按钮 -->
                <div class="leftBtn" @click="goPrev()"></div>
                <div class="rightBtn" @click="goNext()"></div>
            </div>
            <img src="/images/loading.svg" ref="loadinggif" class="loadinggif">
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            id(){
                return this.$route.params.id;
            },
            nowAlbum(){
                return this.$store.state.carpicStore.nowAlbum;
            },
            nowIdx(){
                return this.$store.state.carpicStore.nowIdx;
            },
            carinfo(){
                return this.$store.state.carpicStore.carinfo;
            }
        },
        mounted(){
            var self = this;
            //监听窗口改变尺寸
            window.addEventListener("resize" , function(){
                self.setMargin();
            },true);
        },
        methods: {
            goNext(){
                this.$store.dispatch('carpicStore/goNext');
            },
            goPrev(){
                this.$store.dispatch('carpicStore/goPrev');
            },
            changePic(){
                //小图url
                const SAMLLPICURL = `http://127.0.0.1:3000/images/carimages_small/${this.id}/${this.nowAlbum}/${this.carinfo.images[this.nowAlbum][this.nowIdx]}`;
                //大图url
                const BIGPICURL = `http://127.0.0.1:3000/images/carimages/${this.id}/${this.nowAlbum}/${this.carinfo.images[this.nowAlbum][this.nowIdx]}`;
                //隐藏图片
                this.$refs.img.style.display = 'none';
                //显示loading图
                this.$refs.loadinggif.style.display = 'block';
                //创建虚拟的小图对象
                var smallimg = new Image();
                //请求小图
                smallimg.src = SAMLLPICURL;
                //创建虚拟大图对象
                var bigimg = new Image();
                //请求大图
                bigimg.src = BIGPICURL;

                var self = this;
                //监听小图加载完毕
                smallimg.onload = function (){
                    //小图加载完毕后先让大图展示区显示小图,同时隐藏loading图
                    self.$refs.loadinggif.style.display = 'none';
                    self.$refs.img.style.display = 'block';
                    self.$refs.img.src = SAMLLPICURL;
                    self.setMargin();
                }
                //监听大图加载完毕
                bigimg.onload = function (){
                    //大图加载完毕后展示大图
                    self.$refs.img.src = BIGPICURL;
                    self.setMargin();
                }
            },
            setMargin(){
                var imgW = (document.documentElement.clientWidth - 320) * 0.9;
                this.$refs.picbox.style.width = imgW + 'px';
                this.$refs.picbox.style.marginLeft = - imgW / 2 + 'px';
                var imgH = parseInt(getComputedStyle(this.$refs.img)['height']);
                this.$refs.picbox.style.marginTop = - imgH / 2 + 'px';
            }
        },
        watch: {
            nowAlbum(){
                this.changePic();
            },
            nowIdx(){
                this.changePic();
            },
            carinfo(){
                this.changePic();
            }
        }
    }
</script>

<style scoped lang="less">
    .wrap_bi{
        position: fixed;
        width:100%;
        height:100%;
        top:0;
        left:0;
        padding-right:320px;
        .inner{
            position: relative;
            height:100%;
            .loadinggif{
                position: absolute;
                width:100px;
                height:100px;
                left:50%;
                top:50%;
                margin-left:-50px;
                margin-top:-50px;
            }
            .picbox{
                position: absolute;
                left:50%;
                top: 50%;
                height: 100%;
                .img{
                    width: 100%;
                }
                .leftBtn{
                    position: absolute;
                    width:50%;
                    height:100%;
                    left:0;
                    top:0;
                    cursor: url(/images/cursor_left.cur),auto;
                }
                .rightBtn{
                    position: absolute;
                    width:50%;
                    height:100%;
                    right:0;
                    top:0;
                    cursor: url(/images/cursor_right.cur),auto;
                }
            }
        }
    }
</style>