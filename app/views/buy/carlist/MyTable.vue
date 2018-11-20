<template>
    <div>
        <Row>
            <Col :span="8">
                <h3>共找到{{total}}辆车符合条件，共{{Math.ceil(total/pagesize)}}页，当前第{{page}}页</h3>
            </Col>
            <Col :span="1" :offset="24 - 8 - 1">
                <Button type="primary" shape="circle" icon="md-settings" @click="showModal"></Button>
            </Col>
        </Row>
        <Table :columns="columns" :data="results"></Table>
        <div style="height:10px;"></div>

        <Page :total="total" :page-size="pagesize" :current="page" @on-change="changePage" show-sizer @on-page-size-change="changePagesize"></Page>
    
        <!-- 模态框（悬浮层）用户自定义列 -->
        <Modal
            v-model="modal1"
            title="请更改表格列"
            @on-ok="ok"
            @on-cancel="cancel"
        >
            <div ref="modalbox" v-if="modal1">
                <UserSetColModal :colSort="colSort"></UserSetColModal>  
            </div>
        </Modal>
    </div>
</template>

<script>
    import colConfig from './colConfig';
    import UserSetColModal from "./UserSetColModal";
    export default {
        data(){
            return {
                //列表的列定义
                columns: [],
                //列表中列定义数据的依据，根据colSort从条目库中选出我们需要的条目作为列表的列定义
                colSort: ["avatar", "id", "brand", "series", "price", "km", "buydate"],
                modal1: false
            }
        },
        computed: {
            results(){
                return this.$store.state.findcarStore.results;
            },
            total(){
                return this.$store.state.findcarStore.total;
            },
            pagesize(){
                return this.$store.state.findcarStore.pagesize;
            },
            page(){
                return this.$store.state.findcarStore.page;
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
            },
            changePage(page){
                this.$store.dispatch("findcarStore/changePage" , {page});
            },
            changePagesize(pagesize){
                this.$store.dispatch("findcarStore/changePagesize" , {pagesize});
            },
            changeSort({column , key , order}){
                this.$store.dispatch("findcarStore/changeSort" , {key , order});
            },
            ok () {
                var arr = []
                $(this.$refs.modalbox).find("#list2 li").each(function(){
                    arr.push($(this).attr("data-e"));
                });
                //改
                this.colSort = arr;
                //
                this.setColumnsByColSort();
                //关闭模态框
                this.modal1 = false;
            },
            cancel () {
               this.modal1 = false;
            },
            //显示模态框
            showModal(){
                this.modal1 = true;
            },
        },
        components: {
            UserSetColModal
        }
    }
</script>

<style scoped>

</style>