<template>
  <div class="message-board">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>留言板</span>
      </div>
      <el-form ref="form" :model="messageForm" label-width="120px">
        <el-form-item label="留言">
          <el-input
              type="textarea"
              v-model="messageForm.content"
              autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addMessage">提交留言</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-list v-if="messages.length > 0">
      <el-list-item v-for="(msg, index) in messages" :key="msg.id">
        <template #default>
          <div class="list-item-content">
            {{ msg.content }}
            ({{ msg.createTime }})
          </div>
          <el-button size="small" type="danger" @click="removeMessage(index)">删除</el-button>
        </template>
      </el-list-item>
    </el-list>
    <el-empty v-else description="暂无留言"></el-empty>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {ElMessage} from "element-plus";
import {getMsgBoardListService,deleteMsgBoardByIdService,addMsgBoardService} from '@/api/MsgBoard'

const messages = ref([
  {id: 1, content: '你好，世界！',createTime: '2023-05-01 12:00:00'},
  {id: 2, content: '我是一个前端开发者。',createTime: '2023-05-02 13:00:00'},
  {id: 3, content: '欢迎来到我的博客。',createTime: '2023-05-03 14:00:00'}
]);
const messageForm = ref({
  userId: 1,
  content: ''
});

function addMessage() {
  if (messageForm.value.content.trim() !== '') {
    // 新增时要记录新增的人的ID
    const userInfo = ref(JSON.parse(localStorage.getItem('userInfo')));
    messageForm.value.userId = userInfo.value.id;
    const res = addMsgBoardService(messageForm.value);
    ElMessage.success('添加成功')
    messageForm.value.content = ''; // 清空输入框
  } else {
    ElMessage({
      message: '请输入内容后提交',
      type: 'warning',
      duration: 2000
    });
  }
}

// 根据ID删除留言
const removeMessage = async (index) => {
  // 在删除之前要确认是否删除
  if (!window.confirm('确定要删除吗？')) {
    return;
  }
  const res = await deleteMsgBoardByIdService(messages.value[index].id)
  // 删除索引信息
  messages.value.splice(index, 1);
  if (res.code === 200){
    ElMessage.success('删除成功')
  }
}

// 获取留言列表
const getMsgBoardList = async () => {

  // 日期格式化

  const res = await getMsgBoardListService()
  messages.value = res.data;

  messages.value.forEach(item => {
    item.createTime = new Date(item.createTime).toLocaleString();
  })
}

getMsgBoardList();
</script>

<style scoped>
.message-board {
  max-width: 600px;
  margin: 20px auto;
}

.list-item-content {
  flex: 1;
  font-size: large; /* 保留原来的字体大小 */
  padding: 10px; /* 增加内边距让文字不会挨着边框 */
  border: 1px solid #ccc; /* 轻微柔和的边框颜色 */
  background-color: #f9f9f9; /* 轻微的背景色，对眼睛友好 */
  margin: 5px 0; /* 增加上下外边距，使留言之间有间隔 */
  border-radius: 5px; /* 轻微的圆角 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 添加阴影增加立体感 */
  transition: background-color 0.3s, box-shadow 0.3s; /* 过渡动画使界面更流畅 */
}

.list-item-content:hover {
  background-color: #e6e6e6; /* 鼠标悬停时背景颜色变化，增加交互性 */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); /* 鼠标悬停时增加阴影 */
}

</style>
