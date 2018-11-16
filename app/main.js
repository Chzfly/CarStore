import Vue from 'vue';
import Vuex from 'vuex';
import iview from 'iview';
import VueRouter from 'vue-router';

//引入根组件
import App from './App';
//引入路由文件
import router from './router';
//引入状态仓库
import storeObj from './stores';
//引入过滤器
import selfround from './filters/selfround';
import selfgetyear from './filters/selfgetyear';

//安装插件
Vue.use(iview);
Vue.use(Vuex);
Vue.use(VueRouter);

//创建store对象
const store = new Vuex.Store(storeObj);

//定义过滤器
Vue.filter('selfround', selfround);
Vue.filter('selfgetyear', selfgetyear);

new Vue({
    el : '#app',
    render (h){
        return h(App);
    },
    //将store对象传给router
    router : router(store),
    store
});