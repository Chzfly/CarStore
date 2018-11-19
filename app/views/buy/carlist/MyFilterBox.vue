<template>
    <div>
        <Row v-for="item in filtersControls" :key="item.english">
            <Col :span="3">
                {{item.chinese}}
            </Col>
            <Col :span="21">
                <Fuxuankuang v-if="item.type == 'Fuxuankuang'" :english="item.english" :options="item.options"></Fuxuankuang>
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
                filtersControls: [
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
                        "options" : ["1.0L","1.2L","1.6T","2.0L","2.0T","3.0L","4.0L"]
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
        methods: {

        }
    }
</script>

<style scoped>

</style>