// 导入模块
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

// 导入vue组件
import Login from '@/components/views/Login.vue'
import Layout from '@/components/views/Layout.vue'

// 定义路由关系
const routes = [
    {
        path: '/login', component: Login
    },
    {
        path: '/', component: Layout
    }
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

// 导出路由
export default router