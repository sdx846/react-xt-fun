/*
 * @Description: 常量定义文件
 */

import React from "react";
import { Tag } from "antd";
import MyIcon from "@/components/myIcon";
import colors from "./tagColor";
const { processing, success, error, warn, closed } = colors;

interface ConstantItem {
    value: string | number | boolean;
    label: string;
    icon?: React.ReactNode;
    color?: string;
}

type FindCounstant = (constant: ConstantItem[], value: string | number | boolean) => ConstantItem | undefined;

// 查询常量方法
export const findConstant: FindCounstant = (constant, value) => {
    return constant.find((item) => item.value === value);
};

// 常量tag显示组件
export const ConstantTag: React.FC<{ constant: ConstantItem | undefined }> = ({ constant }) => {
    return <>{constant && <Tag color={constant.color}>{constant.label}</Tag>}</>;
};

// 带icon的常量显示组件
export const ConstantIcon: React.FC<{ constant: ConstantItem | undefined }> = ({ constant }) => {
    return (
        <>
            {constant && (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {constant.icon}
                    <div style={{ marginLeft: 8 }}> {constant.label}</div>
                </div>
            )}
        </>
    );
};

//  状态常量
export const STATUS: ConstantItem[] = [
    { value: "ACTIVE", label: "有效", color: success },
    { value: "INVALID", label: "无效", color: error },
];


// 广告位所属模块
export const ADVERTISE_SPACE_TYPE: ConstantItem[] = [
  { value: "H5", label: "公众号", icon: <MyIcon type="icon-wx" /> },
  { value: "MP", label: "小程序", icon: <MyIcon type="icon-wxxcx" /> },
  { value: "OTHER", label: "其他", icon: <MyIcon type="icon-qita" /> },
];
// 广告位展示方式
export const ADVERTISE_SPACE_SHOW_TYPE: ConstantItem[] = [
  { value: 1, label: "叠加", color: processing },
  { value: 2, label: "滚动", color: success },
];

// 广告位使用范围
export const ADVERTISE_AREA_TYPE: ConstantItem[] = [
  { value: "ALL", label: "全平台", color: success },
  { value: "BY_AREA", label: "地区", color: warn },
  { value: "BY_PARK", label: "停车场", color: processing },
];

// 广告状态
export const ADVERTISE_PUSH_STATUS: ConstantItem[] = [
  { value: "ON", label: "投放中", color: success },
  { value: "EXPIRED", label: "已过期", color: warn },
  { value: "DELETED", label: "已删除", color: error },
];
// 广告显示状态
export const ADVERTISE_PUSH_SHOW_STATUS: ConstantItem[] = [
  { value: "ON", label: "显示", color: success },
  { value: "OFF", label: "不显示", color: error },
];
// 广告显示顺序
export const ADVERTISE_PUSH_LEVEL: ConstantItem[] = [
  { value: 1, label: "一级" },
  { value: 2, label: "二级" },
  { value: 3, label: "三级" },
  { value: 4, label: "四级" },
  { value: 5, label: "五级" },
];

