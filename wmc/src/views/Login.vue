<template>
    <div class="loginForm">
        <h2>叮咚买菜系统平台</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon>
            <el-form-item prop="username">
                <el-input type="text" placeholder="请输入用户名" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin('ruleForm')">登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            <a @click="handleToReg">点我去注册</a>
        </el-form>
    </div>
</template>

<script>
//封装对象
// import {reactive} from 'vue'
import {post} from '../utils/require.js'
// import router from "@/router";
// import {useRouter} from 'vue-router'

export default {
    name: 'Login',
    components: {},
    data(){
        return{
            ruleForm: {
                username: '',
                password: ''
            },
            rules:{
                username: [
                    {required: true, message: '请输入账号', trigger: 'blur'},
                    {min:4,max:18,message:'长度在4-18个字符',trigger: 'blur'}],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min:3,max:18,message: '长度在3-18个字符',trigger: 'blur'}
                ],
            }
        }
    },
    methods:{
        async handleLogin() {
            let {username,password} = this.ruleForm;
            const response = await post('/api/v1/auth/login', {
                userName: username,
                password: password
            })
            console.log(response);
            if(response.code === "success") {
                sessionStorage.setItem('username',username);
                this.$message({
                    message:'登录成功！',
                    type: 'success',
                    showClose: true,
                    center: true,
                })
                await this.$router.push('/Home')
            } else {
                console.log(response);
                this.$message({
                    message: '登录失败！' + `${response.message}`,
                    type: 'warning',
                    center: true
                });
            }
        },
        resetForm(ruleForm) {
            this.$refs[ruleForm].resetFields();
        },
        handleToReg() {
            this.$router.push('/Register')
        }

    },


        //async/await  是ES7引入的新语法，可以更加方便的进行异步操作
        // async 关键字用于函数上（async函数的返回值是Promise实例对象）
        // await 关键字用户async函数当中（await可以得到异步的结果）


        // function handleReg(){
        //     router.push('/Register')
        // }

        // const handleReg =  () => {
        //     router.push({path:'/Register'})
        // }
}
</script>


<style>
.loginForm{
    width: 350px;
    box-shadow: 0 6px 20px 5px rgba(40, 120, 255, 0.1), 0 16px 24px 2px rgba(0, 0, 0, 0.05);
    background: #fff;
    padding: 20px;
    margin: 12% auto;
    text-align: center;
    border-radius: 20px;
}
.loginForm h2{
    color: #1c8adb;
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: bold;
}
.loginForm a{
    margin-left: 70%;
    font-size: 13px;
}
.loginForm a:hover{
    color: #ff8e5c;
}
</style>