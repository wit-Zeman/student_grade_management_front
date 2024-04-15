<template>
  <br>
  <div class="demo-date-picker">
    <span>课程名:</span>
    <el-input v-model="name" style="margin-right: 10px; flex: 1;" placeholder="请输入课程名"/>
    <span>课程类型:</span>
    <el-select v-model="type" placeholder="请选择" style="margin-right: 10px; flex: 1;">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
    <span>课程代码:</span>
    <el-input v-model="code" style="margin-right: 10px; flex: 1;" placeholder="请输入课程代码"/>
    <span>课程教师:</span>
    <el-input v-model="instructor" style="margin-right: 10px; flex: 1;" placeholder="请输入课程教师"/>
    <span>上课地点:</span>
    <el-input v-model="location" style="margin-right: 10px; flex: 1;" placeholder="请输入上课地点"/>
    <el-button type="primary" style="margin-right: 10px" @click="getCourseList">查询</el-button>
    <el-button type="success" style="margin-right: 10px" @click="dialogVisible = true;title='新增课程'">新增</el-button>
  </div>

  <div class="table">
    <el-card>
      <el-table :data="course" style="width: 100%">
        <el-table-column prop="id" label="序号" width="80"/>
        <el-table-column prop="name" label="课程名" width="150"/>
        <el-table-column prop="type" label="课程类型" width="150"/>
        <el-table-column prop="code" label="课程代码" width="150"/>
        <el-table-column prop="instructor" label="授课教师" width="150"/>
        <el-table-column prop="location" label="上课地点" width="150"/>
        <el-table-column prop="status" label="课程状态" width="150"/>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" plain @click="showDialog(row)">更新</el-button>
            <el-button type="danger" plain @click="deleteCourse(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 弹窗内容 -->
      <el-dialog
          :title="title"
          v-model="dialogVisible">
        <el-form :model="courseForm" :rules="formRules">
          <el-form-item label="课程" :label-width="formLabelWidth" prop="name">
            <el-input v-model="courseForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
            <el-select v-model="courseForm.type" placeholder="请选择" style="margin-right: 10px; flex: 1;">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="课程代码" :label-width="formLabelWidth" prop="code">
            <el-input v-model="courseForm.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="授课教师" :label-width="formLabelWidth" prop="instructor">
            <el-input v-model="courseForm.instructor" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="上课地点" :label-width="formLabelWidth" prop="location">
            <el-input v-model="courseForm.location" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="课程状态" :label-width="formLabelWidth" prop="status">
            <el-select v-model="courseForm.status" placeholder="请选择" style="margin-right: 10px; flex: 1;">
              <el-option
                  v-for="item in optionsStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click=" title == '更新课程' ? updateCourse() : insertCourse()">确认</el-button>
      </span>
      </el-dialog>
    </el-card>

  </div>

  <div class="pagination-container">
    <div class="pagination-content">
      <!-- 你的分页控件代码 -->
      <el-pagination background layout="prev, pager, next" :total="1000" v-model="page"
                     @currentChange="pageChange" page-size="10"/>
    </div>
  </div>


</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {getCourseByIdService, getCourseListService, addCourseService,deleteCourseService,updateCourseService} from '@/api/Course'

const name = ref('')
const type = ref('')
const code = ref('')
const instructor = ref('')
const location = ref('')

const dialogVisible = ref(false);

const courseForm = ref({
  id: '',
  name: '',
  type: '',
  code: '',
  instructor: '',
  location: '',
  status: '',
  createTime: '',
  updateTime: '',
});

const formRules = ref({
  name: [
    {required: true, message: '请输入课程名', trigger: 'blur'},
  ],
  type: [
    {required: true, message: '请输入课程类型', trigger: 'blur'},
  ],
  code: [
    {required: true, message: '请输入课程代码', trigger: 'blur'},
  ],
  instructor: [
    {required: true, message: '请输入课程教师', trigger: 'blur'},
  ],
  location: [
    {
      required: true, message: '请输入上课地点', trigger: 'blur'
    }]
})


