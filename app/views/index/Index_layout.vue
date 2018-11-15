<template>
    <div>
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark">
                    <div class="layout-logo">
                        <img src="/images/logo.png" alt="">
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="index">
                            <!-- <Icon type="md-home" /> -->
                            首页
                        </MenuItem>
                        <MenuItem name="buy">
                            <!-- <Icon type="md-nutrition" /> -->
                            买车
                        </MenuItem>
                        <MenuItem name="sale">
                           <!-- <Icon type="md-pizza" /> -->
                            卖车
                        </MenuItem>
                        <MenuItem name="user">
                            <!-- <Icon type="logo-tux" /> -->
                            用户
                        </MenuItem>
                        <MenuItem name="park">
                            <!-- <Icon type="ios-paper"></Icon> -->
                            停车场
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
        </Layout>
            我是index_layout
            <!-- <router-view></router-view> -->
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>