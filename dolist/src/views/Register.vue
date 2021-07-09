<template>
    <div class="regForm">
        <h2>注册</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon>
            <el-form-item prop="username">
                <el-input type="text" placeholder="请输入用户名" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="nickname">
                <el-input type="text" placeholder="请输入昵称" v-model="ruleForm.nickname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleReg('ruleForm')">注册</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <a @click="handleToLogin">点我去登录</a>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {post} from '../utils/require.js'

export default {
    name: 'Register',
    components: {},
    data(){
        return{
            ruleForm: {
                username: '',
                password: '',
                nickname: ''
            },
            rules:{
                username: [
                    {required: true, message: '请输入账号', trigger: 'blur'},
                    {min:4,max:18,message:'长度在4-18个字符',trigger: 'blur'}],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min:3,max:18,message: '长度在3-18个字符',trigger: 'blur'}
                ],
                nickname: [
                    {required: true, message: '请输入昵称', trigger: 'blur'},
                    {min:3,max:18,message: '长度在3-18个字符',trigger: 'blur'}
                ],
            }
        }
    },
    methods:{
        async handleReg() {
            let {username,password,nickname} = this.ruleForm;
            const response = await post('/api/v1/auth/reg', {
                userName: username,
                password: password,
                nickName: nickname
            })
            // console.log(response);
            if(response.code === "success") {
                sessionStorage.setItem('username',username);
                this.$message({
                    message:'注册成功！',
                    type: 'success',
                    showClose: true,
                    center: true,
                })
                await this.$router.push('/')
            } else {
                // console.log(response);
                this.$message({
                    message: '注册失败！' + `${response.message}`,
                    type: 'warning',
                    center: true
                });
            }
        },
        resetForm(ruleForm) {
            this.$refs[ruleForm].resetFields();
        },
        handleToLogin() {
            this.$router.push('/')
        }
    }
}
</script>

<style>
.regForm{
    width: 350px;
    box-shadow: 0 6px 20px 5px rgba(40, 120, 255, 0.1), 0 16px 24px 2px rgba(0, 0, 0, 0.05);
    background: #fff;
    padding: 20px;
    margin: 12% auto;
    text-align: center;
    border-radius: 20px;
}
.regForm h2{
    color: #1c8adb;
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: bold;
}
.regForm a{
    margin-left: 70%;
    font-size: 13px;
}
.regForm a:hover{
    color: #ff8e5c;
}
</style>