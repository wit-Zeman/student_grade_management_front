import request from "@/util/request.js";

// 获取学生列表
export const getStudentListService = (studentData) => {
    return request.post("/student/list", studentData)
}

// 根据ID删除学生信息
export const deleteStudentByIdService = (id) => {
    return request.delete("/student/" + id)
}

// 新增学生信息
export const addStudentService = (studentData) => {
    return request.post("/student/save", studentData)
}

// 更新学生信息
export const updateStudentService = (studentData) => {
    return request.put("/student/update", studentData)
}