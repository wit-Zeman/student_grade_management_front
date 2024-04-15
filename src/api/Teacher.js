import request from "@/util/request.js";

// 获取教师信息列表
export const getTeacherListService = (teacher) => {
    return request.post("/teacher/list", teacher)
};

// 新增教师信息
export const addTeacherService = (teacher) => {
    return request.post("/teacher/save", teacher)
};

// 根据ID删除教师信息
export const deleteTeacherService = (id) => {
    return request.delete("/teacher/" + id)
};

// 更新教师信息
export const updateTeacherService = (teacher) => {
    return request.put("/teacher/update",teacher)
};