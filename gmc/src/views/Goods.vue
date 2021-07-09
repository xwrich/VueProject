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
                                <a>你好，欢迎访问叮咚买菜</a>
                                <a @click="handleToReg">免费注册</a>
                                <a @click="handleToOrder">我的订单</a>
                                <a @click="handleToCart">购物车</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-header>
            <div class="goodsList">
<!--                <div class="header w">-->
<!--                    &lt;!&ndash; search搜索模块 &ndash;&gt;-->
<!--                    <div class="search">-->
<!--                        <el-input type="search" name="" id="" placeholder="鲜花、向日葵"></el-input>-->
<!--                        <button>搜索</button>-->
<!--                    </div>-->
<!--                    <div class="hotWord">-->
<!--                        <a href="#" class="style_red">特价促销</a>-->
<!--                        <a href="#">限时抢购</a>-->
<!--                        <a href="#">猜你喜欢</a>-->
<!--                        <a href="#">美满99减30</a>-->
<!--                        <a href="#">新品尝鲜</a>-->
<!--                        <a href="#">叮卡优惠</a>-->
<!--                        <a href="#">平价菜场</a>-->
<!--                    </div>-->
<!--                </div>-->
                <!-- 商品详情页 -->
                <div class="container">
                    <div class="left">
                        <div class="actor">
                            <div
                                ref="animPart"
                                class="anim-part"
                                :class="{'anim-cart': isCart, 'anim-order': isOrder}">
                                <img :src="actorC">
                            </div>
                        </div>
                    </div>
                    <div class="right-line">
                        <div class="goodsText">{{ item.text }}</div>
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
                            <el-input-number size="mini" style="width: 100px;height: 32px"
                                             v-model="quantity" :min="1" :max="10"
                                             @keyup="checkQuantity">
                            </el-input-number>
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
            <el-footer style="height: 30px;position: fixed;height: 30px;bottom: 0;width: 100%;">购物商城，版权所有：OriginalCoder | 2021-06-2</el-footer>
        </el-container>
    </div>
</template>

<script>
import router from "@/router";
import { ElMessage } from 'element-plus'

export default {
name: "Goods",
    data(){
        return{
            actorIndex: 0,
            quantity: 1,
            isCart: false, // 生成动态类名
            isOrder: false, // 生成动态类名
            order:[],
            cart:[],
            goodsList: [
                {
                    id:1,
                    name: 'Vegetables',
                    text: '旭耕 3/5斤有机蔬菜新鲜实惠套餐 南京国环有机认证供港蔬菜 瓜果蔬菜套餐 3斤 自选菜品',
                    address: '山东泰安',
                    type: '包邮',
                    price: '236.00',
                    discount:'满200减30',
                    onlinePrice: '208.00',
                    cover: require('../assets/static/goods/1.jpg'),
                    color: '#e8e8e8',
                    hot:'爆卖10万件',
                    images: [
                        require('../assets/static/goods/1.jpg'),
                        require('../assets/static/goods/2.jpg'),
                    ],
                },
                {
                    id:2,
                    name: 'tomato',
                    text: '当季圣女果 水果小黄瓜新鲜蔬菜一整箱5斤农家小番茄孕妇水果现摘 5斤装【小黄瓜+圣女果】清新搭配',
                    address: '山东泰安',
                    type: '包邮',
                    price: '158.00',
                    discount:'满100减20',
                    onlinePrice: '108.00',
                    cover: require('../assets/static/goods/3.jpg'),
                    color: '#e8e8e8',
                    hot:'爆卖3.9万件',
                    images: [
                        require('../assets/static/goods/3.jpg'),
                        require('../assets/static/goods/4.jpg'),
                    ],
                },
                {
                    id:3,
                    name: 'fish',
                    text: '三人港 冷冻巴沙鱼柳5斤越南生鲜鱼肉片无骨鱼 肉酸菜鱼 2500g',
                    address: '山东 青岛',
                    type: '包邮',
                    price: '89.00',
                    discount:'满399减30',
                    onlinePrice: '69.00',
                    cover: require('../assets/static/goods/6.jpg'),
                    color: '#e8e8e8',
                    hot:'爆卖10万件',
                    images: [
                        require('../assets/static/goods/6.jpg'),
                        require('../assets/static/goods/7.jpg'),
                    ],
                },
                {
                    id:4,
                    name: 'flower',
                    text: '京东鲜花 设计师款混搭花束生日礼物',
                    address: '广东 广州',
                    type: '包邮',
                    price: '158.00',
                    discount:'满289减39',
                    onlinePrice: '128.00',
                    cover: require('../assets/static/goods/8.jpg'),
                    color: '#e8e8e8',
                    hot:'爆卖10万件',
                    images: [
                        require('../assets/static/goods/8.jpg'),
                        require('../assets/static/goods/9.jpg'),
                    ],
                },

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
            return this.goodsList.find(item => item.name === this.$route.query.name)
        },
        actorC () {
            return this.item.images[this.actorIndex]
        },
        result () {
            return {
                id:this.item.id,
                cover: this.item.cover,
                text: this.item.text,
                type: this.item.type,
                price: this.item.onlinePrice,
                quantity: this.quantity
            }
        }
    },
    methods:{
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
        //首页
        handleToHome () {
            router.push('/home')
        },
        //注册
        handleToReg () {
            router.push('/register')
        },
        //购物车
        handleToCart () {
            router.push('/cart')
        },
        //我的订单
        handleToOrder () {
            router.push('/order')
        },
        //商品数量
        checkQuantity () {
            if (this.quantity < 1 || isNaN(this.quantity)) {
                this.quantity = 1
            }
            return this.quantity;
        },
        //购物车
        addInCart () {
            this.isCart = true;
            this.cart.push(this.result);
            this.setStore();
            ElMessage.success({
                message: '添加购物车成功！快去购物车看看吧~~ ',
                type: 'success',
                center: true
            });
        },
        //购买
        addInOrder () {
            this.isOrder = true;
            this.order.push(this.result)
            this.setStore();
            ElMessage.success({
                message: '购买成功！快去订单看看吧~~ ',
                type: 'success',
                center: true
            });
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

/*搜索区域*/
#header .middleLeft img {
    float: left;
}
#header .middleRight img {
    right: 205px;
    position: absolute;
    top: 60px;
    float: right;
}
.mainLeft {
    float: left;
    margin-left: 100px;

}
.mainRight {
    margin-left: 330px;
    width: 630px;
}

.mainRightRow {
    position: absolute;
    top: 140px;
    right: 135px;
    margin-left: 50px;
    width: 300px;
}

/* header 头部制作 */
.header {
    position: relative;
    height: 80px;
}
.search {
    position: absolute;
    left: 410px;
}
.search input {
    float: left;
    width: 454px;
    height: 32px;
    padding-left: 10px;
}
.search button {
    float: right;
    margin-top: -34px;
    margin-left: 5px;
    line-height: 16px;
    width: 50px;
    height: 32px;
    background-color: #409EFF;
    font-size: 14px;
    color: #fff;
    text-align: center;
}
.hotWord {
    position: absolute;
    top: 45px;
    left: 405px;
}
.hotWord a {
    margin: 0 10px;
}
.hotWord a:hover {
    color: #ff8e5c;
}



/*商品详情页*/
.container {
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
.goodsText{
    font-size: 20px;
    font-weight: bold;
    line-height: 20px;
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
</style>