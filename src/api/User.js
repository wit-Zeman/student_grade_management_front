import request from "@/util/request.js";

// 用户注册接口
export const userRegisterService = (data) => {
    return request.post("/user/register", data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
};

// 用户登录接口
export const userLoginService = (data) => {
    return request.post("/user/login", data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
};

// 根据ID获取用户信息
export const getUserInfoByIdService = (id) => {
    return request.get("/user/" + id)
};

// 根据ID修改用户信息
export const updateUserInfoByIdService = (id, user) => {
    return request.put("/user/" + id, user)
};

// 根据ID删除用户信息
export const deleteUserInfoByIdService = (id) => {
    return request.delete("/user/" + id)
}

// 获取用户列表
export const getUserListService = (page, pageSize) => {
    return request.post("/user/list", {
        params: {
            page: page,
            pageIndex: pageSize
        }
    })
};

// 用户上传头像
export const uploadAvatarService = (data) => {
    return request.post("/user/upload", data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
};
