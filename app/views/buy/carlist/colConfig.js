import CarAvatar from './tablegrid/CarAvatar';
import Buydate from './tablegrid/Buydate';
import Km from './tablegrid/Km';

export default {
    avatar : {
        title: '形象照',
        key: 'avatar',
        //h函数是createElement的缩写
        render(h, { row }) {
            return h(CarAvatar, {
                props: {
                    row
                }
            })
        },
        width: 120
    },
    id : {
        title: 'id',
        key: 'id',
        sortable: "cumtom",
        sortType : "asc"
    },
    color : {
        title: '颜色',
        key: 'color'
    },
    brand : {
        title: '品牌',
        key: 'brand'
    },
    series : {
        title: '车系',
        key: 'series'
    },
    price : {
        title: '售价',
        key: 'price',
        sortable: "cumtom"
    },
    km : {
        title: '公里数',
        key: 'km',
        render(h, { row }) {
            return h(Km, {
                props: {
                    km: row.km
                }
            });
        },
        sortable: "cumtom"
    },
    buydate : {
        title: '购买日期',
        key: 'buydate',
        render(h, { row }) {
            return h(Buydate, {
                props: {
                    buydate: row.buydate
                }
            })
        }
    },
    engine : {
        title: '发动机',
        key: 'engine'
    },
    fuel : {
        title: '燃料',
        key: 'fuel'
    },
    exhaust : {
        title: '排放',
        key: 'exhaust'
    },
    gearbox : {
        title: '变速箱',
        key: 'gearbox'
    },
    license : {
        title: '是否上牌',
        key: 'license'
    }
}