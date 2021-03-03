import React, { useState, useEffect, FC } from "react";
import { DatePicker, Space } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { FormRulesType, RouteComponentProps} from "../../assets/typings";

const MyForm: FC<RouteComponentProps> = ({ history }) => {


  const onChange=(date, dateString)=> {
    console.log(date, dateString);
  }
    return (
      <DatePicker onChange={onChange} />
    );
  
}
export default MyForm;
