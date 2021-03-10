import axios from "../http";
// 获取有效的角色
export const getRoleList = () => axios.post("cms-service/admin/role/findAll");