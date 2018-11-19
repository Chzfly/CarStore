//引包
import axios from 'axios';

export default {
    namespaced: true,
    state: {
        //车辆信息
        carinfo: {},
        //当前展示的图集
        nowAlbum: 'view',
        //小序号，当前正在看这个图集中的第几号图，号从0开始
        nowIdx: 0
    },
    mutations: {
        changeCarinfo(state, {result}){
            state.carinfo = result;
        },
        changeNowAlbum(state, {album}){
            state.nowAlbum = album;
        },
        changeNowIdx(state, {nowIdx}){
            state.nowIdx = nowIdx;
        }
    },
    actions: {
        //根据id请求carinfo数据
        async loadData({commit, state}, {id}){
            //重置相册、idx、车辆信息，此处不重置的话，虽然loadData执行完毕后也可以得到我们期待的state数据，但是在数据请求和重新赋值的过程中，state中的carinfo不是空，这就导致Smallpicnav组件的dom会进行上树渲染，并且渲染其中的image使用的是错误的carinfo，所以此处进行重置数据。
            commit("changeNowAlbum" , {"album" : "view"});
            commit("changeNowIdx", {"nowIdx" : 0});
            commit("changeCarinfo", {"result" : []});
            const {result} = await axios.get('/api/carinfo?id=' + id).then((data)=>{
                return data.data;
            });
            commit('changeCarinfo', {result});
        },
        //切换图集
        changeNowAlbum({commit}, {album}){
            commit('changeNowAlbum', {album});
            commit('changeNowIdx', {nowIdx : 0});
        },
        //下一张
        goNext({commit, state, dispatch}){
            if(state.nowIdx < state.carinfo.images[state.nowAlbum].length - 1){
                commit('changeNowIdx', {nowIdx : state.nowIdx + 1});
            }else if(state.nowAlbum == 'view'){
                dispatch('changeNowAlbum', {album : 'inner'});
            }else if(state.nowAlbum == 'inner'){
                dispatch('changeNowAlbum', {album : 'engine'});
            }else if(state.nowAlbum == 'engine'){
                dispatch('changeNowAlbum', {album : 'more'});
            }else if(state.nowAlbum == 'more'){
                dispatch('changeNowAlbum', {album : 'view'});
            }
        },
        goPrev({commit, state, dispatch}){
            if(state.nowIdx > 0){
                commit('changeNowIdx', {nowIdx : state.nowIdx - 1});
            }else if(state.nowAlbum == 'view'){
                dispatch('changeNowAlbum', {album : 'more'});
            }else if(state.nowAlbum == 'more'){
                dispatch('changeNowAlbum', {album : 'engine'});
            }else if(state.nowAlbum == 'engine'){
                dispatch('changeNowAlbum', {album : 'inner'});
            }else if(state.nowAlbum == 'inner'){
                dispatch('changeNowAlbum', {album : 'view'});
            }
        }
    }
}