<template>
    <div>
        <input
            placeholder="请输入任务名称"
            v-model="inputValue"
            @keydown.enter="handleEnter"
        />
    </div>
</template>

<script>
import {ref} from "vue";

export default {
    name: "NavHeader",
    setup(props, context) {
        let inputValue = ref("");
        const handleEnter = () => {
            context.emit("addValue", inputValue.value);
        };
        return {inputValue, handleEnter};
    },
};
</script>

<style>
input {
    margin-bottom: 30px;
}
</style>