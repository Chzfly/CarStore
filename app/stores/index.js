//引入子状态库
import routerStore from './routerStore';
import carpicStore from './carpicStore';
import findcarStore from './findcarStore';
import comparecarStore from './comparecarStore';

export default {
    modules : {
        //路由的状态库
        routerStore,
        //carpic的状态库
        carpicStore,
        findcarStore,
        comparecarStore
    }
}