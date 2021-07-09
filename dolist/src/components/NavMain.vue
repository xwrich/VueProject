<template>
    <div v-if="list.length > 0">
        <div v-for="(item, index) in list" :key="index">
            <div class="item">
                <input type="checkbox" v-model="item.complete"/>
                {{ item.title }}
                <button class="del" @click="del(index)">删除</button>
            </div>
        </div>
    </div>
    <div v-else>暂无任务！！</div>
</template>
<script>
export default {
    name: "NavMain",
    props: {
        list: {
            type: Array,
            required: true,
        },
    },
    setup(props, context) {
        //删除任务
        let del = (index) => {
            context.emit("del", index);
        };
        return {del}
    },
};
</script>

<style lang="scss" scoped>
.item {
    height: 35px;
    line-height: 35px;
    position: relative;
    width: 200px;
    cursor: pointer;

    button {
        position: absolute;
        width: 60px;
        right: 0px;
        top: 0px;
        height: 35px;
        display: none;
        z-index: 99;
        color: #000;
        text-align: center;
    }

    &:hover {
        background: #ddd;

        button {
            display: block;
            line-height: 16px;
        }
    }
}
</style>