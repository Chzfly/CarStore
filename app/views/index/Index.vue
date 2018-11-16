<template>
    <div>
        <h1>我是首页</h1>
        <router-link :to="{ name: 'carpic', params: { id: 1000066 }}">去大图工作面</router-link>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>