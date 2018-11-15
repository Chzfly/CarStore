//引入vue-router
import VueRouter from 'vue-router';

//引入组件
import Index_layout from './views/index/Index_layout';


export default   new VueRouter({
        routes : [
            {
                path : '/index',
                component : Index_layout
            }
        ]
    })
 
