<template>
  <br>
  <div class="demo-date-picker">
    <span>学生名:</span>
    <el-input v-model="name" style="margin-right: 10px; flex: 1;" placeholder="请输入学生姓名"/>
    <span>所属班级:</span>
    <el-input v-model="className" style="margin-right: 10px; flex: 1;" placeholder="请输入班级名称"/>
    <el-button type="primary" style="margin-right: 10px" @click="getStudentList()">查询</el-button>
    <el-button type="success" style="margin-right: 10px" @click="dialogVisible = true">新增</el-button>
  </div>

  <div class="table">
    <el-card>
      <el-table :data="student" style="width: 100%">
        <el-table-column prop="id" label="序号" width="80"/>
        <el-table-column prop="name" label="学生姓名" width="150"/>
        <el-table-column prop="gender" label="性别" width="100"/>
        <el-table-column prop="age" label="年龄" width="100"/>
        <el-table-column prop="birth" label="出生日期" width="150"/>
        <el-table-column prop="nativePlace" label="籍贯" width="100"/>
        <el-table-column prop="className" label="所属班级" width="200"/>
        <el-table-column prop="entryDate" label="入学时间" width="150"/>
        <el-table-column prop="contact" label="联系方式" width="150"/>
        <el-table-column prop="address" label="家庭住址" width="150"/>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" plain @click="showDialog(row)">更新</el-button>
            <el-button type="danger" plain @click="deleteStudentById(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 弹窗内容 -->
      <el-dialog
          :title="title"
          v-model="dialogVisible">
        <el-form :model="studentForm" :rules="formRules">
          <el-form-item label="学生姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="studentForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
            <el-select v-model="studentForm.gender" placeholder="请选择">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
            <el-input v-model="studentForm.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="班级" :label-width="formLabelWidth" prop="className">
            <el-input v-model="studentForm.className" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" :label-width="formLabelWidth" prop="birth">
            <el-input v-model="studentForm.birth" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="籍贯" :label-width="formLabelWidth" prop="nativePlace">
            <el-input v-model="studentForm.nativePlace" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="入学时间" :label-width="formLabelWidth" prop="entryDate">
            <el-input v-model="studentForm.entryDate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth" prop="contact">
            <el-input v-model="studentForm.contact" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="家庭住址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="studentForm.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="title == '更新学生' ? updateStudent() : addStudent()">确认</el-button>
      </span>
      </el-dialog>
    </el-card>
  </div>

  <div class="pagination-container">
    <div class="pagination-content">
      <!-- 你的分页控件代码 -->
      <el-pagination background layout="prev, pager, next" :total="100" v-model="page"
                     @currentChange="pageChange" page-size="10"/>
    </div>
  </div>


</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {ElMessage} from "element-plus";
import {getStudentListService, updateStudentService, deleteStudentByIdService, addStudentService} from '@/api/Student'

const name = ref('')
const className = ref('')
const title = ref('')
const dialogVisible = ref(false)
const formLabelWidth = '120px';

const student = ref([
  {
    id: 1,
    name: '张三',
    gender: '男',
    age: 18,
    birth: '2024-01-01',
    nativePlace: '上海',
    className: '三年二班',
    entryDate: '2024-01-01',
    contact: '13800000000',
    address: '上海市浦东新区'
  }
])

const studentForm = ref({
  id: '',
  name: '',
  age: '',
  gender: '',
  birth: '',
  nativePlace: '',
  className: '',
  entryDate: '',
  contact: '',
  address: ''
})

const formRules = ref({
  name: [
    {required: true, message: '请输入学生名', trigger: 'blur'},
    {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
  ],
  className: [
    {required: true, message: '请输入班级名称', trigger: 'blur'}
  ],
  age: [
    {required: true, message: '请输入年龄', trigger: 'blur'}
  ],
  gender: [
    {required: true, message: '请选择学生性别', trigger: 'change'}
  ],
  entryDate: [
    {required: true, message: '请选择入学时间', trigger: 'change'}
  ],
  contact: [
    {
      required: true, message: '请输入联系方式', trigger: 'blur'
    }
  ],
  address: [
    {required: true, message: '请输入家庭住址', trigger: 'blur'}
  ],
  birth: [
    {required: true, message: '请选择出生日期', trigger: 'change'}
  ],
  nativePlace: [
    {required: true, message: '请输入籍贯', trigger: 'blur'}
  ]
})

// 性别字典
const genderDict = {
  0: '男',
  1: '女',
  2: '未知'
}


const page = ref(1)

const pageChange = (p) => {
  page.value = p;
  getStudentList();
}

// 获取学生信息列表
const getStudentList = async () => {
  const res = await getStudentListService({
    studentName: name.value,
    className: className.value,
    page: page.value,
    pageSize: 10
  })
  student.value = res.data

  student.value.forEach(item => {
    item.gender = genderDict[item.gender]
  })
}

// 新增学生
const addStudent = async () => {
  title.value = '新增学生'
  const res = await addStudentService(studentForm.value)
  if (res.code == 200) {
    ElMessage.success('新增成功')
  }

  dialogVisible.value = false;
  getStudentList()
}

// 根据ID删除学生
const deleteStudentById = async (id) => {
  const res = await deleteStudentByIdService(id)
  if (res.code == 200) {
    ElMessage.success('删除成功')
  }
  await getStudentList()
}

// 更新之前的回显数据
const showDialog = (row) => {
  title.value = '更新学生';
  dialogVisible.value = true;
  studentForm.value.name = row.name;
  studentForm.value.age = row.age;
  studentForm.value.gender = row.gender;
  studentForm.value.birth = row.birth;
  studentForm.value.nativePlace = row.nativePlace;
  studentForm.value.className = row.className;
  studentForm.value.entryDate = row.entryDate;
  studentForm.value.contact = row.contact;
  studentForm.value.address = row.address;
  studentForm.value.id = row.id;
}

// 更新学生信息
const updateStudent = async () => {
  const res = await updateStudentService({
    id: studentForm.value.id,
    name: studentForm.value.name,
    age: studentForm.value.age,
    gender: studentForm.value.gender == '男' ? 0 : 1,
    birth: studentForm.value.birth,
    nativePlace: studentForm.value.nativePlace,
    className: studentForm.value.className,
    entryDate: studentForm.value.entryDate,
    contact: studentForm.value.contact,
    address: studentForm.value.address
  })
  if (res.code == 200) {
    ElMessage.success('更新成功')
  }

  dialogVisible.value = false;
  await getStudentList()
}

getStudentList();
</script>

<style scoped>

html, body {
  height: 100%; /* 设置 HTML 和 body 高度为 100% */
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* 防止水平滚动 */
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
  margin-right: 700px;
}

.dialog-footer {
  text-align: right;
}
</style>

