<template>
  <div class="about">
    <h2>
      <a href="https://v3.cn.vuejs.org/guide/introduction.html" target="_blank"
        >点我访问Vue3官方文档</a
      >
    </h2>
    <h2 @click="handleBack">点我返回到上一页</h2>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "Detail",
  setup() {
    let router = useRouter();
    const handleBack = () => {
      router.back(); 
    };
    return { handleBack };
  },
};
</script>

<style>
h2 {
  cursor: pointer;
  font-size: 50px;
  text-align: center;
  position: relative;
  margin: 100px auto;
}
</style>