<template>
    <div class="sign-up-form">
        <h1>Login Now</h1>
        <form :rules="loginRules">
            <input class="input-box" placeholder="Your Username" v-model="formData.username"  autocomplete="off">
            <input type="password" class="input-box" placeholder="Your Password" v-model="formData.password"
                   @keydown.enter="handleLogin"  autocomplete="off">
            <button type="button" class="login-btn" @click="handleLogin">Login</button>
            <hr>
            <p class="or">OR</p>
            <button type="button" class="mobile-btn">Login with MobilePhone</button>
            <p style="margin-top: 10px">Do you have an account? <a @click="handleReg">Sign up now</a></p>
        </form>
    </div>
</template>

<script>
//封装对象
import {reactive} from 'vue'
import {post} from '../utils/require.js'
import {useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'

export default {
    name: 'Login',
    components: {},
    setup() {
        let router = useRouter()
        let loginRules = reactive({
            username: [{required: true, message: '请输入账号', trigger: 'blur'}],
            password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        })
        let formData = reactive({username: "", password: ""})
        // const {show,toastMessage,showToast} = useToastEffect()
        // const handleLogin = ()=>{
        // }

        //async/await  是ES7引入的新语法，可以更加方便的进行异步操作
        // async 关键字用于函数上（async函数的返回值是Promise实例对象）
        // await 关键字用户async函数当中（await可以得到异步的结果）
        async function handleLogin() {
            const response = await post('/api/v1/auth/login', {
                userName: formData.username,
                password: formData.password,
            })
            console.log(response);
            if (response.code === "success") {
                sessionStorage.setItem('username',formData.username)
                await router.push('/home')
                localStorage.setItem('isLogin',0)
                ElMessage.success({
                    message: '登录成功！',
                    type: 'success',
                    center: true
                });
            } else {
                console.log(response);
                //模板字符串
                // showToast(`${response.message}登录失败！`)
                ElMessage.warning({
                    message: '登录失败！' + `${response.message}`,
                    type: 'warning',
                    center: true
                });
            }
        }

        function handleReg(){
            router.push('/Register')
        }

        // const handleReg =  () => {
        //     router.push({path:'/Register'})
        // }
        return {handleLogin, handleReg, formData,loginRules}
    },
}
</script>


<style>
/** {*/
/*    margin: 0 auto;*/
/*    padding: 0;*/
/*}*/

/*body {*/
/*    background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);*/
/*}*/

.sign-up-form {
    width: 380px;
    box-shadow: 0 6px 20px 5px rgba(40, 120, 255, 0.1), 0 16px 24px 2px rgba(0, 0, 0, 0.05);
    background: #fff;
    padding: 20px;
    margin: 12% auto;
    text-align: center;
    border-radius: 20px;
}

.sign-up-form h1 {
    color: #1c8adb;
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: bold;
}

.input-box {
    border-radius: 20px;
    padding: 10px;
    margin: 10px 0;
    width: 90%;
    border: 1px solid #999;
    outline: none;
}

button {
    color: #fff;
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    font-size: 15px;
    margin: 10px 0;
    border: none;
    outline: none;
    cursor: pointer;
}

.login-btn {
    background-color: #1c8adb;
}

.mobile-btn {
    background-color: #21afde;
}

a {
    text-decoration: none;
}

hr {
    margin-top: 20px;
    width: 80%;
}

.or {
    background: #fff;
    width: 30px;
    margin: -19px auto 10px;
}
a:hover{
    color: #ff8e5c;
}
</style>