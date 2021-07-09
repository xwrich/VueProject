<template>
    <div class="home">
        <el-container>
            <el-header style="height: 40px">
                <div class="menu">
                    <div class="leftMenu">
                        <ul>
                            <el-row >
                                <li><a>湖北</a></li>
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
                                </el-row>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-header>
            <el-main>
                <!-- 头部搜索和热词-->
                <div class="header w">
                    <!-- search搜索模块 -->
                    <div class="search">
                        <el-input type="search" v-model="inputValue" placeholder="鲜花、向日葵"></el-input>
                        <el-button type="primary" size="small" style="width: 60px" @click="handleSearchQuery()">搜索</el-button>
                    </div>
                    <div class="hotWord">
                        <a  class="style_red">特价促销</a>
                        <a >限时抢购</a>
                        <a >猜你喜欢</a>
                        <a >美满99减30</a>
                        <a >新品尝鲜</a>
                        <a >叮卡优惠</a>
                        <a >平价菜场</a>
                    </div>
                </div>
                <!--轮播图部分-->
                <div class="main">
                    <div class="mainLeft">
                        <!-- nav模块制作 start -->
                        <nav class="nav">
                            <div class="w">
                                <div class="dropdown">
                                    <div class="dt">全部商品分类</div>
                                    <div class="dd">
                                        <ul>
                                            <li><a >蔬菜水果</a></li>
                                            <li><a >水产海鲜</a></li>
                                            <li><a >乳品烘焙</a></li>
                                            <li><a >冷冻食品</a></li>
                                            <li><a >粮油调味</a></li>
                                            <li><a >酒水饮料</a></li>
                                            <li><a >休闲零食</a></li>
                                            <li><a >方便速食</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        <!-- nav模块制作 end -->
                    </div>
                    <!-- 轮播图的制作 -->
                    <div class="mainRight">
                        <el-carousel :interval="5000" arrow="always">
                            <el-carousel-item v-for="item in imgList1" :key="item.index">
                                <img :src="item" style="width: 670px;height: 300px">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <!-- 轮播图的制作 -->
                    <div class="mainRightRow">
                        <el-carousel :interval="5000" arrow="always">
                            <el-carousel-item v-for="item in imgList2" :key="item.index">
                                <img :src="item" style="width: 300px;height: 300px">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
                <!--精品推荐-->
                <div class="recommend">
                    <!-- <span>精品推荐</span>-->
                    <div class="content"
                         v-for="(item,index) in goodsList"
                         :key="index"
                         @click="togglePage(item)" >
                        <div class="content-box">
                            <img class="image-pic" :src="item.cover"/>
                            <div class="bottom">
                                <div class="desc">
                                    {{item.text}}
                                </div>
                                <div class="discount">{{item.discount}}</div>
                                <span class="miaoshabox">
                                    <span class="miaosha">秒杀价￥</span>
                                    <span class="miaosha fz">{{item.onlinePrice}}</span>
                                    <span class="fc">￥{{item.price}}</span>
                                </span>
                                <div class="hot">
                                    <span class="hot-count">{{item.hot}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-main>
            <el-footer style="height: 30px;height: 30px;bottom: 0;width: 100%;">购物商城，版权所有：OriginalCoder | 2021-06-2</el-footer>
        </el-container>
    </div>
</template>

<script>

import {useRouter} from 'vue-router'

export default {
    name: 'home',
    data() {
        return {
            // user:JSON.parse(window.sessionStorage.getItem('username')),
            inputValue: '',
            searchData: '',
            imgList1: [
                require('../assets/static/swiper/1.jpg'),
                require('../assets/static/swiper/2.jpg'),
                require('../assets/static/swiper/3.jpg'),
                require('../assets/static/swiper/4.jpg')
            ],
            imgList2: [
                require('../assets/static/swiper/swiper1.jpg'),
                require('../assets/static/swiper/swiper2.jpg'),
                require('../assets/static/swiper/swiper3.jpg'),
            ],
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
    setup() {
        let router = useRouter()
        //首页
        const handleToHome = () => {
            router.push('/home')
        }
        //返回
        const handleBack = () => {
            router.back()
        }
        //商品详情页
        const togglePage = (item) => {
            router.push({ path: '/Goods', query: { name: item.name } })
        }
        //注册
        const handleToReg = () => {
            router.push('/register')
        }
        //购物车
        const handleToCart = () => {
            router.push('/cart')
        }
        //我的订单
        const handleToOrder = () => {
            router.push('/order')
        }
        //搜索
        const handleSearchQuery = () => {
            let searchValue = this.inputValue;
            if (searchValue) {
                this.searchData = this.goodsList.filter(function (goodsList) {
                    console.log(goodsList, '过滤信息')
                    return router.push({ path: '/Goods', query: { name: searchValue.name } })
                })
            }
        }
        return {handleToHome,handleBack,togglePage,handleToReg,handleToCart,handleToOrder,handleSearchQuery}
    },

}
</script>

<style>
html,
body,
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
    margin-left: 115px;

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


/* nav模块制作 */
.nav {
    height: 47px;
    border-bottom: 2px solid #b1191a;
}

.nav .dropdown {
    float: left;
    width: 210px;
    height: 45px;
    background-color: #b1191a;
}
.dropdown .dt {
    width: 100%;
    height: 100%;
    color: #fff;
    text-align: center;
    line-height: 45px;
    font-size: 16px;
}

.dropdown .dd {
    /* display: none; */
    width: 210px;
    height: 253px;
    background-color: #c81623;
    margin-top: 2px;
}

.dropdown .dd ul li {
    position: relative;
    height: 31px;
    line-height: 31px;
    margin-left: 2px;
    padding-left: 10px;
}

.dropdown .dd ul li:hover {
    background-color: #fff;
}

.dropdown .dd ul li::after {
    position: absolute;
    top: 1px;
    right: 10px;
    color: #fff;
    font-family: 'icomoon';
    content: '\e920';
    font-size: 14px;
}

.dropdown .dd ul li a {
    font-size: 14px;
    color: #fff;
}

.dropdown .dd ul li:hover a {
    color: #c81623;
}

.navitems ul li {
    float: left;
}

.navitems ul li a {
    display: block;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    padding: 0 25px;
}


/*精品推荐*/
.recommend{
    display: flex;
    justify-content: center;
}
.content {
    display: flex;
    margin-top: 40px;
}

.content-box {
    height: 400px;
    width: 250px;
    border: 1px solid #ebebeb;
    background: #ffffff;
    border-radius: 10px;
    margin: 0 25px 0 16px;
}

.image-pic {
    position: relative;
    margin: 15px 18px 136px 15px;
    height: 178px;
    width: 218px;
}

.desc {
    color: #666666;
    font-family: Noto Sans SC;
    font-weight: bold;
    font-size: 12px;
    line-height: normal;
    letter-spacing: 0px;
    text-align: left;
}

.discount {
    width: 91px;
    height: 26px;
    margin-top: 10px;
    background: #ffffff;
    border: 1px solid #ff8000;
    color: #ff8000;
    line-height: 26px;
    text-align: center;
}

.bottom {
    margin-left: 22px;
    margin-right: 22px;
    position: relative;
    top: -120px;
}

.miaosha {
    color: #ff2200;
    font-family: Noto Sans SC;
    font-weight: bold;
    font-size: 12px;
    line-height: normal;
    letter-spacing: 0px;
    text-align: left;
    width: 50px;
}

.fz {
    font-size: 28px;
    color: #ff5000;
}

.fc {
    color: #999999;
    font-family: Noto Sans SC;
    font-weight: bold;
    font-size: 12px;
    line-height: normal;
    letter-spacing: 0px;
    text-align: left;
    text-decoration: line-through;
}

.hot-count {
    color: #ff2200;
    font-family: Noto Sans SC;
    font-weight: bold;
    font-size: 14px;
    line-height: normal;
    letter-spacing: 0px;
    text-align: left;
}

.hot {
    margin-top: 8px;
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