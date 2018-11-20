<template>
    <div>
        <Row v-for="item in filterControls" :key="item.english">
            <Col :span="3">
                {{item.chinese}}
            </Col>
            <Col :span="21">
                <Fuxuankuang v-if="item.type == 'Fuxuankuang'" :english="item.english" :options="item.options"></Fuxuankuang>
                <Huadongtiao v-if="item.type == 'Huadongtiao'" :min="item.min" :max="item.max" :english="item.english" :conversion="item.conversion"></Huadongtiao>
                <Riqifanwei v-if="item.type == 'Riqifanwei'" :english="item.english"></Riqifanwei>
            </Col>
        </Row>
        <div style="height:20px;clear:both;"></div>
        <Row>
            <Col :span="24">
                <Tag closable v-for="item in filters" :key="item.k" @on-close="closeHandler(item.k)">
                    {{getK(item.k)}} ：{{getV(item.k , item.v)}}
                </Tag>
            </Col>
        </Row>
    </div>
</template>

<script>
    import moment from 'moment';
    import Fuxuankuang from './filtercontrols/Fuxuankuang';
    import Huadongtiao from './filtercontrols/Huadongtiao';
    import Riqifanwei from './filtercontrols/Riqifanwei';
    export default {
        computed: {
            //获取已有筛选条件
            filters(){
                return this.$store.state.findcarStore.filters;
            }
        },
        data(){
            return {
                //所有筛选小控件
                filterControls: [
                    {
                       'chinese': '颜色',
                       'english': 'color',
                       'type': 'Fuxuankuang',
                       'options': ["红","黄","绿","蓝","黑","白","灰","银灰","咖啡"] 
                    },
                    {
                        "chinese" : "发动机",
                        "english" : "engine",
                        "type" : "Fuxuankuang",
                        "options" : ["1.0L","1.2L","1.6T","2.0L","2.0T","3.0L"]
                    },
                    {
                        "chinese" : "排放标准",
                        "english" : "exhaust",
                        "type" : "Fuxuankuang",
                        "options" : ["国一","国二","国三","国四","国五"]
                    },
                    {
                        "chinese" : "变速箱",
                        "english" : "gearbox",
                        "type" : "Fuxuankuang",
                        "options" : ["手动","自动","手自一体"]
                    },
                    {
                        "chinese" : "燃料",
                        "english" : "fuel",
                        "type" : "Fuxuankuang",
                        "options" : ["汽油","柴油","纯电动","油电混合"]
                    },
                    {
                        "chinese" : "售价（万元）",
                        "english" : "price",
                        "type" : "Huadongtiao",
                        "min" : 0,
                        "max" : 120,
                        "conversion" : 1
                    },
                    {
                        "chinese" : "公里数（万公里）",
                        "english" : "km",
                        "type" : "Huadongtiao",
                        "min" : 0,
                        "max" : 2000000,        //真值
                        "conversion" : 10000    //将10000当做1
                    },
                    {
                        "chinese" : "购买日期",
                        "english" : "buydate",
                        "type" : "Riqifanwei"
                    }
                ]
            }
        },
        components: {
            Fuxuankuang,
            Huadongtiao,
            Riqifanwei
        },
        methods : {
            //英语名字换中文
            getK(k){
                return this.filterControls.filter(item=>item.english == k)[0].chinese;
            },
            //规整一下v
            getV(k , v){
                //看类型
                var type = this.filterControls.filter(item=>item.english == k)[0].type;

                //区别
                if(type == "Fuxuankuang"){
                    return v.replace(/v/g , " 或 ");
                }else if(type == "Riqifanwei"){
                    return v.split("to").map(item=>{
                        return moment(Number(item)).format("YYYY年MM月DD日");
                    }).join(" 到 ");
                }
                //几个特例
                if(k == "price"){
                    return v.split("to").map(item=>item + "万元").join(" 到 ");
                }else if(k == "km"){
                    return v.split("to").map(item=>item / 10000 + "万公里").join(" 到 ");
                }
            },
            closeHandler(k){
                this.$store.dispatch("findcarStore/delFilter", {k})
            }
        }
    }
</script>

<style scoped>

</style>