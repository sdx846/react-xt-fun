/*
 * @Description: 输入框组件
 */
import React, { FC } from "react";
import { Input, Form } from "antd";
import formWidget from "./widget";
import { IFormType } from "../../assets/typings";

interface IProps {
  addonBefore?: IFormType;
  addonAfter?: IFormType;
  [key: string]: any;
}

// 默认将传入的addonBefore及addonAfter包裹Form.Item组件，使其被表单antd表单托管
const MyInput: FC<IProps> = ({ addonBefore, addonAfter, ...otherProps }) => {
  return (
    <Input
      {...otherProps}
      addonBefore={
        addonBefore && (
          <Form.Item noStyle name={addonBefore.name}>
            {formWidget({ ...addonBefore })}
          </Form.Item>
        )
      }
      addonAfter={
        addonAfter && (
          <Form.Item noStyle name={addonAfter.name}>
            {formWidget({ ...addonAfter })}
          </Form.Item>
        )
      }
    />
  );
};

export default MyInput;
