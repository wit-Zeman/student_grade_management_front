<template>
  <div class="main-content">
    <div class="welcome-message">
      当前北京时间为：{{ date.toLocaleString() }}——欢迎{{ userInfo.username }}访问
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

// 读取本地存储中的用户信息
const userInfo = ref(JSON.parse(localStorage.getItem('userInfo')));

const date = ref(new Date());
</script>


<style scoped>
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
</style>