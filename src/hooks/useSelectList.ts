/*
 * @Description: 公用列表查询hook，主要用于需要异步获取数据的select组件
 */

import { useState, useEffect } from "react";
import selectListApi from "@/api/request/commonSelect";

export interface ListItems {
    value: any;
    label: string;
    [key: string]: any;
}

type UseSelectList = (listName: ListName) => Array<ListItems>;

type ListName = "park" | "company" | "city" | "role";

const useSelectList: UseSelectList = (listName) => {
    let [list, setList] = useState<ListItems[]>([]);
    let [searchApi, setSearchApi] = useState<string>("");
    let [searchName, setSearchName] = useState<string>("");

    const getData = async () => {
        let res = await selectListApi[searchApi]();
        if (!res) return;
        let list: any[];
        if (res.data.content) {
            list = res.data.content.map((item: any) => ({ ...item, value: item.id, label: item[searchName] }));
        } else {
            list = res.data.map((item: any) => ({ ...item, value: item.id, label: item[searchName] }));
        }
        setList(list);
    };
    useEffect(() => {
        switch (listName) {
            case "park":
                setSearchApi("getAllParkList");
                setSearchName("name");
                break;
            case "company":
                setSearchApi("pageCompanyList");
                setSearchName("companyName");
                break;
            case "city":
                setSearchApi("getCityList");
                setSearchName("name");
                break;
            case "role":
                setSearchApi("getRoleList");
                setSearchName("name");
                break;
            default:
                throw new Error("不存在的接口名称");
        }
    }, []);
    useEffect(() => {
        if (!searchApi || !searchName) return;
        getData();
    }, [searchApi, searchName]);

    return list;
};

export default useSelectList;
