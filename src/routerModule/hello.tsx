/*
 * @Description: hello路由
 */
import React from "react";
import { MenuMapItem } from "../assets/typings";
import { HomeOutlined } from "@ant-design/icons";

const routes: MenuMapItem = {
    title: "hello",
    icon: <HomeOutlined />,
    path: "/home/hello",
    key: "hello",
    isMenu: true,
    exact: true,
    noPermission: true,
    component: React.lazy(() => import("@/pages/hello/hello")),
};
export default routes;