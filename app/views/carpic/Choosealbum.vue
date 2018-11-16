<template>
    <div>
        <div v-if="carinfo.images" class="ca_wrap">
            <ul>
                <li v-for="item in arr" :class="{'cur' : item.english == nowAlbum, [item.english] : true}" @click="changeAlbum(item.english)">
                    {{item.chinese}}({{carinfo.images[item.english].length}})
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                arr: [
                    {
                        chinese : '外观',
                        english : 'view'
                    },
                    {
                        chinese : '内饰',
                        english : 'inner'
                    },
                    {
                        chinese : '发动机',
                        english : 'engine'
                    },
                    {
                        chinese : '更多',
                        english : 'more'
                    },
                ]
            }
        },
        computed: {
            carinfo(){
                return this.$store.state.carpicStore.carinfo;
            },
            nowAlbum(){
                return this.$store.state.carpicStore.nowAlbum;
            }
        },
        methods: {
            changeAlbum(album){
                this.$store.commit('carpicStore/changeNowAlbum', {album});
            }
        }
    }
</script>

<style scoped lang="less">
    .ca_wrap{
            ul{
                list-style:none;

                li{
                    float: left;
                    width:140px;
                    height:40px;
                    background:#eee;
                    box-sizing:border-box;
                    margin-right:19px;
                    margin-bottom:19px;
                    color:black;
                    text-align: center;
                    line-height: 40px;
                    font-size:16px;
                    cursor: pointer;

                    &.cur{
                        background: gold;
                    }

                    &.inner{
                        margin-right: 0;
                    }

                    &.more{
                        margin-right: 0;
                    }
            }
        }
    }
</style>