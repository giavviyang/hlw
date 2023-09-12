//发送请求工具类 axios
//1,引入
import axios from "axios";
//2,创建server
const server = axios.create({
    baseURL:'https://shop-gw.chengxinyouxuan.com',// 域名
    timeout:5000, //超时链接
    headers:{
        "Content-Type":'application/json'
    }
})
//请求拦截（登录放token的地方）
server.interceptors.request.use(config=>{
    return config
})
//响应拦截（解码加密，公共逻辑判断）
server.interceptors.response.use(res=>{
    return res.data
})
export default server