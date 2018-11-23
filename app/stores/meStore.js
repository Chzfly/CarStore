export default {
    namespaced: true,
    state: {
        username: '',
        name: '',
        tel: '',
        type: '',
        department: '',
        avatar: ''
    },
    mutations: {
        changeInfo(state, {username, name, tel, type, department, avatar}){
            state.username = username;
            state.name = name;
            state.tel = tel;
            state.type = type;
            state.department = department;
            state.avatar = avatar;
            console.log(username)
        }
    }
}