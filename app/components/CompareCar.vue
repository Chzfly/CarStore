<template>
    <div>
        <Drawer title="Basic Drawer" :closable="false" :value="isOpen" @on-close="closeHandler">
            <ul>
                <li v-for="item in getCompareArr" :key="item.id">
                    {{item}}
                </li>
            </ul>
        </Drawer>
    </div>
</template>

<script>
    export default {
        props : ["isOpen"],
        methods : {
            closeHandler(){
                this.$emit("close");
            }
        },
        computed : {
            getCompareArr(){
                return this.$store.state.comparecarStore.arr;
            }
        }
    }
</script>

<style scoped>

</style>