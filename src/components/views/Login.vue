<template>
  <div id="bgimg">
    <div class="container">
      <div class="title">学生成绩管理系统</div>
      <div class="login-form">
        <el-form ref="form" :model="formData" :rules="formRules" label-width="80px" label-position="top">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="formData.password" placeholder="请输入密码"
                      prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <el-form-item v-if="isRegister" label="确认密码" prop="confirmPassword">
            <el-input type="password" v-model="formData.confirmPassword" placeholder="请再次输入密码"
                      prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="submitForm">{{ isRegister ? '注册' : '登录' }}</el-button>
          </el-form-item>
          <div class="switch-btn">
            <el-link @click="toggleForm"><strong style="color: black">{{ isRegister ? '已有账号，去登录' : '没有账号，去注册' }}</strong></el-link>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

import { ElMessage } from 'element-plus'
import {userRegisterService,userLoginService} from '@/api/User.js'
import router from '@/router/router'


export default {
  data() {
    return {
      formData: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      formRules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        confirmPassword: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
          {validator: this.validatePassword, trigger: 'blur'}
        ]
      },

      isRegister: false // 是否为注册表单
    };
  },
  methods: {
    validatePassword(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次确认密码'));
      } else if (value !== this.formData.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 发送登录或注册请求
          if (this.isRegister) {
            // 发送注册请求
            userRegisterService(this.formData).then(res => {
              if (res.code === 200) {
                ElMessage.success('注册成功')
              } else {
                ElMessage.error('注册失败')
              }
            });
          } else {
            // 发送登录请求
            userLoginService(this.formData).then(res => {
              if (res.code === 200) {
                ElMessage.success('登录成功')
                // 使用浏览器的本地存储将用户信息存储到本地
                localStorage.setItem('userInfo', JSON.stringify(res.data))
                // 跳转到首页 借助路由完成跳转
                router.push('/home')
              } else {
                ElMessage.error('登录失败')
              }
            })
          }
        } else {
          return false;
        }
      });
    },
    toggleForm() {
      this.isRegister = !this.isRegister;
      this.resetForm();
    },
    resetForm() {
      this.$refs.form.resetFields();
    }
  }
};
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


.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.title {
  font-size: 40px;
  font-weight: bold;
  margin-right: 50px; /* 调整与登录表单的间距 */
  font-family: 'Pacifico', cursive;
  color: #333;
}



.login-form {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-btn {
  width: 100%;
}

.switch-btn {
  margin-top: 20px;
  text-align: center;
}
</style>
