<template>
    <div>
        <CheckboxGroup v-model="m">
            <Checkbox v-for="item in options" :label="item" :key="item"></Checkbox>
        </CheckboxGroup>
    </div>
</template>

<script>
    export default {
        props: ['english', 'options'],
        computed: {
            //尝试得到全局中对应english筛选条目的具体筛选条件，全局中对该english尚且没有筛选条件则返回undefined，方便后续判断
            getStoreTheFilter(){
                return this.$store.state.findcarStore.filters.filter(item => item.k == this.english)[0];
            },
            //处理筛选条件
            m: {
                get(){
                    //判断
                    if(this.getStoreTheFilter){
                        return this.getStoreTheFilter.v.split('v');
                    }else{
                        return [];
                    }
                },
                set(v){
                    this.$store.dispatch('findcarStore/changeFilter', {k : this.english, v : v.join('v')})
                }
            }
        }
    }
</script>

<style scoped>

</style>