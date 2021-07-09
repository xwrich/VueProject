<template>
    <div class="home">
        <el-container>
            <el-header style="height: 40px;margin-bottom: 40px">
                <div class="menu">
                    <div class="leftMenu">
                        <ul>
                            <el-row>
                                <li><a>湖北</a></li>
                                <li><a @click="handleToHome">首页</a></li>
                            </el-row>
                        </ul>
                    </div>
                    <div class="rightMenu">
                        <ul>
                            <li>
                                <a >你好，欢迎访问叮咚买菜</a>
                                <a @click="handleToReg">免费注册</a>
                                <a @click="handleToOrder">我的订单</a>
                                <a @click="handleToCart">购物车</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-header>
            <div class="order">
                <el-table
                    v-if="order.length"
                    ref="multipleTable"
                    :data="order"
                    stripe
                    border
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                        type="index"
                        prop="index"
                        label="编号"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="text"
                        label="商品"
                        width="400">
                    </el-table-column>
                    <el-table-column
                        prop="cover"
                        label="封面"
                        width="100">
                        <template v-slot="scope">
                            <img :src="scope.row.cover" style="width: 60px;width: 60px"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        label="单价"
                        width="100">
                        <template v-slot="scope">
                            <span>￥&nbsp;{{scope.row.price}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="quantity"
                        label="数量"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="总价"
                        width="120">
                        <template v-slot="scope">
                            <span>￥&nbsp;{{ (scope.row.quantity*scope.row.price).toFixed(2) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="操作">
                        <template v-slot="scope">
                            <el-button class="btn-pay" size="mini" style="width: 60px" @click="refund(scope.index)">退款</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="noGoods" v-else>
                    您还没有订单记录喔~~
                </div>
            </div>
            <el-footer style="height: 30px;position: fixed;height: 30px;bottom: 0;width: 100%;">购物商城，版权所有：OriginalCoder | 2021-06-2</el-footer>
        </el-container>
    </div>
</template>

<script>
import router from "@/router";

export default {
name: "Order",
    data(){
        return {
            cart:[],
            order:[],
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.getStore()
            this.setCheckedArray()
        })
    },
    methods:{
        getStore() {
            let gsStore = window.localStorage.getItem('gsStore')
            let cart = []
            let order = []
            if(gsStore){
                gsStore = JSON.parse(gsStore)
                gsStore.cart.map(item=>{
                    if(item){
                        cart.push(item)
                    }
                })
                gsStore.order.map(item=>{
                    if(item){
                        order.push(item)
                    }
                })
            }
            this.cart = cart
            this.order = order
        },
        setStore() {
            let gsStore = {
                cart: this.cart,
                order: this.order
            }
            window.localStorage.setItem('gsStore', JSON.stringify(gsStore))
        },
        setCheckedArray() {
            this.checkedArray = this.cart.map(() => false)
        },
        //首页
        handleToHome () {
            router.push('/home')
        },
        //注册
        handleToReg () {
            router.push('/register')
        },
        //去购物车
        handleToCart () {
            router.push('/cart')
        },
        //去我的订单
        handleToOrder () {
            router.push('/order')
        },
        //退款
        refund(index){
            this.$confirm('此操作为退款, 是否确定?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '退款成功!',
                    center: true
                });
                this.order.splice(index, 1);
                this.setStore()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消退款',
                    center: true
                });
            });
        }
    }
}
</script>

<style>
.el-container {
    margin: 0px;
    padding: 0px;
    height: 100%;
}
.el-header {
    background-color: #b3c0d1;
    color: #333;
    text-align: left;
    line-height: 40px;
    font-size: 26px;
}
.el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 30px;
}
.el-main {
    background-color: #fff;
    color: #333;
}


/*头部导航栏菜单*/
.menu {
    font-size: 15px;
    color: #999;
    width: 1150px;
    margin: 0 auto;
}

.menu a {
    display: inline-block;
    margin-right: 20px;
    padding: 0 10px;
    height: 40px;
    color: #fff;

}

.leftMenu {
    float: left;
}

.rightMenu {
    float: right;
    position: relative;
    right: 100px;
    display: flex;
}

ul li a:hover {
    color: #ff8e5c;
}

/*购物车详情*/
.order{
    margin-top: 10px;
    width: 1120px;
    /*margin: 5px auto 30px auto;*/
    /*z-index: 10;*/
    margin-left: auto;
    margin-right: auto;
    /*margin-bottom: 20px;*/
}
.noGoods{
    text-align: center;
    color: #555;
    line-height: 80px;
    font-size: 24px;
}
</style>