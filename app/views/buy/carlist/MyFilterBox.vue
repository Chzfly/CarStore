<template>
    <div>
        <Row>
            <Col :span="3">
                品牌
            </Col>
            <Col :span="21">
                <Tabs value="A">
                    <TabPane v-for="item in brands" 
                        :key="item.char" 
                        :label="item.char"
                        :name="item.char"
                    >
                        <a href="javascript:void(0)" v-for="link in item.bs" @click="link_changeBrand(link)" :class="{'cur': link == brand}">
                            {{link}}
                        </a>
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
        <Row v-if="brand">
            <Col :span="3">
                车系
            </Col>
            <Col :span="21">
                <a href="javascript:void(0)" :class="{'cur': !series}" @click="allSeriesHandler()">
                    全部
                </a>
                <a href="javascript:void(0)" v-for="(item, index) in seriesOptions" :key="index" :class="{'cur': item == series}" @click="changeSeries(item)">
                    {{item}}
                </a>
            </Col>
        </Row>
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
    import axios from 'axios';
    export default {
        //created时最早可以使用this的生命周期，在此直接拉取服务器的品牌数据
        async created(){
            const {brands} = await axios.get('/api/brands').then(data => data.data);
            this.brands = brands;
        },
        computed: {
            //获取已有筛选条件
            filters(){
                return this.$store.state.findcarStore.filters;
            },
            brand(){
                var temp = this.$store.state.findcarStore.filters.filter(item => item.k == 'brand')[0];
                if(temp){
                    return temp.v;
                }else{
                    return '';
                }
            },
            series(){
                var temp = this.$store.state.findcarStore.filters.filter(item => item.k == 'series')[0];
                if(temp){
                    return temp.v;
                }else{
                    return '';
                }
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
                ],
                brands: [],
                seriesOptions: []
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
                if(k == 'brand'){
                    return '品牌';
                }
                if(k == 'series'){
                    return '车系';
                }
                return this.filterControls.filter(item=>item.english == k)[0].chinese;
            },
            //规整一下v
            getV(k , v){
                //如果是品牌和车系，直接返回名称给提示标签
                if(k == 'brand' || k == 'series'){
                    return v;
                }
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
            },
            //点击品牌筛选品牌
            link_changeBrand(link){
                this.$store.dispatch("findcarStore/changeFilter", {k: 'brand', v: link});
            },
            //筛选车系
            changeSeries(series){
                this.$store.dispatch("findcarStore/changeFilter", {k: 'series', v: series});
            },
            //清空车系筛选
            allSeriesHandler(){
                this.$store.dispatch("findcarStore/delFilter", {k: 'series'});
            }
        },
        watch: {
            async brand(v){
                var temp = await axios.get('api/series?brand=' + v).then(data => data.data);
                this.seriesOptions = temp.series;
            }
        }
    }
</script>

<style scoped lang="less">
.ivu-row{
    margin-bottom: 10px;
}
.ivu-tabs-tabpane{
    a{
        margin-right: 10px;
        text-align: center;
        padding: 2px;
    }
}
.cur{
    background-color: #ffd100c9;
}
.ivu-col.ivu-col-span-21{
    a{
        margin-right: 10px;
        text-align: center;
        padding: 2px;    
    }
}
</style>