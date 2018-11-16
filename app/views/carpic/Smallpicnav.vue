<template>
    <div>
        <div class="wrapper">
            <ul>
                {{nowAlbum}}
            </ul>
        </div>
        
        <span>

        </span>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        computed: {
            nowAlbum(){
                return this.$store.state.carpicStore.nowAlbum;
            }
        },
        methods: {

        }
    }
</script>

<style scoped lang="less">
   .wrapper{
       background-color: pink;
       position: relative;
   }
</style>