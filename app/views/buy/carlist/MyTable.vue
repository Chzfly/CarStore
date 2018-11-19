<template>
    <div>
        <Table :columns="columns" :data="results"></Table>
    </div>
</template>

<script>
    import colConfig from './colConfig';

    export default {
        data(){
            return {
                //列表的列定义
                columns: [],
                //列表中列定义数据的依据，根据colSort从条目库中选出我们需要的条目作为列表的列定义
                colSort: ["avatar", "id", "brand", "series", "price", "km"],
            }
        },
        computed: {
            results(){
                return this.$store.state.findcarStore.results;
            }
        },
        //组件创建后，根据colSort生成列表定义
        created(){
            this.setColumnsByColSort();
        },
        methods: {
            //根据colSort生成列表定义
            setColumnsByColSort(){
                //列表定义可能会更新，所以先清空
                this.columns = [];
                for(let i = 0; i < this.colSort.length; i ++){
                    this.columns.push(colConfig[this.colSort[i]]);
                }
            }
        }
    }
</script>

<style scoped>

</style>