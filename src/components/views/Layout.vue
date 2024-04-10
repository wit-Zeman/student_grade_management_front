<template>
  <div id="bgimg">
    <div class="full-height">
      <el-header class="header">
        <div class="header-content">
          <span class="sgms">SGMS</span>
          <el-button type="warning" class="exit-btn" @click="logout">退出</el-button>
        </div>
      </el-header>

      <el-container class="main-container">

        <el-aside width="200px" class="aside">
          <el-menu>
            <el-menu-item index="0">
              <el-icon>
                <IconMenu/>
              </el-icon>
              <template #title>首页</template>
            </el-menu-item>
            <el-menu-item index="1">
              <el-icon>
                <setting/>
              </el-icon>
              <template #title>课程管理</template>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon>
                <setting/>
              </el-icon>
              <template #title>成绩管理</template>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon>
                <setting/>
              </el-icon>
              <template #title>教师管理</template>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon>
                <setting/>
              </el-icon>
              <template #title>学生管理</template>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon>
                <setting/>
              </el-icon>
              <template #title>班级管理</template>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon>
                <setting/>
              </el-icon>
              <template #title>用户管理</template>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon>
                <setting/>
              </el-icon>
              <template #title>个人中心</template>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon>
                <setting/>
              </el-icon>
              <template #title>留言板</template>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main class="main">
          <div class="main-content">
            <div class="welcome-message">
              当前北京时间为：{{ date.toLocaleString() }}——欢迎{{ userInfo.username }}访问
            </div>
          </div>
        </el-main>
      </el-container>
      <el-footer class="footer">© 2024 SGMS. All rights reserved.</el-footer>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {ref} from 'vue'
import {Menu as IconMenu, Setting} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
import { ElMessage } from 'element-plus'

// 读取本地存储中的用户信息
const userInfo = ref(JSON.parse(localStorage.getItem('userInfo')));

const date = ref(new Date());

const router = useRouter();
// 退出登录
const logout = () => {
  ElMessage.success('退出成功')
  // 删除本地存储中的用户信息
  localStorage.removeItem('userInfo');
  // 跳转到登录页面
  router.push('/login')
}
</script>

<style scoped>

#bgimg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("src/assets/images/login.jpg") no-repeat center center fixed;
  background-size: cover;
}

.header-content {
  display: flex;
  justify-content: space-between; /* 让子元素之间水平分布 */
  align-items: center; /* 垂直居中对齐 */
}

.sgms {
  flex-grow: 1; /* 让 "SGMS" 占据剩余空间 */
}

.exit-btn {
  margin-left: 10px; /* 可选：添加一些左边距 */
}


.full-height {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 设置容器高度为视口高度 */
}

.header, .aside, .main, .footer {
  border: 2px solid #0bbdc4; /* 添加边框 */
  font-family: Arial;
}

.main {
  position: relative; /* 设置相对定位 */
  padding: 0; /* 清除内边距 */
}

.main-content {
  position: relative; /* 设置相对定位 */
  width: 100%; /* 图片宽度100% */
  height: 100%; /* 图片高度100% */
  background-image: url("/src/assets/images/home.jpg"); /* 设置背景图片路径 */
  background-size: cover; /* 让背景图片完全覆盖容器 */
  background-position: center; /* 图片居中显示 */
}

.welcome-message {
  position: absolute; /* 设置绝对定位 */
  top: 50%; /* 顶部距离为容器高度的50% */
  left: 50%; /* 左侧距离为容器宽度的50% */
  transform: translate(-50%, -100%); /* 居中定位 */
  color: #daad0d; /* 文字颜色为白色 */
  text-align: center; /* 文字居中上 */
  font-size: 18px; /* 文字大小 */
  font-weight: bold; /* 文字加粗 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 添加文字阴影效果 */
}


.header {
  background-color: #a35d76;
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  height: 60px;
  line-height: 60px;
}

.aside {
  background-color: #F0F0F0;
  color: #333;
  font-size: 16px;
  text-align: center;
}

.main {
  background-color: #E0E0E0;
  color: #333;
  font-family: 'Pacifico', cursive;
  font-size: 16px;
  flex: 1; /* 使main自动填充剩余空间 */
}

.footer {
  background-color: #a35d76;
  color: white;
  font-size: 18px;
  text-align: center;
  height: 60px;
  line-height: 60px;
}

</style>
