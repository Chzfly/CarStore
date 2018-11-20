<template>
    <div>
        <MyFilterBox></MyFilterBox>
        <MyTable></MyTable>
        <CompareBtn></CompareBtn>
    </div>
</template>

<script>
    import MyTable from './MyTable';
    import MyFilterBox from './MyFilterBox';
    import CompareBtn from '../../../components/CompareBtn';
    export default {
        components: {
            MyTable,
            MyFilterBox,
            CompareBtn
        },
        beforeCreate(){
            this.$store.dispatch('findcarStore/fetchCar');
        }
    }
</script>

<style scoped>

</style>