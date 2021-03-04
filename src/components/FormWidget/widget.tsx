/*
 * @Description: form表单组件整合，通过传入type属性获得对应组件
 */

import React from "react";
import {
  Input,
  InputNumber,
  Switch,
  TimePicker,
  Radio,
  TreeSelect,
  Cascader,
} from "antd";
import MyInput from "./Input";
import MySelect, { OptionsType } from "./Select";
import AreaCascader, { CascaderOptionsType } from "./AreaCascader";
import MyDatePicker from "./DatePicker";
import MyDateRangePicker from "./DateRangePicker";
import UploadImage from "@/components/FormWidget/UploadImage";
import { IFormType } from "../../assets/typings";

export interface FormItemType {
  label?: string; //表单标题
  name?: string; //表单字段名
  type?: FormWidgetTypes; //表单类型
  options?: Array<OptionsType> | Array<CascaderOptionsType>; //枚举类表单数据
  params?: string[]; //级联选择表单参数名数组
  changeOnSelect?: boolean; //级联组件是否可以选择部分
  addonBefore?: IFormType; //input组件前缀
  addonAfter?: IFormType; //input组件后缀
  start?: string; //时间范围选择器开始字段
  end?: string; //时间范围选择器结束字段
  limitFuture?: boolean; //时间选择器，时间限制 未来不可选择
  limitPast?: boolean; //时间选择器，时间限制 过去不可选择
  moreThan?: string; //时间选择器，时间限制 大于该值不可选择
  lessThan?: string; //时间选择器，时间限制 小于该值不可选择
  fileList?: any[]; //upload组件文件列表
  maxLength?: number; //upload最大长度
  uploadChange?: React.Dispatch<React.SetStateAction<any>>; //upload组件回调函数，setState函数设置fileList
  [key: string]: any;
}

export type FormWidgetTypes =
  | "input"
  | "input-number"
  | "input-password"
  | "textarea"
  | "switch"
  | "select"
  | "cascader"
  | "area-cascader"
  | "tree-select"
  | "radio"
  | "radio-button"
  | "date-picker"
  | "date-range-picker"
  | "time-picker"
  | "time-range-picker"
  | "image-uploader";

export interface FormWidgetProps {
  type?: FormWidgetTypes;
  typeParams?: FormItemType;
}
type FormWidget = ({
  type,
  typeParams,
}: FormWidgetProps) => React.ReactNode | null;

const formWidget: FormWidget = ({ type, typeParams }) => {
  let element: React.ReactNode | null = null;
  let options: Array<OptionsType> | Array<CascaderOptionsType> | undefined;
  if (typeParams) {
    options = typeParams.options;
  }

  switch (type) {
    case "input":
      element = <MyInput {...typeParams} />;
      break;
    case "input-number":
      element = <InputNumber {...typeParams} />;
      break;
    case "input-password":
      element = <Input.Password {...typeParams} />;
      break;
    case "textarea":
      element = <Input.TextArea {...typeParams} />;
      break;
    case "switch":
      element = <Switch {...(typeParams as any)} />;
      break;
    case "select":
      element = (
        <MySelect {...typeParams} options={options as Array<OptionsType>} />
      );
      break;
    case "cascader":
      element = (
        <Cascader
          allowClear
          {...typeParams}
          options={options as Array<CascaderOptionsType>}
        />
      );
      break;
    case "area-cascader":
      element = <AreaCascader {...typeParams} />;
      break;
    case "tree-select":
      element = (
        <TreeSelect
          allowClear
          {...typeParams}
          options={options as Array<CascaderOptionsType>}
        />
      );
      break;
    case "radio":
      element = (
        <Radio.Group {...typeParams} options={options as Array<OptionsType>} />
      );
      break;
    case "radio-button":
      element = (
        <Radio.Group
          optionType="button"
          buttonStyle="solid"
          {...typeParams}
          options={options as Array<OptionsType>}
        />
      );
      break;
    case "date-picker":
      element = <MyDatePicker {...typeParams} />;
      break;
    case "date-range-picker":
      element = <MyDateRangePicker {...typeParams} />;
      break;
    case "time-picker":
      element = (
        <TimePicker {...typeParams} style={{ width: "100%" }} allowClear />
      );
      break;
    case "time-range-picker":
      element = (
        <TimePicker.RangePicker
          {...typeParams}
          style={{ width: "100%" }}
          allowClear
        />
      );
      break;
    case "image-uploader":
      element = UploadImage({
        fileList: typeParams?.fileList,
        uploadChange: typeParams?.uploadChange,
        maxLength: typeParams?.maxLength,
        ...typeParams,
      });
      break;
  }
  return element;
};
export default formWidget;
