//引包
import axios from 'axios';

export default {
    namespaced: true,
    state: {
        //车辆信息
        carinfo: {},
        //当前展示的图集
        nowAlbum: 'view'
    },
    mutations: {
        changeCarinfo(state, {result}){
            state.carinfo = result;
        },
        changeNowAlbum(state, {album}){
            state.nowAlbum = album;
        }
    },
    actions: {
        async loadData({commit, state}, {id}){
            const {result} = await axios.get('/api/carinfo?id=' + id).then((data)=>{
                return data.data;
            });
            commit('changeCarinfo', {result});
            // console.log(result)
        }
    }
}