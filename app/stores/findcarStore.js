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
        total: 0,
        filters: []
    },
    mutations: {
        changePage(state, {page}){
            state.page = page;
        },
        changePagesize(state, {pagesize}){
            state.pagesize = pagesize;
        },
        changeSort(state, {sortby, sortdirection}){
            state.sortby = sortby;
            state.sortdirection = sortdirection;
        },
        changeResults(state, {results}){
            state.results = results;
        },
        changeTotal(state, {total}){
            state.total = total;
        },
        //对过滤条件的修改
        addFilter(state, {k, v}){
            state.filters.push({k, v});
        },
        updateFilter(state, {k, v}){
            state.filters = state.filters.map(item => item.k == k ? {...item, v} : item);
        },
        delFilter(state, {k}){
            state.filters = state.filters.filter(item => item.k != k);
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
        },
        //改变filter
        changeFilters({commit, state, dispatch}, {k, v}){
            //判断是修改还是增加
            var isExist = false;
            //遍历filters数组，看是否有传入载荷的这一项
            state.filters.forEach(item => {
                if(item.k == k){
                    isExist = true;
                }
            });
            //根据判断结果出发mutations
            if(isExist){
                commit('updateFilter', {k, v});
            }else{
                commit('addFilter', {k, v});
            }
            //展示页面重置
            commit('changePage', {page : 1});
            //重新拉取数据
            dispatch('fetchCar');
        },
        //删除filter中某项
        delFilter({dispatch, commit}, {k, v}){
            commit('delFilter', {k, v});
            commit('changePage', {page : 1});
            dispatch('fetchCar');
        },
        //换页
        changePage({commit, dispatch}, {page}){
            commit('changePage', {page});
            dispatch('fetchCar');
        },
        //换每页几条
        changePagesize({commit, dispatch}, {pagesize}){
            commit('changePagesize', {pagesize});
            commit('changePage', {page : 1});
            dispatch('fetchCar');
        },
        changeSort({commit, dispatch}, {sortby, sortdirection}){
            commit('changeSort', {sortby, sortdirection : sortdirection == 'desc' ? -1 : 1});
            commit('changePage', {page : 1});
            dispatch('fetchCar');
        }
    }
}