const formLabelWidth = '120px';

import {ElMessage} from 'element-plus'


const insertCourse = async () => {
  const res = await addCourseService(courseForm.value)
  ElMessage.success(res.msg ? res.msg : '添加成功')

  // 添加成功后需要关闭弹窗，并重新展示出列表
  dialogVisible.value = false;
  getCourseList();
}

// 定义操作新增or修改模型
const title = ref('')

const showDialog = (row) => {
  dialogVisible.value=true;
  title.value = '更新课程'
  // 绑定数据回显到更新弹窗
  courseForm.value.name = row.name;
  courseForm.value.type = row.type;
  courseForm.value.code = row.code;
  courseForm.value.instructor = row.instructor;
  courseForm.value.location = row.location;
  courseForm.value.status = row.status;
  // 进行更新操作，需要传id给后端
  courseForm.value.id = row.id;
}

const updateCourse = async () => {
  const res = await updateCourseService({
    name: courseForm.value.name,
    type: courseForm.value.type == '必修' ? 1 : 2,
    code: courseForm.value.code,
    instructor: courseForm.value.instructor,
    location: courseForm.value.location,
    status: courseForm.value.status == '已开设' ? 1 : 0,
  },courseForm.value.id)
  ElMessage.success(res.msg ? res.msg : '更新成功')

  // 更新成功后需要关闭弹窗，并重新展示出列表
  dialogVisible.value = false;
  getCourseList();
}

// 根据ID删除课程信息
const deleteCourse = async (id) => {
  await deleteCourseService(id)

  getCourseList();
}


const options = [
  {
    value: 1,
    label: '必修',
  },
  {
    value: 2,
    label: '选修',
  }
]

const optionsStatus = [
    {
      value: 1,
      label: '已开设',
    },
    {
      value: 0,
      label: '未开设',
    }
]

const course = ref([
  {
    id: 1,
    name: '数学',
    type: '选修',
    code: '001',
    instructor: '张老师',
    location: 'A101',
    status: '已开设',
    page: 1,
    pageSize: 10
  }
])

const typeMap = {
  1: '必修',
  2: '选修'
}

const statusMap = {
  1: '已开设',
  0: '未开设'
}

// 接口参数一定要写调用函数的前面，即先定义好参数，再进行传参
const page = ref(1)

const pageChange = (p) => {
  page.value = p;
  getCourseList();
}

const getCourse = async (row) => {
  const res = await getCourseByIdService({
    id: row.id
  })
  course.value = res.data;
}


const getCourseList = async () => {
  const res = await getCourseListService({
    courseName: name.value,
    courseType: type.value,
    courseCode: code.value,
    courseInstructor: instructor.value,
    courseLocation: location.value,
    page: page.value,
    pageSize: 10
  });
  course.value = res.data;

  course.value.forEach((item, index) => {
    item.status = statusMap[item.status];
    item.type = typeMap[item.type]
  })
}

getCourseList();


</script>

<style scoped>

html, body {
  height: 100%; /* 设置 HTML 和 body 高度为 100% */
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* 防止水平滚动 */
}

#app {
  min-height: 100%; /* 确保 #app 至少与视口一样高 */
  display: flex;
  flex-direction: column; /* 列方向布局 */
}

.demo-date-picker {
  display: flex;
  flex-wrap: nowrap; /* 保持不换行 */
  align-items: center; /* 垂直居中对齐 */
  gap: 10px; /* 元素之间的间隙 */
}

.table {
  flex: 1; /* 让表格区域占用多余的空间 */
  overflow: auto; /* 内容超出时显示滚动条 */
}

.pagination-container {
  display: flex;
  justify-content: flex-end; /* 向右对齐 */
  padding: 10px 0; /* 添加一些垂直间隙 */
}

/* 移除不必要的 margin-right */
.pagination-content {
  /* 控制分页控件的布局和样式 */
  margin-right: 500px;
}

.dialog-footer {
  text-align: right;
}
</style>

