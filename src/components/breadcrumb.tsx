/*
 * @Description: 面包屑组件，二次封装antd面包屑，根据路由信息自动生成
 */
import React, { useState, useEffect, FC } from "react";
import { Breadcrumb } from "antd";
import { useLocation, useHistory } from "react-router-dom";
import { localStore, sessionStore } from "../utils/storage";
import { MenuMapItem} from "../assets/typings";

const style = {
    height: "40px",
    lineHeight: "40px",
    padding: "0 16px",
    cursor: "pointer",
};

const MyBreadCrumb: FC<{ routeList: MenuMapItem[] }> = ({ routeList }) => {
    const history = useHistory();
    const { pathname } = useLocation();
    const currentRoutes = pathname.split("/").slice(2);
    let [breadMap, setBreadMap] = useState({});

    const getBreadMap = () => {
        let breadMap = {};
        routeList.forEach((item) => {
            breadMap[item.key] = item;
        });
        setBreadMap(breadMap);
    };

    const navLink = (breadItem) => {
        if (["add", "edit", "info"].includes(breadItem.key)) return; //新增，编辑，详情节点不跳转,因为key重复会出现错误
        const path = breadItem.path.replace(":id", sessionStore.getItem("urlId")); //路由参数写入url
        if (pathname === breadItem.path) return;
        history.push({ pathname: path });
    };

    useEffect(() => {
        getBreadMap();
    }, [routeList]);

    return (
        <Breadcrumb style={style}>
            {currentRoutes.map(
                (key) =>
                    breadMap[key] && (
                        <Breadcrumb.Item key={key} onClick={() => navLink(breadMap[key])}>
                            {breadMap[key].title}
                        </Breadcrumb.Item>
                    )
            )}
        </Breadcrumb>
    );
};

export default MyBreadCrumb;
