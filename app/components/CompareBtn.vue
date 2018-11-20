<template>
    <div>
        <CompareCar :isOpen="isOpen" @close="closeDrawer"></CompareCar>
        <div class="compareBtn" @click="showDrawer">
            {{$store.state.comparecarStore.arr.length}}
        </div>
    </div>
</template>

<script>
    import CompareCar from './CompareCar';
    export default {
        components: {
            CompareCar
        },
        data(){
            return{
                isOpen: false
            }
        },
        methods: {
            showDrawer(){
                this.isOpen = true;
            },
            closeDrawer(){
                this.isOpen = false;
            }
        }
    }
</script>

<style scoped lang="less">
    .compareBtn{
        position: fixed;
        bottom:130px;
        right:0px;
        width:40px;
        height:40px;
        border-radius: 50%;
        background:orange;
        color:white;
        text-align: center;
        line-height: 40px;
        font-weight: bold;
        font-size:30px;
        cursor: pointer;
    }
</style>