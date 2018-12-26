/*********************************
**  author: 陈洪泽
**  desc: 登陆组件
*********************************/

<template>
    <div class="login_wrap">
        <div class="inner">
            <p class="login_wrap--wel">欢迎进入管理系统，请登陆。</p>
            <Form ref="formInline">
                <FormItem prop="username">
                    <Input autofocus type="text" v-model="formInline.username" placeholder="username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem >
                    <Button type="primary" @click="handleSubmit()">登陆</Button>
                </FormItem>
            </Form>
        </div>
        
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data(){
            return{
                formInline: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            handleSubmit(){
                axios.post('/api/login', {
                    'username': this.formInline.username,
                    'password': this.formInline.password
                }).then(data => {
                    if(data.data.result == 1){
                        this.$router.push({'name': 'index'});
                    }else{
                        this.Message.error('用户名或密码不正确');
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .login_wrap{
        position: fixed;
        width: 100%;
        height: 100%;
        background-image: -webkit-radial-gradient(left bottom, #033253, #048ea5);

        @w: 400px;
        @h: 210px;
        .inner{
            box-sizing: border-box;
            padding: 20px;
            position: absolute;
            width: @w;
            height: @h;
            left: 50%;
            top: 50%;
            margin-left: -@w / 2;
            margin-top: -@h / 2;
            background-color: white;
            border-radius: 5px;
        }
        &--wel{
            font-size: 14px;
            margin-bottom: 10px;
        }
    }
    .ivu-btn.ivu-btn-primary{
        margin-left: -25px;
        position: absolute;
        left: 50%;
    }
</style>