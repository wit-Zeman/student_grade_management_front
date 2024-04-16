// 导入模块
import {createRouter, createWebHistory} from 'vue-router'

// 导入vue组件
import Login from '@/components/views/Login.vue'
import Layout from '@/components/views/Layout.vue'
import Course from '@/components/views/Course.vue'
import Grade from '@/components/views/Grade.vue'
import MsgBoard from '@/components/views/MsgBoard.vue'
import Personage from '@/components/views/Personage.vue'
import Student from '@/components/views/Student.vue'
import Teacher from '@/components/views/Teacher.vue'
import User from '@/components/views/User.vue'
import Home from '@/components/views/Home.vue'

// 定义路由关系及子路由关系
const routes = [
    {
        path: '/', component: Login
    },
    {
        path: '/home', component: Layout,
        // 子路由
        children: [
            {path: '/home', component: Home},
            {path: '/course', component: Course},
            {path: '/grade', component: Grade},
            {path: '/msgBoard', component: MsgBoard},
            {path: '/personage', component: Personage},
            {path: '/student', component: Student},
            {path: '/teacher', component: Teacher},
            {path: '/user', component: User}
        ]
    }
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

// 导出路由
export default router