/**
 * description: 公共select接口
 */
import axios from "../http";

import { getCityList } from "@/api/request/area";
import { getRoleList } from "@/api/request/role";
import { getAllParkList } from "@/api/request/table";

export default {
    getCityList, //城市列表
    getRoleList, //角色列表
    getAllParkList, //停车场列表
};