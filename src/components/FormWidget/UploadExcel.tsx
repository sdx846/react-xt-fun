/*
 * @Description: 上传execl组件，用于导入数据
 */
import React, { useState, FC } from "react";
import { Upload, message, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { uploadExcelURL, headers } from "@/api/http";
import { UploadFile } from "antd/lib/upload/interface";
import { cloneDeep } from "lodash";

interface IProps {
    data?: any;
    getFile?: any;
    onSubmit?: (url: string) => void;
}

const UploadExcel: FC<IProps> = ({ getFile }) => {
    let [fileList, setFileList] = useState<UploadFile<any>[]>([]);

    const beforeUpload = (file: UploadFile) => {
        let fileValide = true;
        if (file.size / 1024 / 1024 > 5) {
            message.error("导入文件不能超过5MB!");
            fileValide = false;
        }
        if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
            message.error("请选择后缀为.xlsx或.xls的文件");
            fileValide = false;
        }
        if (fileValide) {
            if (getFile) {
                getFile(file);
            }
            setFileList([file]);
        }

        return false;
    };

    const onRemove = (file: UploadFile<any>) => {
        setFileList((fileList) => {
            const index = fileList.indexOf(file);
            const newFileList = cloneDeep(fileList);
            newFileList.splice(index, 1);
            return newFileList;
        });
        if (getFile) getFile(null);
    };

    return (
        <Upload
            action={uploadExcelURL}
            headers={headers}
            fileList={fileList}
            onRemove={onRemove}
            beforeUpload={beforeUpload}
        >
            {fileList.length < 1 && <Button icon={<PlusOutlined />}>上传文件</Button>}
        </Upload>
    );
};

export default UploadExcel;
