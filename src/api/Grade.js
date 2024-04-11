import request from "@/util/request.js";

// 获取成绩分页列表
export const getGradeListService = (page, pageSize) => {
  return request.post("/grade/list", {
    params: {
      page: page,
      pageIndex: pageSize,
    },
  });
};