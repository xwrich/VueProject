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
            <div class="cart">
                <el-table
                    v-if="cart.length"
                    ref="multipleTable"
                    :data="cart"
                    stripe
                    border
                    tooltip-effect="dark"
                    style="width: 100%"
                    v-model="isAllChecked"
                    @click="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        ref="multipleTable"
                        @click="onCheckChanged"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="text"
                        label="商品"
                        width="350">
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
                            <span>￥&nbsp; {{scope.row.price}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="quantity"
                        label="数量"
                        width="150">
                        <template v-slot="scope">
                            <el-input-number size="mini" style="width: 100px;height: 32px"
                                             v-model="scope.row.quantity" :min="1" :max="10"
                                             @click="toggleQuantity"></el-input-number>
                        </template>
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
                            <el-button class="btn-pay" size="mini" @click="pay(scope.row)">结算</el-button>
                            <el-button class="btn-pay" size="mini" type="danger" @click="deleteOneProduct()">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="noGoods" v-else>
                    购物车还没有商品喔~快去购物吧
                </div>
                <div class="toPay" v-if="cart.length">
<!--                    <el-button style="width: 100px;float: left" @click="deleteMany" type="danger" plain class="btn-delete">批量删除</el-button>-->
                    <span>￥&nbsp;{{ getTotalPrice() }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button style="width: 80px" type="success" plain @click="payAll()">结&nbsp;&nbsp;算</el-button>
                </div>
            </div>
            <el-footer style="height: 30px;position: fixed;height: 30px;bottom: 0;width: 100%;">购物商城，版权所有：OriginalCoder | 2021-06-2</el-footer>
        </el-container>
    </div>
</template>

<script>
import router from "@/router";

export default {
name: "Cart",
    data(){
        return{
            //是否全选
            isAllChecked: false,
            //所选商品存入数组
            checkedArray: [],
            //购物车
            cart: [],
            //订单
            order: []
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.getStore()
            this.setCheckedArray()
        })
    },
    computed:{
        //计算总价
        // getTotalPrice() {
        //     let sumPrice = 0
        //     let balance = this.cart.filter((item,index) =>this.checkedArray[index])
        //     if(this.checkedArray){
        //         sumPrice = balance.reduce((sum, item) => sum + item.price * item.quantity, 0)
        //     }
        //     return sumPrice.toFixed(2);
        // },
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
        getTotalPrice() {
            let sumPrice = 0
            let balance = this.cart.filter((item,index) =>this.checkedArray[index])
            if(this.checkedArray){
                sumPrice = balance.reduce((sum, item) => sum + item.price * item.quantity, 0)
            }
            return sumPrice.toFixed(2);
        },
        // // //计算总价
        // getTotalPrice() {
        //     let balance = this.cart.filter((item,index) =>this.checkedArray[index])
        //     if(this.checkedArray){
        //         let total = balance.reduce((sum, item) => sum + item.price * item.quantity, 0)
        //         return total.toFixed(2)
        //     }
        // },

        //全选或者反选
        onCheckChanged() {
            this.checkedArray.every(item => item) && (this.isAllChecked = true)
            this.checkedArray.some(item => !item) && (this.isAllChecked = false)
        },
        //全选
        handleSelectionChange() {
            this.checkedArray.fill(this.isAllChecked);
        },
        //更改商品数量
        toggleQuantity() {
            // if (this.quantity == 1){
            //     this.$message('商品数量最低为1！');
            // } else if(this.quantity <= 10) {
            //     this.$message('商品数量最高为10！');
            // }
            this.setStore()
        },
        // 删除单条购物车记录
        deleteOneProduct(index) {
            this.$confirm('该操作将删除此次结算, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (this.cart.splice(index, 1)) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                        center: true
                    });
                }
                // this.checkedArray.splice(index, 1);
                this.setStore();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                    center: true
                });
            });
        },
        //选中商品进行结算
        pay(item, index) {
            this.$message('已成功结算！')
            this.cart.splice(index, 1)
            // this.isAllChecked.splice(index, 1)
            this.order.push(item);
            this.setStore()
        },
        //选中全部商品进行结算
        payAll() {
            let inCart = []
            this.checkedArray.forEach((item, index) => {
                item
                    ? this.order.push(this.cart[index])
                    : inCart.push(this.cart[index])
            })
            this.cart = inCart;
            // console.log(this.cart);
            this.setCheckedArray();
            // console.log(this.setCheckedArray());
            this.setStore();
        }
    }
}
</script>

<style scoped>
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
.el-button--small{
    width: 55px;
    z-index: 10;
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
.cart{
    margin-top: 75px;
    width: 1120px;
    margin-left: auto;
    margin-right: auto;
}
.cell{
    width: 40px;
}
.btn-pay{
    width: 60px;
}
.noGoods{
    text-align: center;
    color: #555;
    line-height: 80px;
    font-size: 24px;
}
.toPay{
    border-top: 1px solid #ebeef5;
    padding: 15px 5px;
    overflow: hidden;
    text-align: right;
    color: #777;
}
</style>