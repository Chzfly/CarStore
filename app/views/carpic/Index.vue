<template>
    <div class="carpic_wrapper">
        <div class="bigimg">
            <Bigimg></Bigimg>
        </div>

        <div class="rightpart">
            <div class="carinfo">
                <Carinfo></Carinfo>
            </div>
            <div class="choosealbum">
                <Choosealbum></Choosealbum>
            </div>
            <div class="smallpicnav">
                <Smallpicnav></Smallpicnav>
            </div>
        </div>
    </div>
</template>

<script>
    import Bigimg from './Bigimg';
    import Carinfo from './Carinfo';
    import Choosealbum from './Choosealbum';
    import Smallpicnav from './Smallpicnav';

    export default {
        //拉取数据
        beforeCreate (){
            this.$store.dispatch('carpicStore/loadData', {id : this.$route.params.id});
        },
        //注册组件
        components: {
            Bigimg,
            Carinfo,
            Choosealbum,
            Smallpicnav
        }
    }
</script>

<style scoped lang="less">
    .carpic_wrapper{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: black;
        box-sizing: border-box;
        .rightpart{
            position: absolute;
            right: 0;
            top: 0;
            width: 320px;
            height: 100%;
            border-left: 1px solid #888;
            box-sizing: border-box;
            padding: 10px;
        }
    }
</style>