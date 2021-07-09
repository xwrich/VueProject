# Vue静态购物商城

## 一、项目介绍

该项目是一个基于Vue+ElementUI的静态购物商城项目，商品数据是静态模拟，主要是学习了Vue之后，做的一个练手项目，基本可以实现购物流程，添加购物车等操作。

注册、登录的接口采用网络提供的：

| **注册** | https://api.cat-shop.penkuoer.com/api/v1/auth/reg   |
| -------- | --------------------------------------------------- |
| **登录** | https://api.cat-shop.penkuoer.com/api/v1/auth/login |



## 项目架构

> ```
> --  App.vue
> --  list.txt
> --  main.js
> --  wmc.txt
> --  
> ----assets
> --  --  logo.png
> --  --  
> --  ----image
> --  --      search.png
> --  --      
> --  ----static
> --  --  ----goods
> --  --  --      bama01.jpg
> --  --  --      bama02.jpg
> --  --  --      bama03.jpg
> --  --  --      bama04.jpg
> --  --  --      Lee01.jpg
> --  --  --      Lee02.jpg
> --  --  --      Lee03.jpg
> --  --  --      Lee04.jpg
> --  --  --      nuotai01.jpg
> --  --  --      nuotai02.jpg
> --  --  --      nuotai03.jpg
> --  --  --      qixi01.jpg
> --  --  --      qixi02.jpg
> --  --  --      qixi03.jpg
> --  --  --      qixi04.jpg
> --  --  --      
> --  --  ----swiper
> --  --          1.jpg
> --  --          2.jpg
> --  --          3.jpg
> --  --          4.jpg
> --  --          5.jpg
> --  --          
> --  ----stylesheets
> --          global.css
> --          
> ----components
> --      Nav.vue
> --      
> ----router
> --      index.js
> --      
> ----store
> --      index.js
> --      
> ----utils
> --      require.js
> --      
> ----views
>         Cart.vue
>         Goods.vue
>         Home.vue
>         Login.vue
>         Order.vue
>         Register.vue
>         
> ```





## 说明

在文件夹中存在`gmc`和`wmc`，这是两个类似的项目，但唯一不同的是，`gmc`是采用Vue3.x+ElementUI3.x，`wmc`是采用Vue2.x+ElementUI2.x。其他代码类似。

## 运行效果

1. 注册

   ![](https://cdn.jsdelivr.net/gh/OriginalCoder0/gallery@master/images/1625837716098-reg.png)

2. 登录

   ![](https://cdn.jsdelivr.net/gh/OriginalCoder0/gallery@master/images/1625837731228-login.png)

3. 首页

   ![](https://cdn.jsdelivr.net/gh/OriginalCoder0/gallery@master/images/1625838172072-home.png)

4. 商品页

   ![](https://cdn.jsdelivr.net/gh/OriginalCoder0/gallery@master/images/1625838139059-goods.png)

5. 订单页

   ![](https://cdn.jsdelivr.net/gh/OriginalCoder0/gallery@master/images/1625838208741-order.png)

6. 购物车页

   ![](https://cdn.jsdelivr.net/gh/OriginalCoder0/gallery@master/images/1625838228550-cart.png)



