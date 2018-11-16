export default {
    namespaced: true,
    state: {
        columnName: "",
        columnName2nd: ""
    },
    mutations: {
        changeColumnName(state, {name}){
            state.columnName = name;
        },
        changeColumnName2nd(state, {name}){
            state.columnName2nd = name;
        }
    }
}