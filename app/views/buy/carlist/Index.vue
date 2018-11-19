<template>
    <div>
        <MyTable></MyTable>
    </div>
</template>

<script>
    import MyTable from './MyTable';

    export default {
        components: {
            MyTable
        },
        beforeCreate(){
            this.$store.dispatch('findcarStore/fetchCar');
        }
    }
</script>

<style scoped>

</style>