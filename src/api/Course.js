import request from "@/util/request.js";

// 根据课程ID查询课程详细信息
export const getCourseByIdService = (id) => {
    return request.get('student' + id)
}


// 查询课程信息分页列表
export const getCourseListService = (course) => {
    return request.post('/course/list', course)
}

// 新增课程信息
export const addCourseService = (course) => {
    return request.post('/course/save', course)
}

// 根据ID删除课程信息
export const deleteCourseService = (id) => {
    return request.delete('/course/' + id)
}

// 修改课程信息
export const updateCourseService = (course, id) => {
    return request.put('/course/' + id, course)
}

