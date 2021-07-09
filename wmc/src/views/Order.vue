<template>
    <div class="order">
        <!-- 顶部导航栏-->
        <el-header style="height: 40px">
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
        <!-- 订单详情页 -->
        <div class="content">
            <table class="table-goods" v-if="order.length">
                <colgroup>
                    <col name="col01" width="480">
                    <col name="col02" width="160">
                    <col name="col03" width="120">
                    <col name="col04" width="160">
                    <col name="col05" width="200">
                </colgroup>
                <thead>
                <tr>
                    <th class="col01">商品</th>
                    <th class="col02">单价</th>
                    <th class="col03">数量</th>
                    <th class="col04">金额</th>
                    <th class="col05">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="(item, index) in order"
                    :key="index">
                    <td class="col01 one-line" :title="item.text">
                        <img class="thumbnail-goods" :src="item.cover">&nbsp;
                        {{ item.text }}
                    </td>
                    <td class="col02">￥{{ item.price }}</td>
                    <td class="col03">{{ item.quantity }}</td>
                    <td class="col04">￥{{ (item.price * item.quantity).toFixed(2) }}</td>
                    <td class="col05">
                        <span class="btn-text" @click="drop(index)">退款</span>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="placeholder" v-else>当前暂无订单！快去下单吧~~</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Order',
    data () {
        return {
            order: [],
            cart: []
        }
    },
    mounted () {
        this.$nextTick(function () {
            this.getStore()
        })
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
        setStore () {
            let gsStore = {
                cart: this.cart,
                order: this.order
            }
            window.localStorage.setItem('gsStore', JSON.stringify(gsStore))
        },
        //删除
        drop (index) {
            this.$confirm('此操作为退款, 是否确定?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '退款成功!'
                });
                this.order.splice(index, 1);
                this.setStore()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消退款'
                });
            });
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
.table-goods>tbody>tr {
    transition: background-color 200ms linear;
    border-top: 1px solid #ebeef5;
}
.table-goods>tbody>tr:last-child {
    border-bottom: 1px solid #ebeef5;
}
.table-goods>tbody>tr:hover {
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
.thumbnail-goods {
    width: 100px;
    vertical-align: middle;
}
.btn-text {
    color: #409eff;
    font-size: 14px;
    cursor: pointer;
}
.placeholder {
    text-align: center;
    margin-top:65px;
    color: #555;
    line-height: 80px;
    font-size: 24px;
}
</style>
