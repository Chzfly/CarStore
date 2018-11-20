<template>
    <div>
        <Row>
            <Col :span="12">
                <Slider range :min="min / conversion" :max="max / conversion" :value="v" @on-change="changeV" @on-input="changingV"></Slider>
            </Col>
            <Col :span="11" :offset="1">
                <Input style="width: 60px" v-model="v1"/>
                ~
                <Input style="width: 60px" v-model="v2"/>
                <Button type="info" @click="submitHandler">确定</Button>
            </Col>
        </Row>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                v1: this.min / this.conversion,
                v2: this.max / this.conversion
            }
        },
        props: ['english', 'min', 'max', 'conversion'],
        computed: {
            getStoreTheFilter(){
                return this.$store.state.findcarStore.filters.filter(item => item.k == this.english)[0]
            },
            v(){
                if(this.getStoreTheFilter){
                    return this.getStoreTheFilter.v.split('to').map(item => item / this.conversion);
                }else{
                    return [this.min / this.conversion, this.max / this.conversion];
                }
            }
        },
        methods: {
            changeV(v){
                this.$store.dispatch('findcarStore/changeFilter', {k: this.english, v: v.map(item => item * this.conversion).join('to')});
            },
            //滑动时时改变输入框数值
            changingV(v){
                this.v1 = v[0];
                this.v2 = v[1];
            },
            submitHandler(){
                //检查数据合法性
                if(isNaN(this.v1) || isNaN(this.v2)){
                    this.$Message.error("请输入数值");
                    return;
                }
                if(this.v1 > this.v2){
                    console.log(this.v1, this.v2)
                    this.$Message.error("最大值不能小于最小值");
                    return;
                }
                this.$store.dispatch('findcarStore/changeFilter', {k: this.english, v: [this.v1 * this.conversion, this.v2 * this.conversion].join("to")});
            }
        }
    }
</script>

<style scoped>

</style>