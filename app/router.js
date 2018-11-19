//引入vue-router
import VueRouter from 'vue-router';

//引入组件
import Index_layout from './views/index/Index_layout';
import Index from './views/index/Index';
import Buy from './views/buy';
import Carpic from './views/carpic';
import Park from './views/park';
import Sale from './views/sale';
import User from './views/user';
import Ai from './views/buy/ai';
import Carlist from './views/buy/carlist';
import Judicial from './views/buy/judicial';


export default (store) => {
    const router = new VueRouter({
        routes : [
            {
                path : '/index',
                component : Index_layout,
                children: [
                    //首页
                    {
                        path: 'index',
                        component: Index,
                        name: 'index'
                    },
                    //买车
                    {
                        path: 'buy',
                        component: Buy,
                        //此处，带默认子路由的路由不需要加name，因为如果使用link跳转到这个name时，默认的子路由不会被渲染，会造成警告，从逻辑上也造成了不严密，所以，使用link跳转时，直接跳转子路由的name即可。
                        // name: 'buy',
                        children: [
                            //默认跳转carlist
                            {
                                path: '',
                                component: Carlist,
                                name: 'buy_default'
                            },
                            {
                                path: 'ai',
                                component: Ai,
                                name: 'ai'
                            },
                            {
                                path: 'carlist',
                                component: Carlist,
                                name: 'carlist'
                            },
                            {
                                path: 'judicial',
                                component: Judicial,
                                name: 'judicial'
                            }
                        ]
                    },
                    //卖车
                    {
                        path: 'sale',
                        component: Sale,
                        name: 'sale'
                    },
                    //用户
                    {
                        path: 'user',
                        component: User,
                        name: 'user'
                    },
                    //停车场
                    {
                        path: 'park',
                        component: Park,
                        name: 'park'
                    }
                ]
            },
            {
                path: '/carpic/:id',
                component: Carpic,
                name: 'carpic'
            },
            {
                path: '*',
                redirect: {name : 'index'}
            }
        ]
    });
    //路由守卫  全局后置钩子
    router.afterEach((to, from) => {
        //匹配路由跳转的目标点，如果符合一级栏目则进行一级栏目跳转
        if(/\/index\/(\w+)/.test(to.fullPath)){
            store.commit('routerStore/changeColumnName', {
                name : to.fullPath.match(/\/index\/(\w+)/)[1]
            });
        }
        //匹配路由跳转的目标点，如果符合2级栏目则进行2级栏目跳转
        if(/\/index\/\w+\/(\w+)/.test(to.fullPath)){
            store.commit('routerStore/changeColumnName2nd', {
                name : to.fullPath.match(/\/index\/\w+\/(\w+)/)[1]
            });
        }
    });

    return router;
} 
    
 
