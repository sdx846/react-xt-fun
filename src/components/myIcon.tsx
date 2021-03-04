/*
 * @Description: Icon组件，使用iconfont生成图表，使用antd icon组件生成自定义图标
 */
import React, { FC } from "react";
import { createFromIconfontCN } from "@ant-design/icons";

interface IProps {
    type: string;
    style?: React.CSSProperties;
}

const IconInstance = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_2157849_1exkhq4ch7a.js", // 在 iconfont.cn 上生成
});

const MyIcon: FC<IProps> = ({ type, style = { fontSize: 18 } }) => {
    return <IconInstance type={type} style={style} />;
};

export default MyIcon;
