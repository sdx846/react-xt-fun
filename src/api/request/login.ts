/**
 * description: 登录模块接口
 */
import axios from "../http";

// 登录接口
export const login = (params: any) => axios.post("cms-service/admin/adminUser/login", params);
// 获取登录信息接口
export const getLoginUserInfo = () => axios.get("cms-service/admin/adminUser/getLoginInfo")
//获取验证码图形
export const getVerifyCode = () => axios.get('common-service/kaptcha/get')
//验证验证码是否正确
export const checkVerifyCode = (params: any) => axios.post('common-service/kaptcha/validate', params)