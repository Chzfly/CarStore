<template>
    <div>
        <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
                <Menu :active-name="columnName2nd" theme="light" width="auto" @on-select="selectHandler">
                    <MenuItem name="carlist">列表选车</MenuItem>
                    <MenuItem name="ai">AI荐车</MenuItem>
                    <MenuItem name="judicial">司法拍卖车辆</MenuItem>
                </Menu>
            </Sider>
            <Layout :style="{padding: '0 24px 24px'}">
                <Breadcrumb :style="{margin: '24px 0'}">
                    <BreadcrumbItem>主页</BreadcrumbItem>
                    <BreadcrumbItem>买车</BreadcrumbItem>
                    <BreadcrumbItem>列表选车</BreadcrumbItem>
                </Breadcrumb>
                <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    export default {
        computed: {
            columnName2nd(){
                return this.$store.state.routerStore.columnName2nd;
            }
        },
        methods: {
            selectHandler (name){
                this.$router.push({name});
            }
        }
    }
</script>

<style scoped>

</style>