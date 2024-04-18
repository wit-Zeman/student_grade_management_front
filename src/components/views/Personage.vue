<template>
  <el-container style="padding: 20px; background: antiquewhite; height: 100%;">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人中心</span>
      </div>

      <el-form :model="user" label-width="100px">
        <el-form-item label="头像">
          <el-avatar :src="user.avatar" size="large" @click="showUploadDialog = true"></el-avatar>
        </el-form-item>
        <el-form-item label="电子邮件">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="user.bio"></el-input>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 弹窗上传头像 -->
    <el-dialog
        title="上传新头像"
        v-model="showUploadDialog"
        width="30%">
      <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :http-request="uploadAvatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
        <el-icon v-else class="avatar-uploader-icon">
          <Plus/>
        </el-icon>
      </el-upload>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showUploadDialog = false">取消</el-button>
    <el-button type="primary" @click="confirmUpload">确认</el-button>
  </span>
    </el-dialog>

  </el-container>
</template>


<script lang="ts" setup>
import {ref} from 'vue';
import {getUserInfoByIdService} from '@/api/User'
import {
  ElAvatar, ElButton, ElCard, ElContainer, ElForm,
  ElFormItem, ElInput, ElDialog, ElUpload
} from 'element-plus';
import {ElMessage} from 'element-plus'
import {Plus} from '@element-plus/icons-vue'

import type {UploadProps} from 'element-plus'
import axios from "axios";

// 定义文件上传请求的后端接口
const uploadUrl = ref('http://localhost:8080/system/user/upload'); // 后端接口URL

const userInfo = ref(JSON.parse(localStorage.getItem('userInfo')));

const userId = userInfo.value.id;

const uploadAvatar = (file) => {
  const formData = new FormData();
  formData.append('file', file.file); // 'file'是后端期待的文件字段名
  formData.append('id',userId); // 附加用户ID到formData

  // 使用axios或其他HTTP库发送请求
  return axios.post(uploadUrl.value, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => {
    // 处理响应
    if (response.status === 200) {
      imageUrl.value = URL.createObjectURL(file.file); // 预览新上传的图片
      return response.data; // 必须返回响应数据给el-upload
    }
  }).catch(error => {
    console.error('Upload error:', error);
  });
};


const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}


const user = ref({
  avatar: 'https://q4.itc.cn/q_70/images03/20240405/0fe4005840664f30b76f1a63909a5489.jpeg',
  email: 'zhangsan@example.com',
  bio: '这里是你的个人简介...'
});
const showUploadDialog = ref(false);


function updateProfile() {
  console.log('Profile updated:', user.value);
  // 实现更新逻辑
}


const getUserAvatar = async () => {
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo')));
  // 获取用户头像的逻辑
  const res = await getUserInfoByIdService(userInfo.value.id);
  user.value.avatar = res.data.avatar;
  user.value.email = res.data.email;
  user.value.bio = res.data.intro;
  imageUrl.value = res.data.avatar;
}

function confirmUpload() {
  showUploadDialog.value = false;
  getUserAvatar();
}


getUserAvatar();
</script>


<style scoped>
.el-container {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  border-radius: 10px;
  overflow: hidden;
}

.box-card {
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border-radius: 8px;
}

.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 20px auto;
  display: block;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #c0c4cc;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  margin-right: 10px;
}

.dialog-footer {
  text-align: right;
  padding: 10px 20px;
}

input, .el-input, .el-textarea {
  border-color: #c0c4cc;
  box-shadow: inset 0 1px 1px rgba(0,0,0,0.02);
}

.el-card {
  background: #ffffff;
  border: 0;
}

</style>
