import request from "@/util/request.js";

// 根据筛选条件获取成绩分页列表
export const getGradeListService = (gradeData) => {
  return request.post("/grade/list",gradeData)
};