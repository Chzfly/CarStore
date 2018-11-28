//引入子状态库
import routerStore from './routerStore';
import carpicStore from './carpicStore';
import findcarStore from './findcarStore';
import comparecarStore from './comparecarStore';
import saleStore from './saleStore';
import meStore from './meStore';
import rightbarStore from './rightbarStore';

export default {
    modules : {
        //路由的状态库
        routerStore,
        //carpic的状态库
        carpicStore,
        findcarStore,
        comparecarStore,
        saleStore,
        meStore,
        rightbarStore
    }
}