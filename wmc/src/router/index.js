import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/goods',
        name: 'Goods',
        component: () => import('../views/Goods.vue')
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/Cart.vue')
    },
    {
        path: '/order',
        name: 'Order',
        component: () => import('../views/Order.vue')
    },
]

const router = new VueRouter({
    routes
})

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err);
}

export default router
