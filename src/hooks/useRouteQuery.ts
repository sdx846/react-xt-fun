/*
 * @Description: 路由传参存入session,防止刷新丢失,用于编辑详情页面
 */

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {sessionStore,localStore} from "@/utils/storage";

type UseRouteQuery = () => any;


const useRouteQuery: UseRouteQuery = () => {
    let [data, setData] = useState<any>();
    let { state } = useLocation<any>();

    useEffect(() => {
        let formatedquery = {};
        if (state) {
            sessionStore.setItem("routerQuery", state);
            formatedquery = state;
        } else {
            let cacheQuery = sessionStore.getItem("routerQuery");
            if (!cacheQuery) return;
            formatedquery = cacheQuery;
        }
        setData(formatedquery);
    }, [state]);

    return data;
};

export default useRouteQuery;
