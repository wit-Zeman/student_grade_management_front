import request from "@/util/request.js";

// 获取留言列表
export const getMsgBoardListService = () => {
    return request.post('/msgBoard/list')
}

// 根据ID删除留言内容
export const deleteMsgBoardByIdService = (id) => {
    return request.delete('/msgBoard/'+id)
}

// 新增留言
export const addMsgBoardService = (msgBoardData) => {
    return request.put('/msgBoard/save', msgBoardData)
}