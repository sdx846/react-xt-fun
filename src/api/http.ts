/*
 * @Description: axios拦截器，接口请求配置文件
 */

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, Method } from "axios";
import { message } from "antd";
import { cloneDeep } from "lodash";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {localStore,sessionStore} from "../utils/storage";

NProgress.configure({ easing: "ease", speed: 800, showSpinner: true });

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://test.easy-parking.cn/easypark/'
    : 'http://' + window.location.host + '/easypark/';
const axiosInstance = axios.create({
    baseURL,
    timeout: 30000,
});

// axios请求拦截
axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
    // 此处若使用引入的header会出现错误，暂未找到解决方案
    config.headers = {
        "api-version": "1.0",
        'authorization': localStore.getItem("token"),
    };
    return config;
});

// axios响应拦截器
axiosInstance.interceptors.response.use(
    (res: AxiosResponse) => {
        if (res.headers["content-type"] === "application/json;charset=UTF-8") {
            if (res.data.code === 1) {
                return Promise.resolve(res.data);
            } else {
                if (res.data.msg) {
                    return Promise.reject(res.data.msg);
                }
                return Promise.reject("请求错误，请重试");
            }
        } else {
            if (res.data.size) {
                return Promise.resolve(res);
            } else {
                return Promise.reject("请求错误，请重试");
            }
        }
    },
    (err: AxiosError) => {
        const { code, message, response } = err;
        console.error("响应错误", `${code},${message}`);
        if (code === "ECONNABORTED" || message === "Network Error") {
            return Promise.reject("网络请求超时，请检查网络连接或刷新重试");
        }
        if (response) {
            switch (response.status) {
                case 401:
                    return Promise.reject("会话已过期，请重新登录!");
                case 500:
                    return Promise.reject("服务器内部错误");
                default:
                    return Promise.reject(response.data.msg || "请求错误，请重试");
            }
        }
    }
);

// http请求类
class HttpRequest {
    /**
     * @description:请求主函数
     * @param {AxiosRequestConfig} axiosRequestConfig 请求参数
     * @return {Promise<any>} 响应结果，为Promise<any>或false
     */
    private request = async (axiosRequestConfig: AxiosRequestConfig): Promise<any> => {
        let { url, data, params, method, responseType = "text" } = axiosRequestConfig;
        let result: any;
        NProgress.start();
        try {
            result = await axiosInstance({
                url,
                method,
                params,
                data,
                responseType,
            });
        } catch (err) {
            message.destroy();
            message.error(err);
            result = false;
        }
        NProgress.done();
        return result;
    };

    // get请求
    public get = (url: string, params: any = {}) => {
        return this.request({
            url,
            params,
            method: "get",
        });
    };

    // post请求
    public post = (url: string, data: any = {}) => {
        return this.request({
            url,
            data,
            method: "post",
        });
    };

    // put请求
    public put = (url: string, data: any = {}) => {
        return this.request({
            url,
            data,
            method: "put",
        });
    };

    // delete请求
    public delete = (url: string, params: any = {}) => {
        return this.request({
            url,
            params,
            method: "delete",
        });
    };

    // 使用axios组件手动上传文件
    public uploadFile = (url: string, params: { file: Blob; [key: string]: any }) => {
        let formData = new FormData();
        Object.entries(params).forEach((item) => {
            formData.append(item[0], item[1]);
        });
        return this.request({
            url,
            data: formData,
            method: "post",
            headers: { "Content-Type": "multipart/form-data" },
        });
    };

    // 获取blob格式的数据
    public getBlob = (url: string, params: any = {}, method: Method = "get") => {
        return this.request({
            url,
            params,
            data: params,
            method,
            responseType: "blob",
        });
    };

    // 导出电子表格方法，封装默认参数为 1页5000条
    public export = (url: string, params: any = {}) => {
        // 如params对象不包含 exportPage ，则默认为导出五千条
        let { exportPage } = params;
        let initialExportPage = exportPage || { pageNo: 1, pageSize: 5000 };
        let data = cloneDeep({ ...params, ...initialExportPage });
        return this.request({
            url,
            data,
            method: "post",
            responseType: "blob",
        });
    };
}

const httpRequest = new HttpRequest();

export default httpRequest;
