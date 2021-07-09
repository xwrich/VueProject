import { createStore } from 'vuex'

export default createStore({
    state: {
        list: [{
            title: "吃饭",
            complete: false
        }, {
            title: "睡觉",
            complete: false,
        }, {
            title: "打豆豆",
            complete: true
        }]
    },
    mutations: {
        //添加任务
        addTask(state, payload) {
            state.list.push(payload)
        },
        //删除任务
        deleteTask(state, payload) {
            state.list.splice(payload, 1)
        },
        //清除已经完成的任务
        clearTask(state, payload) {
            //把过滤之后的数组传进来
            state.list = payload
        }
    },
    actions: {},
    modules: {}
})