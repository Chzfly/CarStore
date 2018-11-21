<template>
    <div>
        <Card>
            <Form ref="_form" :model="formData" :rules="formRules" :label-width="120">
                <Row>
                    <Col :span="12">
                        <FormItem label="车主姓名" prop="name">
                            <Input v-model="formData.name" placeholder="请输入姓名"></Input>
                            <p>按照身份证信息准确填写</p>
                        </FormItem>
                        <FormItem label="身份证号" prop="idcard">
                            <Input v-model="formData.idcard" placeholder="身份证号"></Input>
                        </FormItem>
                        <FormItem label="性别" prop="sex">
                                <RadioGroup v-model="formData.sex">
                                    <Radio label="男"></Radio>
                                    <Radio label="女"></Radio>
                                </RadioGroup>
                        </FormItem>
                        <FormItem label="品牌和车系" prop="brandandseries">
                            <Cascader :data="bsData" v-model="bsValue"></Cascader>
                        </FormItem>
                        <FormItem label="颜色" prop="color">
                            <Input v-model="formData.color"></Input>
                        </FormItem>
                        <FormItem label="公里数" prop="km">
                            <Input v-model="formData.km"></Input>
                        </FormItem>
                        <FormItem label="购车日期" prop="buydate">
                            <DatePicker v-model="formData.buydate"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Button @click="handleSubmit">提交</Button>
            </Form>
        </Card>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                //表单选项
                formData: {
                    name: '',
                    idcard: '',
                    brand: '',
                    series: ''
                },
                //校验规则
                formRules: {
                    name: [
                        { required: true, message: '名字不能为空', trigger: 'blur' },
                        { type : "string" , pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '请正确填写', trigger: 'blur'}
                    ],
                    idcard : [
                        //必填
                        { required: true, message: '必须填写本项', trigger: 'blur' },
                        //字符串的正则
                        { type : "string" , pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请正确填写', trigger: 'blur'}
                    ],
                    sex : [
                        //必填
                        { required: true, message: '必须填写本项', trigger: 'blur' }
                    ],
                    brandandseries : [
                        //必填
                        { required: false, message: '必须填写本项', trigger: 'blur' }
                    ],
                    color : [
                        //必填
                        { required: true, message: '必须填写本项', trigger: 'blur' }
                    ],
                    km : [
                        //必填
                        { required: true, message: '必须填写本项', trigger: 'blur' },
                        //必填
                        { type : "string" , pattern: /^\d+$/, message: '请正确填写', trigger: 'blur'}
                    ],
                    buydate : [
                        //必填
                        { required: true  , message: '必须填写本项' },
                    ]
                },
                //品牌和车系级联表的数据
                bsData: [
                    {
                        value: 'A',
                        label: 'A',
                        children: [
                            {
                                value: '奥迪',
                                label: '奥迪',
                                children: [
                                    {
                                        value: 'RS6',
                                        label: 'RS6'
                                    },
                                    {
                                        value: 'A8',
                                        label: 'A8'
                                    }
                                ]
                            },
                            {
                                value: '阿斯顿马丁',
                                label: '阿斯顿马丁'
                            }
                        ]
                    },
                    {
                        value: 'B',
                        label: 'B'
                    }
                ]
            }
        },
        computed: {
            bsValue: {
                get(){
                    return [];
                },
                set(v){
                    this.formData.brand = v[1];
                    this.formData.series = v[2];
                }
            }
        },
        methods: {
            handleSubmit(){
                this.$refs._form.validate(data => console.log(data));
            }
        }
    }
</script>

<style scoped lang="less">

</style>