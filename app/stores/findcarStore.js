import axios from 'axios';
import querystring from 'querystring';

export default {
    namespaced: true,
    state: {
        page: 1,
        pagesize: 10,
        sortby: 'id',
        sortdirection: 1,
        results: [],
        total: 0
    },
    mutations: {
        changePage(state, {page}){
            state.page = page;
        },
        changePagesize(state, {pagesize}){
            state.pagesize = pagesize;
        },
        changeSortby(state, {sortby}){
            state.sortby = sortby;
        },
        changeSortdirection(state, {sortdirection}){
            state.sortdirection = sortdirection;
        },
        changeResults(state, {results}){
            state.results = results;
        },
        changeTotal(state, {total}){
            state.total = total;
        }
    },
    actions: {
        //拉取服务器数据
        async fetchCar({commit, state}){
            const {page, pagesize, sortby, sortdirection} = state;

            const {total, results} = await axios.get(
                '/api/findcar?' + querystring.stringify({page, pagesize, sortby, sortdirection, })
            ).then(item => item.data);
            //将拉取到的数据存入state中
            commit('changeResults', {results});
            commit('changeTotal', {total});
        }
    }
}