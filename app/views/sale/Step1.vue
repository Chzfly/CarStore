<template>
    <div>
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
                formData: {
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

        },
    }
</script>

<style scoped>

</style>