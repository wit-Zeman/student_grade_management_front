<template>
  <br>
  <div class="demo-date-picker">
    <span>姓名:</span>
    <el-input v-model="name" style="margin-right: 10px; flex: 1;" placeholder="请输入学生姓名"/>
    <span>科目:</span>
    <el-input v-model="subject" style="margin-right: 10px; flex: 1;" placeholder="请输入考试科目"/>
    <span>类型:</span>
    <el-input v-model="type" style="margin-right: 10px; flex: 1;" placeholder="请输入考试时间"/>
    <span>考试时间范围:</span>
    <div class="block">
      <el-config-provider :locale="local">
        <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="handleChange">
        </el-date-picker>
      </el-config-provider>
    </div>
    <el-button type="primary" style="margin-right: 10px" @click="gradeList">查询</el-button>
  </div>

  <div class="table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="150"/>
      <el-table-column prop="studentName" label="姓名" width="150"/>
      <el-table-column prop="courseName" label="科目" width="250"/>
      <el-table-column prop="type" label="考试类型" width="200"/>
      <el-table-column prop="score" label="考试分数" width="150"/>
      <el-table-column prop="time" label="考试时间" width="150"/>
    </el-table>
  </div>

  <div class="pagination-container">
    <div class="pagination-content">
      <!-- 你的分页控件代码 -->
      <el-pagination background layout="prev, pager, next" :total="100"  v-model="page" @currentChange="pageChange" page-size="10"/>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {ref} from 'vue'
import {getGradeListService} from '@/api/Grade'
import zhcn from 'element-plus/es/locale/lang/zh-cn'

let local = zhcn


const name = ref('')
const subject = ref('')
const type = ref('')


const formatDate = (date) => {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

const dateRange = ref([]);

const handleChange = (date) => {
  let start = formatDate(date[0]);
  let end = formatDate(date[1]);
  [start, end] = dateRange.value;
};


const page = ref(1)

const pageChange = (p) => {
  page.value = p;
  gradeList();
}



const gradeList = async () => {
  const res = await getGradeListService({
    studentName: name.value,
    course: subject.value,
    type: type.value,
    startDate: dateRange.value[0],
    endDate: dateRange.value[1],
    page: page.value,
    pageSize: 10
  });
  tableData.value = res.data;

  tableData.value.forEach((item, index) => {
    item.type = item.type === '1' ? '期中考试' : '期末考试';
  })
}

// 调用此函数才能生效！！
gradeList();

const tableData = ref([{
  id: 1,
  studentName: '张三',
  courseName: '语文',
  type: '期中考试',
  score: 90,
  time: '2023-05-01',
  page: 1,
  pageSize: 10
}])


</script>

<style scoped>

.demo-date-picker {
  display: flex;
  flex-wrap: nowrap; /* 修改这里来防止换行 */
  align-items: center; /* 添加对齐 */
  gap: 10px; /* 添加间隙 */
}

.block {
  /* 调整 padding 或许不再需要，因为我们希望它们在一行显示 */
  flex: 1; /* 使日期选择器也能弹性扩展 */
  display: flex; /* 确保里面的内容也是 flex 布局 */
  justify-content: center; /* 居中显示日期选择器 */
}

/* 可以移除这个样式，因为我们不再需要边框 */
.demo-date-picker .block:last-child {
  border-right: none;
}

.pagination-container {
  display: flex;
  justify-content: flex-end; /* 将内容向右对齐 */
  margin-right: 500px; /* 可以调整右边距 */
}

.pagination-content {
  /* 这里可以添加任何其他样式，用于控制分页控件的布局和样式 */
}

</style>
