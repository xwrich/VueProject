<template>
    <div>
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
<!--                                <a>-->
<!--                                    <el-dropdown>-->
<!--                                        <span class="el-dropdown-link" style="color: #fff;font-size: 14px">用户信息</span>-->
<!--                                        <el-dropdown-menu slot="dropdown">-->
<!--                                            <el-dropdown-item>设置</el-dropdown-item>-->
<!--                                            <el-dropdown-item @click="goBack">退出登录</el-dropdown-item>-->
<!--                                        </el-dropdown-menu>-->
<!--                                    </el-dropdown>-->
<!--                                </a>-->
                            </el-row>
                        </li>
                    </ul>
                </div>
            </div>
        </el-header>
        <!-- 商品详情页 -->
        <div class="container">
            <div class="left">
                <div class="actor">
                    <img :src="imgSwitch">
                    <div
                        ref="animPart"
                        class="anim-part"
                        :class="{'anim-cart': isCart, 'anim-order': isOrder}">
                        <img :src="imgSwitch">
                    </div>
                </div>
            </div>
            <div class="right-line">
                <h2>{{ item.text }}</h2>
                <div class="banner-price">
                    <p class="params-item">
                        <span class="params-label">价格</span>
                        <span class="price-delete">￥{{ item.price }}</span>
                    </p>
                    <p>
                        <span class="params-label">促销价</span>
                        <span class="price-strong">￥{{ item.onlinePrice }}</span>
                    </p>
                </div>
                <div class="banner-params">
                    <p class="params-item"><span class="params-label">发货地</span>{{ item.address }}</p>
                    <p class="params-item"><span class="params-label">快递方式</span>{{ item.type }}</p>
                </div>
                <div class="banner-quantity">
                    <input class="ipt-quantity" v-model="quantity" type="number" min="1" max="10" @keyup="checkQuantity">
                </div>
                <div class="banner-operate">
                    <span class="btn-operate btn-buy" @click="addInOrder">立即购买</span>
                    <span class="btn-operate btn-cart" @click="addInCart">
                        <i class="fa fa-shopping-cart"></i> &nbsp;加入购物车
                    </span>
                </div>
                <br>
                <div class="banner-state">
                    <p class="params-item">
                        <span class="params-label">服务承诺</span>
                        <span class="params-label deep-gray">正品保证</span>
                        <span class="params-label deep-gray">极速退款</span>
                        <span class="params-label deep-gray">赠运费险</span>
                        <span class="params-label deep-gray">七天无理由退换</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Goods',
    data () {
        return {
            actorIndex: 0,
            quantity: 1,
            isCart: false, // 生成动态类名
            isOrder: false, // 生成动态类名
            cart: [],
            order: [],
            commodity: [
                {
                    name: 'nuotai',
                    text: '诺泰暖宫护腰艾灸加热女生必备神器',
                    address: '山东泰安',
                    type: '包邮',
                    price: '536.00',
                    onlinePrice: '208.00',
                    cover: require('../assets/static/goods/nuotai01.jpg'),
                    poster: require('../assets/static/goods/nuotai02.jpg'),
                    color: '#e8e8e8',
                    images: [
                        require('../assets/static/goods/nuotai01.jpg'),
                        require('../assets/static/goods/nuotai02.jpg'),
                        require('../assets/static/goods/nuotai03.jpg'),
                    ],
                },
                {
                    name: 'qixi',
                    text: '七喜柠檬味碳酸饮料整箱330ml*24促销装',
                    address: '上海',
                    type: '满88(20kg内)包邮',
                    price: '48.90',
                    onlinePrice: '43.90',
                    cover: require('../assets/static/goods/qixi01.jpg'),
                    poster: require('../assets/static/goods/qixi02.jpg'),
                    color: '#17b14f',
                    images: [
                        require('../assets/static/goods/qixi01.jpg'),
                        require('../assets/static/goods/qixi02.jpg'),
                        require('../assets/static/goods/qixi03.jpg')
                    ],
                },
                {
                    name: 'bama',
                    text: '八马茶业 铁观音茶叶浓香型赛珍珠1000g',
                    address: '广东深圳',
                    type: '包邮',
                    price: '800.00',
                    onlinePrice: '600.00',
                    cover: require('../assets/static/goods/bama01.jpg'),
                    poster:require('../assets/static/goods/bama01.jpg'),
                    color: '#e8e8e8',
                    images: [
                        require('../assets/static/goods/bama01.jpg'),
                        require('../assets/static/goods/bama02.jpg'),
                        require('../assets/static/goods/bama03.jpg'),
                    ],
                },
                {
                    name: 'Lee',
                    text: 'Lee男装 2021春夏X-LINE白色短袖T恤 秒变男神',
                    address: '上海',
                    type: '包邮',
                    price: '350.00',
                    onlinePrice: '239.00',
                    cover: require('../assets/static/goods/Lee01.jpg'),
                    poster: require('../assets/static/goods/Lee01.jpg'),
                    color: '#96520c',
                    images: [
                        require('../assets/static/goods/Lee01.jpg'),
                        require('../assets/static/goods/Lee02.jpg'),
                        require('../assets/static/goods/Lee03.jpg'),
                    ],
                }
            ]
        }
    },
    mounted () {
        this.$nextTick(function () {
            this.getStore()
            // 监听器作用：当分身动画结束后，去除动画类名
            this.$refs.animPart.addEventListener('animationend', () => {
                this.isCart = false
                this.isOrder = false
            })
        })
    },
    computed: {
        item () {
            return this.commodity.find(item => item.name === this.$route.query.name)
        },
        imgSwitch () {
            return this.item.images[this.actorIndex]
        },
        result () {
            return {
                cover: this.item.cover,
                text: this.item.text,
                type: this.item.type,
                price: this.item.onlinePrice,
                quantity: this.quantity
            }
        }
    },
    methods: {
        getStore () {
            let gsStore = window.localStorage.getItem('gsStore')
            if (gsStore) {
                gsStore = JSON.parse(gsStore)
                this.cart = gsStore.cart || []
                this.order = gsStore.order || []
            }
        },
        setStore () {
            let gsStore = {
                cart: this.cart,
                order: this.order
            }
            window.localStorage.setItem('gsStore', JSON.stringify(gsStore))
        },
        toggleActor (index) {
            this.actorIndex = index
        },
        goBack(){
            sessionStorage.removeItem('username')
            this.$router.push('/Login')
        },
        //商品数量
        checkQuantity () {
            if (this.quantity < 1 || isNaN(this.quantity)) {
                this.quantity = 1
            }
        },
        //添加到购物车
        addInCart () {
            this.isCart = true;
            this.cart.push(this.result);
            this.setStore();
        },
        addInOrder () {
            this.isOrder = true;
            this.order.push(this.result)
            this.setStore();
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



.container {
    margin-top: 100px;
    width: 1120px;
    margin-left: auto;
    margin-right: auto;
    height: 500px;
}
.left {
    padding-top: 50px;
    width: 50%;
    float: left;
}
.actor {
    position: relative;
    text-align: center;
}
.right-line {
    padding-top: 50px;
    overflow: hidden;
}
.banner-price,
.banner-params,
.banner-quantity,
.banner-operate,
.banner-state {
    padding: 5px 12px;
    margin-top: 18px;
}
.banner-price {
    margin-right: 80px;
    color: #333;
    background-color: #e9e9e9;
}
.price-delete {
    text-decoration: line-through;
}
.price-strong {
    font-weight: 600;
    font-size: 24px;
    color: #ff0036;
}
.params-item {
    line-height: 24px;
}
.params-label {
    display: inline-block;
    min-width: 75px;
    color: #999;
    font-size: 12px;
}
.ipt-quantity {
    width: 120px;
    padding-left: 10px;
    line-height: 32px;
    outline: none;
    border: 1px solid #ccc;
}
.btn-operate {
    width: 200px;
    display: inline-block;
    cursor: pointer;
    line-height: 36px;
    text-align: center;
    border: 1px solid #95bf47;
    user-select: none;
}
.btn-cart {
    color: #fff;
    background-color: #95bf47;
}
.btn-buy {
    color: #95bf47;
    background-color: rgba(149, 191, 103, .1);
}
.deep-gray {
    color: #777;
}
.anim-part {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
}
.anim-cart {
    animation-duration: 500ms;
    animation-name: addInCart;
    animation-timing-function: ease-in-out;
}
.anim-order {
    animation-duration: 500ms;
    animation-name: addInOrder;
    animation-timing-function: ease-in-out;
}
@keyframes addInCart {
    0% {
        transform: scale(1);
    }
    100% {
        transform: translateX(680px) translateY(-380px) scale(0.01);
    }
}
@keyframes addInOrder {
    0% {
        transform: scale(1);
    }
    100% {
        transform: translateX(620px) translateY(-380px) scale(0.01);
    }
}
</style>
