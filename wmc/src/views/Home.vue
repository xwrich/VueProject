<template>
    <div class="home">
        <el-container>
            <!-- 顶部导航栏-->
            <el-header style="height: 40px;background-color: #B3C0EE;">
                <div class="menu">
                    <div class="leftMenu">
                        <ul>
                            <el-row style="display: flex">
                                <li><a>中国大陆</a></li>
                                <li><a >首页</a></li>
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
            <!-- 轮播图 -->
            <div class="carousel">
                <el-carousel :interval="4000" type="card" height="300px">
                    <el-carousel-item v-for="item in imgList" :key="item.index">
                        <img :src="item">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!--商品推荐-->
            <div class="goods">
                <div class="rec-banner">
                    <h1 class="banner-title">精品推荐</h1>
                    <ul class="rec-list">
                        <li
                            class="rec-card"
                            v-for="(item, id) in commodity"
                            :key="id"
                            @click="togglePage(item)">
                            <img class="rec-media" :src="item.cover"/>
                            <div class="rec-profile">
                                <h4>{{ item.text }}</h4>
                                <p class="rec-params">
                                    原价: <span class="rec-price">￥{{ item.price }}</span>&nbsp;
                                    促销价: <span class="rec-online-price">￥{{ item.onlinePrice }}</span>
                                </p>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </el-container>
    </div>
</template>

<script>

export default {
    name:'Home',
    data() {
        return {
            imgList:[
                require('../assets/static/swiper/1.jpg'),
                require('../assets/static/swiper/2.jpg'),
                require('../assets/static/swiper/3.jpg'),
                require('../assets/static/swiper/4.jpg'),
                require('../assets/static/swiper/5.jpg'),
            ],
            commodity: [
                {
                    id: 1,
                    name: 'nuotai',
                    text: '诺泰暖宫护腰艾灸加热女生必备神器',
                    address: '山东泰安',
                    type: '包邮',
                    price: '536.00',
                    onlinePrice: '208.00',
                    cover: require('../assets/static/goods/nuotai01.jpg'),
                    poster: require('../assets/static/goods/nuotai02.jpg'),
                    images: [
                        require('../assets/static/goods/nuotai01.jpg'),
                        require('../assets/static/goods/nuotai02.jpg'),
                    ]
                },
                {
                    id: 2,
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
                    ]
                },
                {
                    id: 3,
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
                    ]
                },
                {
                    id: 4,
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
                    ]
                },


                {
                    id: 5,
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
                    ]
                },
                {
                    id: 6,
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
                    ]
                },
                {
                    id: 7,
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
                    ]
                },
                {
                    id: 8,
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
                    ]
                }
            ]
        };
    },
    methods: {
        // handleSelect(key, keyPath) {
        //     console.log(key, keyPath);
        // },
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
        //商品详情页
        togglePage (item) {
            this.$router.push({ path: '/Goods', query: { name: item.name } })
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




/*轮播图*/
.carousel{
    margin-top: 45px;
}

/*精品推荐*/
.goods{
    margin-top: 20px;
}
.rec-banner {
    margin: 10px auto;
    padding-top: 10px;
    padding-bottom: 50px;
    width: 1170px;
    background-color: #fff;
}
.banner-title {
    margin: 10px 0 -35px 25px;
}
.rec-list {
    list-style: none;
}
.rec-card {
    display: inline-block;
    margin-top: 50px;
    width: 25%;
    text-align: center;
    vertical-align: top;
    cursor: pointer;
}
.rec-media {
    width: 240px;
    height: 200px;
}
.rec-profile {
    width: 200px;
    display: inline-block;
    color: #444;
}
.rec-price {
    text-decoration: line-through;
}
.rec-online-price {
    color: #ff0036;
    font-size: 16px;
}
.rec-params {
    font-size: 12px;
    color: #888;
}

</style>