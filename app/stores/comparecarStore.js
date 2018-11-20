export default {
    namespaced: true,
    state: {
        //对比栏de车辆
        arr: []
    },
    mutations: {
        addCar(state, {carinfo}){
            state.arr.push(carinfo);
        },
        delCar(state, {id}){
            state.arr = state.arr.filter(item => item.id != id);
        }
    }
}