import {createRouter, createWebHistory} from 'vue-router'
import Login from '../views/Login.vue'

const routes = [{
    path: '/',
    name: 'Login',
    component: Login
}, {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register')
}, {
    path: '/home',
    name: 'Home',
    component: () => import ('../views/Home.vue')
}, {
    path: '/detail',
    name: 'Detail',

    component: () => import ('../views/Detail.vue')
}]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router