/*
 * @Description: 通用上传图片组件，基于antd Upload组件二次封装，简化了部分参数
 */
import React, { FC } from "react";
import { Upload, message } from "antd";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { PlusOutlined } from "@ant-design/icons";
import { uploadImageURL, headers, uploadImageData } from "@/api/http";

interface IProps {
    fileList?: any[];
    maxLength?: number;
    uploadChange?: React.Dispatch<React.SetStateAction<any>>;
}

export const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

//用于将图片url生成antd上传组件所需格式
export const toAntdUploadFile = (url) => {
    let arr = [];
    if (Array.isArray(url)) {
        url = url.filter((item) => item.startsWith("http"));
        arr = url.map((item) => {
            return {
                uid: Math.random(),
                url: item,
                status: "done",
                response: {
                    data: {
                        id: Math.random(),
                        url: item,
                    },
                },
            };
        });
    }
    return arr;
};

const UploadImage: FC<IProps> = ({ children = <PlusOutlined />, fileList = [], uploadChange, maxLength = 1 }) => {
    const beforeUpload = (file) => {
        const accept = /^image/;
        if (!accept.test(file.type)) {
            message.error("只能上传图片文件!");
            return false;
        }
        if (file.size / 1024 / 1024 > 30) {
            message.error("上传图片总大小不能超过 30MB!");
            return false;
        }
        return true;
    };

    const onChange = (info: UploadChangeParam<UploadFile<any>>) => {
        let fileList = [...info.fileList];
        fileList.forEach((file) => {
            if (file.response) {
                if (file.response.code === 1) {
                    file.url = file.response.data.url;
                } else {
                    file.url = undefined;
                    file.thumbUrl = undefined;
                    file.status = "error";
                }
            }
        });
        if (uploadChange) uploadChange(fileList);
    };

    return (
        <Upload
            action={uploadImageURL}
            fileList={fileList}
            onChange={onChange}
            beforeUpload={beforeUpload}
            headers={headers}
            data={uploadImageData}
            listType="picture-card"
        >
            {fileList.length < maxLength && children}
        </Upload>
    );
};

export default UploadImage;
