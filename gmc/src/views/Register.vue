<template>
    <div class="login-container">
        <el-form
            label-position="left"
            label-width="0px"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm login-page">
            <h3 class="loginTitle" style="align-items: center">Register Now</h3>
            <el-form-item prop="username">
                <el-input type="text" auto-complete="off" placeholder="用户名" v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" auto-complete="off" placeholder="密码" v-model="formData.password"></el-input>
            </el-form-item>
            <el-form-item prop="nickname">
                <el-input type="text" auto-complete="off" placeholder="昵称" v-model="formData.nickname"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width: 45%;float: left;" @click="handleRegister" >注册</el-button>
                <el-button type="primary" style="width: 45%;float: right" @click="handleToLogin">去登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {reactive} from 'vue'
import {useRouter} from "vue-router";
import {post} from "@/utils/require.js";
import {ElMessage} from "element-plus";


export default {
    name: 'Register',
    data(){
        return{
            ruleForm: {
                username:'',
                password:'',
                nickname:''
            },
        }
    },
    setup() {
        let router = useRouter()
        let loginRules = reactive({
            username: [{required: true, message: '请输入账号', trigger: 'blur'}],
            password: [{required: true, message: '请输入密码', trigger: 'blur'}],
            nickname: [{required: true, message: '请输入昵称', trigger: 'blur'}],
        })
        let formData = reactive({username: "", password: "", nickname: ""})

        //异步注册
        async function handleRegister() {
            const response = await post('/api/v1/auth/reg', {
                userName: formData.username,
                password: formData.password,
                nickName: formData.nickname,
            })
            console.log(response);
            if (response.code === "success") {
                await router.push('/')
                ElMessage.success({
                    message: '注册成功！',
                    type: 'success'
                });
            } else {
                console.log(response);
                //模板字符串
                ElMessage.warning({
                    message: '注册失败！' + `${response.message}`,
                    type: 'warning'
                });
            }
        }
        function handleToLogin(){
            router.back()
        }

        return { loginRules,formData, handleRegister,handleToLogin}
    }
}

</script>

<style>
* {
    margin: 0;
    padding: 0;
}

.login-container {
    width: 100%;
    height: 100%;
    /*background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);*/
}

.login-page {
    -webkit-border-radius: 20px;
    border-radius: 20px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 6px 20px 5px rgba(40, 120, 255, 0.1), 0 16px 24px 2px rgba(0, 0, 0, 0.05);
}

label.el-checkbox.remember {
    margin: 0px 0px 15px;
    text-align: left;
}

.toLogin {
    line-height: 30px;
    height: 30px;
}

.loginTitle {
    color: #409EFF;
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
}
</style>