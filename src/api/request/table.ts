/*
 * @Description: 广告发布管理接口
 */

import axios from "../http";

// 分页查询广告
export const pageAdPushList = (params) => axios.post("cms-service/ad-manage/data", params);
// 广告新增或编辑
export const saveAdPush = (params) => axios.post("cms-service/ad-manage/save", params);
// 广告详情获取
export const getAdPushInfo = (params) => axios.get("cms-service/ad-manage/info/" + params);
// 广告删除
export const removeAdPush = (params) => axios.post("cms-service/ad-manage/deletes", params);
// 清理广告缓存
export const clearAdPushCache = () => axios.post("cms-service/ad-manage/reloadRedisData");
// 清理广告缓存
export const rePushAdPush = (params) => axios.post("cms-service/ad-manage/repub/" + params);