<template>
  <br>
  <div class="demo-date-picker">
    <span>教师名:</span>
    <el-input v-model="name" style="margin-right: 10px; flex: 1;" placeholder="请输入教师姓名"/>
    <span>学历:</span>
    <el-input v-model="education" style="margin-right: 10px; flex: 1;" placeholder="请输入教师学历"/>
    <span>性别:</span>
    <el-select v-model="gender" style="margin-right: 10px; flex: 1;" placeholder="请选择性别">
      <el-option label="男" value="1"/>
      <el-option label="女" value="2"/>
    </el-select>
    <el-button type="primary" style="margin-right: 10px" @click="getTeacherList">查询</el-button>
    <el-button type="success" style="margin-right: 10px" @click="dialogVisible = true;title='新增教师'">新增</el-button>
  </div>

  <div class="table">
    <el-card>
      <el-table :data="teacher" style="width: 100%">
        <el-table-column prop="id" label="序号" width="80"/>
        <el-table-column prop="name" label="教师名" width="150"/>
        <el-table-column prop="age" label="年龄" width="100"/>
        <el-table-column prop="contact" label="联系方式" width="150"/>
        <el-table-column prop="education" label="学历" width="100"/>
        <el-table-column prop="major" label="专业" width="150"/>
        <el-table-column prop="gender" label="性别" width="100"/>
        <el-table-column prop="entryDate" label="入职时间" width="150"/>
        <el-table-column prop="dimissionDate" label="离职时间" width="150"/>
        <el-table-column prop="department" label="所属学院" width="150"/>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" plain @click="showDialog(row)">更新</el-button>
            <el-button type="danger" plain @click="deleteTeacher(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 弹窗内容 -->
      <el-dialog
          :title="title"
          v-model="dialogVisible">
        <el-form :model="teacherForm" :rules="formRules">
          <el-form-item label="教师名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="teacherForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
            <el-input v-model="teacherForm.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth" prop="contact">
            <el-input v-model="teacherForm.contact" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学历" :label-width="formLabelWidth" prop="education">
            <el-input v-model="teacherForm.education" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="专业" :label-width="formLabelWidth" prop="major">
            <el-input v-model="teacherForm.major" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
            <el-input v-model="teacherForm.gender" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="入职时间" :label-width="formLabelWidth" prop="entryDate">
            <el-input v-model="teacherForm.entryDate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="离职时间" :label-width="formLabelWidth" prop="dimissionDate">
            <el-input v-model="teacherForm.dimissionDate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属学院" :label-width="formLabelWidth" prop="department">
            <el-input v-model="teacherForm.department" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="title == '新增教师' ? insertTeacher():updateTeacher()">确认</el-button>
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
import {getTeacherListService,addTeacherService,deleteTeacherService,updateTeacherService} from '@/api/Teacher'
import {ElMessage} from "element-plus";


const name = ref('')
const education = ref('')
const gender = ref('')
const title = ref('')
const dialogVisible = ref(false)
const formLabelWidth = '120px';

const teacher = ref([
  {
    id: 1,
    name: '张老师',
    age: 22,
    contact: 112233445566,
    education: '博士',
    major: '计算机科学与技术',
    gender: '男',
    entryDate: '2023-01-01',
    dimissionDate: '2024-08-01',
    department: '计算机学院',
    page: 1,
    pageSize: 10
  }
])


const teacherForm = ref({
  id:'',
  name: '',
  age: '',
  contact: '',
  education: '',
  major: '',
  birth: '',
  gender: '',
  entryDate: '',
  dimissionDate: '',
  department: '',
  address: ''
})

const formRules = ref({
  name: [{required: true, message: '请输入教师姓名', trigger: 'blur'}],
  age: [{required: true, message: '请输入教师年龄', trigger: 'blur'}],
  contact: [{required: true, message: '请输入教师联系方式', trigger: 'blur'}],
  education: [{required: true, message: '请输入教师学历', trigger: 'blur'}],
  major: [{required: true, message: '请输入教师专业', trigger: 'blur'}],
  birth: [{required: true, message: '请输入教师出生日期', trigger: 'blur'}],
  gender: [{required: true, message: '请输入教师性别', trigger: 'blur'}],
  entryDate: [{required: true, message: '请输入教师入职时间', trigger: 'blur'}],
  dimissionDate: [{required: true, message: '请输入教师离职时间', trigger: 'blur'}],
  department: [{required: true, message: '请输入教师所属学院', trigger: 'blur'}],
  address: [{required: true, message: '请输入教师地址', trigger: 'blur'}]
})


// 性别字典
const genderDict = {
  1: '男',
  2: '女',
  3: '未知'
}



const page = ref(1)

const pageChange = (p) => {
  page.value = p;
  getTeacherList();
}

// 更新操作，回显数据
const showDialog = (row) => {
  dialogVisible.value = true;
  title.value = '更新教师';
  teacherForm.value = row;
}

// 更新
const updateTeacher = async () => {
  const res = await updateTeacherService(
      {
        id: teacherForm.value.id,
        name: teacherForm.value.name,
        age: teacherForm.value.age,
        contact: teacherForm.value.contact,
        education: teacherForm.value.education,
        major: teacherForm.value.major,
        gender: teacherForm.value.gender == '男' ? 1 : 2,
        entryDate: teacherForm.value.entryDate,
        dimissionDate: teacherForm.value.dimissionDate,
        department: teacherForm.value.department,
      }
  );
  if (res.code === 200) {
    ElMessage.success('更新成功');
    dialogVisible.value = false;
    getTeacherList();
  }
}

// 获取教师信息列表
const getTeacherList = async () => {
  const res = await getTeacherListService({
    teacherName: name.value,
    education: education.value,
    gender: gender.value,
    page: page.value,
    pageSize: 10
  })

  teacher.value = res.data;

  teacher.value.forEach((item,index) => {
    item.gender = genderDict[item.gender];
  })
}

// 新增教师信息
const insertTeacher = async () => {
  const res = await addTeacherService({
    name: teacherForm.value.name,
    age: teacherForm.value.age,
    contact: teacherForm.value.contact,
    education: teacherForm.value.education,
    major: teacherForm.value.major,
    birth: teacherForm.value.birth,
    gender: teacherForm.value.gender == '男' ? 1 : 2,
    entryDate: teacherForm.value.entryDate,
    dimissionDate: teacherForm.value.dimissionDate,
    department: teacherForm.value.department,
    address: teacherForm.value.address
  });
  if (res.code === 200) {
    ElMessage.success('添加成功');
    dialogVisible.value = false;
    getTeacherList();
  } else {
    ElMessage.error('添加失败');
  }
}

// 根据ID删除教师信息
const deleteTeacher = async (id) => {
  const res = await deleteTeacherService(id);
  if (res.code === 200) {
    ElMessage.success('删除成功');
    getTeacherList();
  } else {
    ElMessage.error('删除失败');
  }
}

getTeacherList();
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

