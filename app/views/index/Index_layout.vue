<template>
    <div>
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" @on-select="selectHandler" :active-name="columnName">
                    <div class="layout-logo">
                        <img src="/images/logo.png" alt="">
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="index">
                            <Icon type="md-home" />
                            首页
                        </MenuItem>
                        <MenuItem name="buy_default">
                            <Icon type="ios-cart" />
                            买车
                        </MenuItem>
                        <MenuItem name="sale">
                           <Icon type="md-key" />
                            卖车
                        </MenuItem>
                        <MenuItem name="user">
                            <Icon type="ios-contact" />
                            用户
                        </MenuItem>
                        <MenuItem name="park">
                            <Icon type="ios-car" />
                            停车场
                        </MenuItem>
                        <div class="meinfo">
                            <Poptip placement="bottom">
                                <div slot="content" class="content_slot">
                                    <ul>
                                        <li>
                                            <a href="javascript:void(0)" @click="showModal()">修改头像</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)">注销登陆</a>
                                        </li>
                                    </ul>
                                </div>
                                <Avatar v-if="!meinfo.avatar" icon="ios-person" shape="square"/>
                                <Avatar v-if="meinfo.avatar" :src="'http://127.0.0.1:3000/' + meinfo.avatar"/>
                            </Poptip>
                            欢迎你,{{meinfo.name}}。
                        </div>
                    </div>
                </Menu>
            </Header>
        </Layout>
        <router-view></router-view>
        <!-- 修改头像组件 -->
        <ChangeAvatar v-if="isModalShow" @close="closeModal"></ChangeAvatar>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                isModalShow: false
            }
        },
        computed: {
            columnName(){
                return this.$store.state.routerStore.columnName;
            },
            meinfo(){
                return this.$store.state.meStore;
            }
        },
        methods: {
            selectHandler (name){
                this.$router.push({name});
            },
            showModal(){
                this.isModalShow = true;
            },
            closeModal(){
                this.isModalShow = false;
            }
        }
    }
</script>

<style scoped lang="less">
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 750px;
        margin: 0 auto;
        margin-right: 20px;
    }
    .ivu-menu-horizontal .ivu-menu-item{
        font-size:20px;
    }
    .meinfo{
        float: left;
        color: white;
        cursor: pointer;
    }
    .content_slot{
        text-align: center;
        a{
            line-height: 30px;
            font-size: 16px;
        }
    }
</style>