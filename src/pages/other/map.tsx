import React, { useState, useEffect, FC } from "react";
import { DatePicker, Space } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { FormRulesType, RouteComponentProps} from "../../assets/typings";
import BaiduMap from "../../components/baiduMap";

const MyMap: FC<RouteComponentProps> = ({ history }) => {

    let [addressPoint, setAddressPoint] = useState({ longitude: 104.072578, latitude: 30.663265 });

    return (
      <BaiduMap
                    initialPoint={addressPoint}
                    getPoint={([longitude, latitude]) => setAddressPoint({ longitude, latitude })}
                />
    );
  
}
export default MyMap;
