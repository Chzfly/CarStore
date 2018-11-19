<template>
    <div>
        <MyFilterBox></MyFilterBox>
        <MyTable></MyTable>
    </div>
</template>

<script>
    import MyTable from './MyTable';
    import MyFilterBox from './MyFilterBox';

    export default {
        components: {
            MyTable,
            MyFilterBox
        },
        beforeCreate(){
            this.$store.dispatch('findcarStore/fetchCar');
        }
    }
</script>

<style scoped>

</style>