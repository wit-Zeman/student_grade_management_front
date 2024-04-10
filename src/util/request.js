// 封装响应拦截器 包括 公共URL前缀、响应处理

// 导入axios
import axios from "axios";

import { ElMessage } from 'element-plus'

// 定义一个变量，记录公共的请求地址前缀
const baseURL = "http://localhost:8080/system";
const instance = axios.create({baseURL})


// 添加响应拦截器
instance.interceptors.response.use(
    result => {
        // 响应成功
        return result.data;
    },
    error => {
        ElMessage.error('服务器异常')
        // 响应失败
        return Promise.reject(error);
    }
)

// 对外暴露实例
export default instance;