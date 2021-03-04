/*
 * @Description: 选择器组件
 */
import React, { FC } from "react";
import { Select } from "antd";

export interface OptionsType {
    value: any;
    label: string;
    style?: React.CSSProperties;
    children?: string | React.ReactNode;
}

interface IProps {
    options?: Array<OptionsType>;
    mode?: "multiple" | "tags";
    allowClear?: boolean;
    showSearch?: boolean;
    [key: string]: any;
}

// 默认设置回传显示值为 label，则可通过children属性设置展示更具体内容
const MySelect: FC<IProps> = ({ mode, allowClear = true, showSearch = true, options, ...otherProps }) => {
    return (
      <Select getPopupContainer={triggerNode => triggerNode.parentNode} mode={mode} optionFilterProp="children" optionLabelProp="label" allowClear={allowClear} showSearch={showSearch} {...otherProps}>
            {options?.map((option) => (
                <Select.Option value={option.value} label={option.label} key={option.value} style={option.style}>
                    {option.children || option.label}
                </Select.Option>
            ))}
        </Select>
    );
};

export default MySelect;
