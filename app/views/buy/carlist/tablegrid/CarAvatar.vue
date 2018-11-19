<template>
    <div class="ca_wrapper">
        <router-link :to="{'name' : 'carpic', 'params' : {id : row.id}}">
            <img width="100%" :src="`http://127.0.0.1:3000/images/carimages_small/${row.id}/view/${row.avatar}`" alt="">
        </router-link>
    </div>
</template>

<script>
    export default {
        props: ['row']
    }
</script>

<style scoped>

</style>