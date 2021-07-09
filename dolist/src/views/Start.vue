<template>
  <div >
    <h1 class="start" @click="handleStart">点击我，开始完成个人清单任务</h1>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'

export default {
    name:'Start',
    setup(){
      //1.创建router对象
      let router = useRouter();
      console.log(router);
      const handleStart = () =>{
          router.push({
              path:'/home'
          })
      }
      return {handleStart
      }
    }
}
</script>

<style>
h1{
    cursor:pointer;
}
.start{
    font-size:50px;
    text-align: center;
    position: relative;
    margin: 200px auto;
}
</style>