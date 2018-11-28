<template>
    <div>
        <Modal
            title="更改头像"
            @on-cancel="cancel"
            @on-ok="okHandler"
            v-model="modal"
            :width="modalW"
            class-name="vertical-center-modal">
            <!-- 第一步 -->
            <div v-if="step == 1">
                <input type="file" ref="file" @change="changeHandler" hidden>
                <Button @click="uploadBundle">选择本地图片</Button>
                <p>只能上传jpg、png类型图片</p>
            </div>
            <!-- 第二步 -->
            <div v-if="step == 2">
                <Progress :percent="percent" status="active"></Progress>
            </div>
            <!-- 第三步 -->
            <div v-if="step == 3">
                <div class="cut_wrapper" :style="{'width' : picW + paddingRight + 'px' , 'height' : (picH > 280 ? picH : 280) + 'px'}">
                    <CutPic :cutInfo="cutInfo" :picurl="picurl" :picW="picW" :picH="picH" :picRealW="picRealW" :picRealH="picRealH"></CutPic>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    import CutPic from './CutPic';
    import axios from 'axios';
    export default {
        data(){
            return {
                modal: true,
                step: 1,
                percent: 0,
                picWMin: 400,
                picWMax: 700,
                picHMin: 250,
                picHMax: 390,
                paddingRight: 180,
                picRealW: 0,
                picRealH: 0,
                picW: 0,
                picH: 0,
                picurl: '',
                cutInfo: {
                    cut_rect_x: 0,
                    cut_rect_y: 0,
                    cut_rect_w: 60,
                    cut_rect_h: 60
                }
            }
        },
        components: {
            CutPic
        },
        computed: {
            modalW(){
                if(!this.picurl){
                    return '500px';
                }else{
                    return this.picW + this.paddingRight + 'px';
                }
            }
        },
        methods: {
            cancel(){
                this.$emit("close");
            },
            okHandler(){
                //图片裁剪尺寸确定后发出请求，后台进行裁剪
                axios.post('/api/cut', {
                    picurl : this.picurl,
                    cut_rect_x : this.cutInfo.cut_rect_x,
                    cut_rect_y : this.cutInfo.cut_rect_y,
                    cut_rect_w : this.cutInfo.cut_rect_w,
                    cut_rect_h : this.cutInfo.cut_rect_h,
                    picRealW : this.picRealW,
                    picRealH : this.picRealH,
                    picW : this.picW,
                    picH : this.picH
                });
                window.location.reload();
            },
            changeHandler(){
                //当选定文件后，input框发生改变的事件
                var thefile = this.$refs.file.files[0];
                var self = this;

                //进行异步上传图片
                //创建虚拟表单
                var form = new FormData();
                //在虚拟表单中追加一个头像项
                form.append('avatar', thefile);
                //Ajax
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function (){
                    if(xhr.readyState == 4){
                        var o = JSON.parse(xhr.responseText);
                        self.picurl = o.filename;
                        self.picRealW = o.width;
                        self.picRealH = o.height;
                        self.setWH();
                    }
                };
                //实时监听上传进度
                xhr.upload.onprogress = function (e){
                    self.percent = (e.loaded / e.total) * 100;
                    if(e.loaded == e.total){
                        self.step = 3;
                    }
                };
                xhr.open('POST', '/api/upavatar', true);
                xhr.send(form);
                self.step = 2;
            },
            setWH(){
                this.picW = this.picRealW;
                this.picH = this.picRealH;
                //如果图片的最大宽度大于了能够写的最大宽度
                if(this.picRealW > this.picWMax){
                    //就让图片的宽度为最大宽度
                    this.picW = this.picWMax;
                    //高度等比例变化
                    this.picH = this.picRealH / (this.picRealW / this.picWMax);
                }
                //验证高度是不是合法
                if(this.picRealH > this.picHMax){
                    //就让图片的高度为最大高度
                    this.picH = this.picHMax;
                    //宽度等比例变化
                    this.picW = this.picRealW / (this.picRealH / this.picHMax);
                }
            },
            uploadBundle(){
                //模拟触发input框点击
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click", false, false);
                this.$refs.file.dispatchEvent(evt);
            }
        }
    }
</script>

<style  lang="less">
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
</style>