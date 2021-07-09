<template>
    <div class="cart">
        <!-- 顶部导航栏-->
        <el-header style="height: 40px;background-color: #B3C0EE;">
            <div class="menu">
                <div class="leftMenu">
                    <ul>
                        <el-row style="display: flex">
                            <li><a>中国大陆</a></li>
                            <li><a @click="handleToHome">首页</a></li>
                        </el-row>
                    </ul>
                </div>
                <div class="rightMenu">
                    <ul>
                        <li>
                            <el-row>
                                <a >你好，欢迎访问叮咚买菜</a>
                                <a @click="handleToReg">免费注册</a>
                                <a @click="handleToOrder">我的订单</a>
                                <a @click="handleToCart">购物车</a>
                                <a>用户信息</a>
                            </el-row>
                        </li>
                    </ul>
                </div>
            </div>
        </el-header>
        <!-- 购物车-->
        <div class="content">
            <table class="table-goods" v-if="cart.length">
                <colgroup>
                    <col name="col01" width="480">
                    <col name="col02" width="160">
                    <col name="col03" width="120">
                    <col name="col04" width="160">
                    <col name="col05" width="200">
                </colgroup>
                <thead>
                <tr>
                    <th class="col01">
                        <el-checkbox v-model="isAllChecked" @change="onAllCheckChanged"></el-checkbox>商品
                    </th>
                    <th class="col02">单价</th>
                    <th class="col03">数量</th>
                    <th class="col04">金额</th>
                    <th class="col05">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in cart" :key="index">
                    <td class="col01 one-line" :title="item.text">
                        <el-checkbox  v-model="checkedArray[index]" @change="onCheckChanged" style="margin-right: 20px"></el-checkbox>
                        <img class="thumbnail-goods" :src="item.cover">&nbsp; {{ item.text }}
                    </td>
                    <td class="col02">￥{{ item.price }}</td>
                    <td class="col03">
                        <input class="ipt-quantity"  type="number" v-model="item.quantity" @change="toggleQuantity" min="1"
                               max="10">
                    </td>
                    <td class="col04">￥{{ (item.price * item.quantity).toFixed(2) }}</td>
                    <td class="col05">
                        <el-button type="danger" plain @click="deleteOneProduct">删除</el-button>
                        <el-button type="primary" plain @click="pay(item,index)">结算</el-button>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="placeholder" v-else>购物车里还没有东西哦！快去添加吧~~</div>
            <div class="banner-pay" v-if="cart.length">
<!--                <el-button @click="deleteMany" type="danger" plain class="btn-delete">批量删除</el-button>-->
                <span>￥&nbsp;{{ getTotalPrice() }}</span>&nbsp;&nbsp;&nbsp;&nbsp;<el-button type="success" plain @click="payAll">结&nbsp;&nbsp;算</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Cart',
    data() {
        return {
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
    computed: {

    },
    methods: {
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
        // //计算总价
        getTotalPrice() {
            let balance = this.cart.filter((item,index) =>this.checkedArray[index])
            if(this.checkedArray){
                let total = balance.reduce((sum, item) => sum + item.price * item.quantity, 0)
                return total.toFixed(2)
            }
        },
        //全选或者反选
        onCheckChanged() {
            this.checkedArray.every(item => item) && (this.isAllChecked = true)
            this.checkedArray.some(item => !item) && (this.isAllChecked = false)
        },
        //全选
        onAllCheckChanged() {
            this.checkedArray.fill(this.isAllChecked);
        },
        //更改商品数量
        toggleQuantity() {
            if (this.quantity == 1){
                this.$message('商品数量最低为1！');
            } else if(this.quantity <= 10) {
                this.$message('商品数量最高为10！');
            }
            this.setStore()
        },
        //批量删除
        // deleteMany() {
        //     this.cart = this.cart.filter(function (item) {
        //         return !item.select
        //     })
        // },
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
                        message: '删除成功!'
                    });
                }
                // this.checkedArray.splice(index, 1);
                this.setStore();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //选中商品进行结算
        pay(item, index) {
            this.cart.splice(index, 1)
            // this.isAllChecked.splice(index, 1)
            this.order.push(item);
            this.setStore();
            this.$message('结算成功！')
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
            if(this.isAllChecked) {
                this.$message('结算成功！')
            }
        },
        //首页
        handleToHome(){
            this.$router.push('/Home')
        },
        //注册
        handleToReg(){
            this.$router.push('/Register')
        },
        //订单
        handleToOrder(){
            this.$router.push('/Order')
        },
        //购物车
        handleToCart(){
            this.$router.push('/Cart')
        },
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
    margin-left: 100px;
}
.rightMenu {
    float: right;
    margin-right: -110px;
}
ul li a:hover {
    color: #ff8e5c;
}
.menu {
    float: left;
}


/*购物车*/
.content {
    margin-top: 75px;
    width: 1120px;
    margin-left: auto;
    margin-right: auto;
}

.one-line {
    word-break: break-all;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.table-goods {
    width: 100%;
    margin-top: 15px;
    color: #555;
    table-layout: fixed;
    border-collapse: collapse;
    user-select: none;
    cursor: default;
}
.table-goods > tbody > tr {
    transition: background-color 200ms linear;
    border-top: 1px solid #ebeef5;
}

.table-goods > tbody > tr:hover {
    background-color: rgba(149, 191, 103, .1);
}

.table-goods th,
.table-goods td {
    text-align: left;
    font-size: 16px;
    padding-left: 12px;
}
.table-goods th {
    line-height: 52px;
}
.table-goods td {
    line-height: 120px;
}
.ipt-quantity {
    width: 60px;
    padding-left: 10px;
    line-height: 32px;
    outline: none;
    border: 1px solid #ccc;
}
.thumbnail-goods {
    width: 100px;
    vertical-align: middle;
}
.banner-pay {
    border-top: 1px solid #ebeef5;
    padding: 15px 5px;
    overflow: hidden;
    text-align: right;
    color: #777;
}
.placeholder {
    text-align: center;
    margin-top: 65px;
    color: #555;
    line-height: 80px;
    font-size: 24px;
}
</style>
