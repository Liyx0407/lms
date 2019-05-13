//request.js
import axios from "axios";
import Vue from 'vue'
import Router from 'vue-router';
Vue.use(Router);
import {
  Message,
  Loading
} from 'element-ui'
let baseURL = "";
let serverLoading;
let router = new Router();
// baseURL = 'http://127.0.0.1:8088';
baseURL = 'http://39.108.115.229:8088';8
// baseURL = 'http://192.168.1.115:8088';
/****** 创建axios实例 ******/
const service = axios.create({
  baseURL: baseURL, // api的base_url
  timeout: 5000 // 请求超时时间
});
/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(config => {
  serverLoading = Loading.service({
    text: "加载数据中....",
    lock: true,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
    fullscreen: true
  });
  config.method === 'post' ?
    config.data = JSON.stringify({
      ...config.data
    }) :
    config.params = {
      ...config.data
    }
  config.headers['Content-Type'] = (config.method === 'post' ? `application/json;charset=UTF-8` : `application/x-www-form-urlencoded`);
  config.headers['Authorization'] = localStorage.getItem("token");
  return config;
}, error => { //请求错误处理
  serverLoading.close();
  console.log(error, "error");
  Message.error({
    message: "服务器开小差啦~"
  });


  Promise.reject("请求超时")
});
/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
  response => { //成功请求到数据
    serverLoading.close();
    //这里根据后端提供的数据进行对应的处理
    if (response.data.success === true) {
      return Promise.resolve(response.data);
    } else {
      //1028 1024用户未登录
      //请求数据失败
      let code = response.data.code;
      if (code === 905) {
        localStorage.removeItem("token");
        window.location.reload();
        router.replace({
          path: "/login"
        });
      }
      Message.error({
        message: response.data.msg
      });
    }
  },
  error => { //响应错误处理
    serverLoading.close();
    Message.error({
      message: "请求超时"
    });

    return Promise.reject(error)
  }
);
export default service;
