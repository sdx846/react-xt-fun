/*
 * @Description: 封装页面查询参数及分页参数，存储于sessionstorage中，用于跳转后保留页面状态
 */
import { useState, useEffect } from "react";
import { cloneDeep } from "lodash";
import {sessionStore,localStore} from "@/utils/storage";
import moment from "moment";

type UseSearchParams = (key: string, initialValues?: any) => [any, React.Dispatch<any>, boolean];

const useSearchParams: UseSearchParams = (key, initialValues = { pageNo: 1, pageSize: 10 }) => {
    let [searchParams, setSearchParams] = useState<any>({});
    let [cacheValue, setCacheValue] = useState<any>({});
    let [isReady, setIsReady] = useState<boolean>(false);

    const momentToString = (value) => {
        if (moment.isMoment(value)) {
            return value.format("YYYY-MM-DD HH:mm:ss");
        }
        return value;
    };

    useEffect(() => {
        let storageValue = sessionStore.getItem("searchParams");
        if (storageValue) {
            setCacheValue(storageValue);
            if (storageValue[key]) {
                setSearchParams(storageValue[key]);
                return;
            }
        }
        setSearchParams(initialValues);
    }, []);

    useEffect(() => {
        let cloneValue = cloneDeep(searchParams);
        let paramsKeys = Object.keys(cloneValue);
        if (paramsKeys.length > 0) {
            setIsReady(true);
        } else {
            setIsReady(false);
        }
        // 处理范围时间选择器参数
        paramsKeys.forEach((paramsKey) => {
            cloneValue[paramsKey] = momentToString(cloneValue[paramsKey]);
            // 目前至多存在两层结构，固不使用递归（范围选择器的参数为数组形式，因此再特殊处理一次）
            if (Array.isArray(cloneValue[paramsKey])) {
                cloneValue[paramsKey].forEach((item, index) => {
                    cloneValue[paramsKey][index] = momentToString(item);
                });
            }
        });
        sessionStore.setItem("searchParams", { ...cacheValue, [key]: cloneValue });
    }, [searchParams]);

    return [searchParams, setSearchParams, isReady];
};

export default useSearchParams;
