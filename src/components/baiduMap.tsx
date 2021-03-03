/*
 * @Description: 停车场位置选择百度地图组件
 */
import React, { useState, useEffect, FC, useRef } from "react";
import { Input, Form, message } from "antd";
import BMap from "BMap";

interface IProps {
    initialPoint: { longitude: number; latitude: number };
    getPoint: (point: [number, number]) => void;
}

const BaiduMap: FC<IProps> = ({ initialPoint, getPoint }) => {
    const map = useRef<any>(); //地图对象
    const marker = useRef<any>(); //标注对象
    const [point, setPoint] = useState<{ lng: number; lat: number }>(new BMap.Point(initialPoint.longitude, initialPoint.latitude)); //坐标对象

    const initMap = () => {
        map.current.centerAndZoom(point, 15);
        map.current.enableScrollWheelZoom(true);
        //添加地图点击事件，获取点击坐标
        map.current.addEventListener("click", (e: any) => {
            setPoint(new BMap.Point(e.sf.lng, e.sf.lat));
        });
        //设置标注对象允许拖拽，监听拖拽事件，获取拖拽结束后的坐标
        marker.current.enableDragging();
        marker.current.addEventListener("dragend", (e: any) => {
            setPoint(new BMap.Point(e.point.lng, e.point.lat));
        });
    };

    const localSearch = (value: string) => {
        if (!value) return message.warn("请输入地名后再查询");
        const localSearch = new BMap.LocalSearch(map.current, {
            onSearchComplete: (result: any) => {
                //查询完成后的回调函数
                if (!result.getPoi(0)) return message.warn("未查询到该地名");
                map.current.clearOverlays();
                setPoint(result.getPoi(0).point);
            },
            renderOptions: { map: map.current, autoViewport: true },
        });
        localSearch.search(value);
    };

    useEffect(() => {
        //初始化地图，标注，坐标对象
        map.current = new BMap.Map("baidu-map");
        marker.current = new BMap.Marker();
        initMap();
    }, []);

    useEffect(() => {
        // 监听point对象变化，更新标注
        marker.current.setPosition(point);
        map.current.addOverlay(marker.current);
        //将坐标值返回给父组件
        if (getPoint) getPoint([point.lng, point.lat]);
    }, [point]);

    return (
        <>
            <Form layout="inline">
                <Form.Item label="具体地名">
                    <Input.Search enterButton onSearch={(value) => localSearch(value)} />
                </Form.Item>
                <Form.Item label="经度">{point.lng}</Form.Item>
                <Form.Item label="纬度">{point.lat}</Form.Item>
            </Form>
            <div id="baidu-map" style={{ width: "100%", height: 400, marginTop: 20 }}></div>
        </>
    );
};

export default BaiduMap;
