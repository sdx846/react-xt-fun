/*
 * @Description: 自定义hooks入口文件
 */

import useUserInfo from "./useUserInfo";
import useRouteQuery from "./useRouteQuery";
import useSelectList from "./useSelectList";
import useSearchParams from "./useSearchParams";

export default {
    useUserInfo, //获取用户信息
    useRouteQuery, //获取路由传参
    useSelectList, //使用选择器数据
    useSearchParams, //使用查询参数
};
