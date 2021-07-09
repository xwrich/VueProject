<template>
    <div class="container">
        <div>已完成{{ isComplete }} / 全部{{ list.length }}</div>
        <div v-if="isComplete>0" class="btn">
            <button class="btn-clear" @click="clear">清除已完成</button>
        </div>
    </div>
</template>

<script>
import {computed} from 'vue'

export default {
    name: "NavFooter",
    props: {
        list: {
            type: Array,
            required: true,
        }
    },
    setup(props, context) {
        let isComplete = computed(() => {
            //过滤已经完成的任务
            let arr = props.list.filter((item) => {
                return item.complete
            })
            return arr.length
        })
        //清除已完成的任务
        let clear = () => {
            //过滤未完成的
            let arr = props.list.filter((item) => {
                return item.complete === false;
            })
            context.emit("clear", arr)
        }
        return {isComplete, clear}
    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    align-items: center;
    height: 35px;
    margin-top: 15px;

    .btn {
        margin-left: 10px;
        color: #000;
        height: 25px;

    }
    .btn-clear{
        line-height: 25px;
        text-align: center;
    }
}
</style>