<template>
    <div class="home">
        <h1 @click="handleDetail">个人清单任务简介</h1>
        <NavHeader @addValue="handleAddValue"></NavHeader>
        <nav-main :list="list" @del="handleDel"></nav-main>
        <nav-footer :list="list" @clear="handleClear"></nav-footer>
    </div>
</template>

<script>
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, ref} from "vue";
import NavHeader from "../components/NavHeader.vue";
import NavMain from "../components/NavMain.vue";
import NavFooter from "../components/NavFooter.vue";
export default {
    name: "Home",
    components: {NavHeader, NavMain, NavFooter},
    setup() {
        let store = useStore();
        let list = computed(() => {
            return store.state.list;
        });
        //1.定义一个数据对象用于接收子组件传递过来的数据
        let receiveValue = ref("");
        const handleAddValue = (val) => {
            receiveValue.value = val;
            //// 2.判断任务是否存在
            let flag = true;
            list.value.map((item) => {
                if (item.title === receiveValue.value) {
                    flag = false;
                    alert("此任务已经存在！！");
                }
            });
            if (flag) {
                store.commit("addTask", {
                    title: receiveValue.value,
                    complete: false,
                });
            }
        };
        //删除任务
        let handleDel = (index) => {
            store.commit("deleteTask", index);
        };
        //清除已完成的任务
        let handleClear = (arr) => {
            store.commit("clearTask", arr);
        };
        //实现路由跳转
        let router = useRouter();

        function handleDetail() {
            router.push("/detail");
        }

        return {list, handleDetail, handleAddValue, handleDel, handleClear};
    },
};
</script>

<style>
.home {
    width: 800px;
    height: 800px;
    margin: 30px auto;
}
</style>