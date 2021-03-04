import axios from "../http";

//获取可选城市
export const getCityList = (params) => axios.post("common-service/app/areaInfo/getAllCityForSelect", params);
//获取所有省份
export const getallProvince = () => axios.get("common-service/app/areaInfo/allProvince");
// 根据id获取其下区域（市，县等）
export const getAreasById = (params) => axios.get("common-service/app/areaInfo/areas/" + params);
//根据id查询城市详情
export const getAreaInfoById = (params) => axios.get("common-service/app/areaInfo/area/" + params);