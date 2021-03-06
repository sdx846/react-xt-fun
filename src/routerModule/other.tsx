import React from "react";
import { MenuMapItem } from "../assets/typings";
import { SettingOutlined } from "@ant-design/icons";

const routes: MenuMapItem = {
    title: "其他",
    path: "/home/other",
    key: "other",
    icon: <SettingOutlined />,
    exact: true,
    redirect: "/home/other/form",
    isMenu: true,
    isSubMenu: true,
    sign: "QT",
    children: [
        {
            path: "/home/other/form",
            key: "form",
            title: "表单",
            exact: true,
            isMenu: true,
            sign: "BD",
            component: React.lazy(() => import("../pages/other/form")),
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
            path: "/home/other/table",
            key: "table",
            title: "表格",
            exact: true,
            isMenu: true,
            sign: "BG",
          component: React.lazy(() => import("../pages/other/table/table")),
          children: [
            {
                path: "/home/other/table/add",
                key: "add",
                exact: true,
                title: "新增",
                isMenu: false,
                sign: "BG",
                component: React.lazy(() => import("@/pages/other/table/create/add")),
            },
            {
                path: "/home/other/table/edit",
                key: "edit",
                exact: true,
                title: "编辑",
                isMenu: false,
                sign: "BG",
                component: React.lazy(() => import("@/pages/other/table/create/add")),
            },
            {
              path: "/home/other/table/editTable1",
              key: "editTable",
              exact: true,
              title: "可编辑table1",
              isMenu: false,
              sign: "BG",
              component: React.lazy(() => import("@/pages/other/table/create/editTable1")),
            },
            {
              path: "/home/other/table/editTable2",
              key: "editTable",
              exact: true,
              title: "可编辑table2",
              isMenu: false,
              sign: "BG",
              component: React.lazy(() => import("@/pages/other/table/create/editTable2")),
          },
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
        path: "/home/other/map",
        key: "map",
        title: "地图",
        exact: true,
        isMenu: true,
        sign: "DT",
        component: React.lazy(() => import("../pages/other/map")),
    },
    ],
};
export default routes;
