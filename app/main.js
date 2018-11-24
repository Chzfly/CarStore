import Vue from 'vue';
import Vuex from 'vuex';
import iview from 'iview';
import VueRouter from 'vue-router';
import VueDraggable from 'vue-draggable';

//引入根组件
import App from './App';
//引入路由文件
import router from './router';
//引入状态仓库
import storeObj from './stores';
//引入过滤器
import selfround from './filters/selfround';
import selfgetyear from './filters/selfgetyear';
import qianfenfu from './filters/qianfenfu';
//引入全局组件
import PicShow from './components/PicShow';
import ChangeAvatar from './components/ChangeAvatar';

//安装插件
Vue.use(iview);
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueDraggable);

//创建store对象
const store = new Vuex.Store(storeObj);

//定义过滤器
Vue.filter('selfround', selfround);
Vue.filter('selfgetyear', selfgetyear);
Vue.filter('qianfenfu', qianfenfu);

//定义全局组件
Vue.component('PicShow', PicShow);
Vue.component('ChangeAvatar', ChangeAvatar);

new Vue({
    el : '#app',
    render (h){
        return h(App);
    },
    //将store对象传给router
    router : router(store),
    store
});