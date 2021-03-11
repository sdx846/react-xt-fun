import React from "react";
import { MenuMapItem } from "../assets/typings";
import { SettingOutlined } from "@ant-design/icons";

const routes: MenuMapItem = {
    title: "系统管理",
    path: "/home/system",
    key: "system",
    icon: <SettingOutlined />,
    exact: true,
    redirect: "/home/system/role",
    isMenu: true,
    isSubMenu: true,
    sign: "XTGL",
    children: [
        {
            path: "/home/system/role",
            key: "role",
            title: "角色管理",
            exact: true,
            isMenu: true,
            sign: "JSGL",
            component: React.lazy(() => import("../pages/system/role")),
            children: [
                // {
                //     path: "/home/system/role/add",
                //     key: "add",
                //     exact: true,
                //     title: "新增",
                //     isMenu: false,
                //     sign: "JSGL",
                //     component: React.lazy(() => import("@/pages/home/System/Role/Edit")),
                // },
                // {
                //     path: "/home/system/role/edit/:id",
                //     key: "edit",
                //     exact: true,
                //     title: "编辑",
                //     isMenu: false,
                //     sign: "JSGL",
                //     component: React.lazy(() => import("@/pages/home/System/Role/Edit")),
                // },
                // {
                //     path: "/home/system/role/info/:id",
                //     key: "info",
                //     title: "详情",
                //     exact: true,
                //     isMenu: false,
                //     sign: "JSGL",
                //     component: React.lazy(() => import("@/pages/home/System/Role/Info")),
                // },
            ],
        },
        {
            path: "/home/system/menupermission",
            key: "menupermission",
            title: "菜单权限管理",
            exact: true,
            isMenu: true,
            sign: "CDQXGL",
            component: React.lazy(() => import("../pages/system/rightMenu")),
        },
    ],
};
export default routes;
