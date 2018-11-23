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
                            欢迎你{{meinfo.name}}
                        </div>
                    </div>
                </Menu>
            </Header>
        </Layout>
        
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
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
        width: 580px;
        margin: 0 auto;
        margin-right: 20px;
    }
    .ivu-menu-horizontal .ivu-menu-item{
        font-size:20px;
    }
</style>