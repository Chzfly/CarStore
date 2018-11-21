<template>
    <div>
        <Card>
            <Steps :current="step - 1">
                <Step v-for="item in 4" :key="item" :title="_title(item)" :content="_content(item)"></Step>
            </Steps>
        </Card>
        <div style="height: 20px"></div>
        <Step1 v-show="step == 1"></Step1>
        <Step2 v-show="step == 2"></Step2>
    </div>
</template>

<script>
    import Step1 from './Step1';
    import Step2 from './Step2';
    export default {
        data(){
            return {

            }
        },
        computed: {
            step(){
                return this.$store.state.saleStore.step;
            }
        },
        methods: {
            _title(n){
                if(n < this.step){
                    return '已完成';
                }else if(n == this.step){
                    return '编辑中';
                }else{
                    return '待处理';
                }
            },
            _content(n){
                switch(n){
                    case 1:
                    return '步骤一：请输入基本信息';
                    case 2:
                    return '步骤二：请上传车辆照片';
                    case 3:
                    return '描述信息3';
                    case 4:
                    return '描述信息4';
                }
            }
        },
        components: {
            Step1,
            Step2
        }
    }
</script>

<style scoped>

</style>