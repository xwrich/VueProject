import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
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
    }
]

// router.beforeEach((to,from,next) => {
//     const isLogin = sessionStorage.getItem('isLogin');
//     if (to.name == 'Login') {
//         next();
//     } else {
//         if(isLogin) {
//             next()
//         } else {
//             next({path: '/Login'})
//         }
//     }
// })

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
