/*
 * @Description: 获取sessionStorage里的userInfo数据
 */
import { useState, useEffect } from "react";
import {sessionStore,localStore} from "@/utils/storage";

type UseUserInfo = () => UserInfo;

interface UserInfo {
    email: string;
    headPortrait: string;
    loginName: string;
    mobile: string;
    nickName: string;
    parkManager: boolean;
    remark: string;
    roleEOList: any[];
    routerList: string[];
    superManager: boolean;
}

const useUserInfo: UseUserInfo = () => {
    const [userInfo, setUserInfo] = useState<UserInfo>({
        email: "",
        headPortrait: "",
        loginName: "",
        mobile: "",
        nickName: "",
        parkManager: false,
        remark: "",
        roleEOList: [],
        routerList: [],
        superManager: false,
    });

    useEffect(() => {
        let userInfo = localStore.getItem("userInfo");
        setUserInfo(userInfo);
    }, []);

    return userInfo;
};

export default useUserInfo;
