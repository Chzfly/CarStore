<template>
    <div>
        <Card>
            <Steps :current="step - 1">
                <Step v-for="item in 4" :title="_title(item)" :content="_content(item)"></Step>
            </Steps>
        </Card>
        <div style="height: 20px"></div>
        <Card>
            <Form ref="_form" :model="formData" :rules="formRules" :label-width="80">
                <FormItem label="姓名" prop="name">
                    <Input v-model="formData.name" placeholder="请输入姓名"></Input>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                formdata: {
                    name: ''
                },
                formRules: {
                    name: [
                        { required: true, message: '名字不能为空', trigger: 'blur' }
                    ]
                }
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
                    return '描述信息1';
                    case 2:
                    return '描述信息2';
                    case 3:
                    return '描述信息3';
                    case 4:
                    return '描述信息4';
                }
            }
        }
    }
</script>

<style scoped>

</style>