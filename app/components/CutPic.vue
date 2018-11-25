<template>
    <div>
        <div class="picwrap" :style="{'width' : picW + 'px', 'height' : picH + 'px'}">
            <!-- 底图 -->
            <img :src="`http://127.0.0.1:3000/${picurl}`" :style="{'width' : picW + 'px', 'height' : picH + 'px'}">
            <!-- 遮罩层 -->
            <div class="mask"></div>
            <!-- 裁图框 -->
            <div class="cut_rect" ref="cut_rect">
                <!-- 裁图框中的高亮图 -->
                <img :src="`http://127.0.0.1:3000/${picurl}`" 
                :style="{
                    'width' : picW + 'px',
                    'height' : picH + 'px',
                    'margin-left': -cutInfo.cut_rect_x + 'px',
                    'margin-top': -cutInfo.cut_rect_y + 'px'
                    }"
                >
                <!-- 跑马灯边框 -->
                <div class="t"></div>
                <div class="r"></div>
                <div class="b"></div>
                <div class="l"></div>
            </div>
        </div>
        <!-- 预览图 -->
        <div class="priview_wrap">
            <div class="p_box" 
                v-for="item in p_box_arr" 
                :key="item" 
                :style="{
                    'width': item + 'px',
                    'height': item + 'px'
                    }"
            >
                <img 
                    :src="`http://127.0.0.1:3000/${picurl}`"
                    :style="{
                        'width': picW / cutInfo.cut_Rect_w * item + 'px',
                        'height': picH / cutInfo.cut_rect_h * item + 'px',
                        'margin-left': - cutInfo.cut_rect_x / cutInfo.cut_rect_w * item + 'px',
                        'margin-top': - cutInfo.cut_rect_y / cutInfo.cut_rect_w * item + 'px'
                    }"
                >
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        props: ['cutInfo', 'picurl', 'picW', 'picH', 'picRealW', 'picRealH'],
        data(){
            return{
                //预览图宽高
                p_box_arr: [120, 90, 60, 40]
            }
        },
        mounted(){
            var self = this;
            //裁剪框拖拽
            $(self.$refs.cut_rect).draggable({
                //在父盒子范围内
                containment: 'parent',
                //拖拽时候的事件
                drag(event, ui){
                    var left = ui.position.left;
                    var top = ui.position.top;
                    //改变裁切数据
                    self.cutInfo.cut_rect_x = left;
                    self.cutInfo.cut_rect_y = top;
                }
            });
            //允许裁剪框改变尺寸
            $(self.$refs.cut_rect).resizable({
                //在父盒子范围内
                containment: 'parent',
                //固定比例
                aspectRatio: true,
                //改变尺寸时候的事件
                resize(event, ui){
                    //得到裁切框的尺寸
                    var width = ui.size.width;
                    var height = ui.size.height;
                    //改变裁切数据
                    self.cutInfo.cut_rect_w = width;
                    self.cutInfo.cut_rect_h = height;
                }
            });
        }
    }
</script>

<style scoped lang="less">
.picwrap{
    float:left;
    position: relative;
    .mask{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.6;
    }
    .cut_rect{
        position: absolute;
        width: 60px;
        height: 60px;
        top: 0;
        left: 0;
        overflow: hidden;

        @time: 100s;
        .t{
            position: absolute;
            height: 0;
            width: 5000px;
            left: 0;
            top: 0;
            border-top: 1px dashed white;
            animation: move_right @time linear 0s infinite;
        }
        .r{
            position: absolute;
            height: 5000px;
            width: 0;
            right: 0;
            top: 0;
            border-right: 1px dashed white;
            animation: move_bottom @time linear 0s infinite;     
        }
        .b{
            position: absolute;
            height: 0;
            width: 5000px;
            left: 0;
            bottom: 0;
            border-bottom: 1px dashed white;
            animation: move_left @time linear 0s infinite;     
        }
        .l{
            position: absolute;
            height: 5000px;
            width: 0;
            left: 0;
            top: 0;
            border-right: 1px dashed white;
            animation: move_top @time linear 0s infinite;     
        }
        @keyframes move_right {
            from{
                left: -2500px
            }
            to{
                left:0
            }
        }
        @keyframes move_bottom {
            from{
                top: -2500px
            }
            to{
                top:0
            }
        }
        @keyframes move_left {
            from{
                left: 0
            }
            to{
                left: -2500px
            }
        }
        @keyframes move_top {
            from{
                top: 0
            }
            to{
                top: -2500px
            }
        }
        @-webkit-keyframes move_top {
            from{
                top: 0
            }
            to{
                top: -2500px
            }
        }
        @-moz-keyframes move_top {
            from{
                top: 0
            }
            to{
                top: -2500px
            }
        }
        @-o-keyframes move_top {
            from{
                top: 0
            }
            to{
                top: -2500px
            }
        }
        @-webkit-keyframes move_left {
            from{
                left: 0
            }
            to{
                left: -2500px
            }
        }
        @-moz-keyframes move_left {
            from{
                left: 0
            }
            to{
                left: -2500px
            }
        }
        @-o-keyframes move_left {
            from{
                left: 0
            }
            to{
                left: -2500px
            }
        }
        @-webkit-keyframes move_bottom {
            from{
                top: -2500px
            }
            to{
                top:0
            }
        }
        @-moz-keyframes move_bottom {
            from{
                top: -2500px
            }
            to{
                top:0
            }
        }
        @-o-keyframes move_bottom {
            from{
                top: -2500px
            }
            to{
                top:0
            }
        }
        @-webkit-keyframes move_right {
            from{
                left: -2500px
            }
            to{
                left:0
            }
        }
        @-moz-keyframes move_right {
            from{
                left: -2500px
            }
            to{
                left:0
            }
        }
        @-o-keyframes move_right {
            from{
                left: -2500px
            }
            to{
                left:0
            }
        }
    }
}
.priview_wrap{
    float:left;
    width: 160px;
    .p_box{
        border: 1px solid #666;
        margin-bottom: 26px;
        margin-left: 20px;
        overflow: hidden;
    }
}
</style>