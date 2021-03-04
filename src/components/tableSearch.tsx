/*
 * @Author: Wangrenhai
 * @Description: 通用列表查询组件
 * @Date: 2020-10-16 16:43:35
 * @LastEditTime: 2021-01-07 16:20:53
 * @LastEditors: Mr.JOJO
 */
import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "antd";
import { FormInstance } from "antd/lib/form";
import { DownOutlined, UpOutlined, SearchOutlined, RollbackOutlined } from "@ant-design/icons";
import formWidget from "./FormWidget";
import { timeStringToMoment } from "../utils/tools";
// import style from "./index.module.css";
import { cloneDeep } from "lodash";
import { IFormType,FormRulesType, RouteComponentProps} from "../assets/typings";

interface IProps {
    formSearchItem: Array<IFormType>;
    search: React.Dispatch<React.SetStateAction<any>>;
    onValuesChange?: (changedValue: any, allValue: any, formInstance: FormInstance<any>) => void | (() => void);
    values: any;
    initialValues?: any;
}

type SubmitType = "search" | "reset";

//搜索表单布局
const layout = { xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 6 };

const FormSearch: React.FC<IProps> = ({
    formSearchItem = [],
    values = {},
    search,
    onValuesChange = () => {},
    initialValues = { pageNo: 1, pageSize: 2 },
}) => {
    const [form] = Form.useForm();
    let [searchItemArr, setSearchItemArr] = useState<Array<IFormType>>([]);
    let [isUnfold, setIsUnfold] = useState<boolean>(true);

    const onSubmit = (values: any) => {
        emitSearch({ ...values, pageNo: 1 });
    };

    const reset = () => {
        form.resetFields();
        // 通过form设置的值不会触发onValuesChange方法执行，则手动触发
        if (onValuesChange) {
            onValuesChange({}, {}, form);
        }
        emitSearch({}, "reset");
    };

    const emitSearch = (values: any, type: SubmitType = "search") => {
        let rangeTimeParams = {};
        let cascaderParams = {};
        searchItemArr.forEach(({ typeParams, type, name }) => {
            if (type === "date-picker") {
                if (values[name!]) {
                    values[name!] = values[name!].format("YYYY-MM-DD HH:mm:ss");
                }
            }
            // 如果存在范围选择器，则进行特殊处理，将数组格式改为对象格式，并使用传入的参数名，若未传参数，使用startTime,endTime作为默认值
            if (type === "date-range-picker") {
                if (values[name!] && values[name!].length) {
                    rangeTimeParams[typeParams?.start || "startTime"] = values[name!][0]
                        .startOf("day")
                        .format("YYYY-MM-DD HH:mm:ss");
                    rangeTimeParams[typeParams?.end || "endTime"] = values[name!][1]
                        .endOf("day")
                        .format("YYYY-MM-DD HH:mm:ss");
                } else {
                    rangeTimeParams[typeParams?.start || "startTime"] = undefined;
                    rangeTimeParams[typeParams?.end || "endTime"] = undefined;
                }
            }
            // 如果存在级联选择器，则进行特殊处理，将数组格式改为对象格式，并使用传入的参数名，若未传参数，使用["provinceId", "cityId", "areainfoId"]作为默认值
            if (type === "area-cascader" || type === "cascader") {
                let params = typeParams?.params || ["provinceId", "cityId", "areaInfoId"];
                params.forEach((param, index) => {
                    if (values[name!] && values[name!].length) {
                        cascaderParams[param] = values[name!][index];
                    } else {
                        cascaderParams[param] = undefined;
                    }
                });
            }
        });
        if (typeof search == "function") {
            if (type === "reset") {
                search({ pageNo: 1, pageSize: 2 });
            } else {
                search((searchParms) => ({
                    ...searchParms,
                    ...rangeTimeParams,
                    ...cascaderParams,
                    ...values,
                }));
            }
        }
    };
    // 超过三条表单会出现展开和收起按钮
    useEffect(() => {
        if (isUnfold) {
            setSearchItemArr(formSearchItem);
        } else {
            setSearchItemArr(formSearchItem.slice(0, 3));
        }
    }, [isUnfold, formSearchItem]);

    useEffect(() => {
        if (values) {
            // 解决参数为时间戳时，antd组件需将参数转化为moment形式的问题
            let formValue = cloneDeep(values);
            // 目前至多存在两层结构，固不使用递归（范围选择器的参数为数组形式，因此再特殊处理一次）
            Object.keys(formValue).forEach((key) => {
                formValue[key] = timeStringToMoment(formValue[key]);
                if (Array.isArray(formValue[key])) {
                    formValue[key].forEach((item, index) => {
                        formValue[key][index] = timeStringToMoment(item);
                    });
                }
            });
            form.setFieldsValue(formValue);
            // 手动触发表单change事件
            onValuesChange(formValue, formValue, form);
        }
    }, [values]);

    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onSubmit}
            // className={style.wrapper}
            form={form}
            initialValues={initialValues}
            onValuesChange={(changeValue, allValue) => onValuesChange(changeValue, allValue, form)}
        >
            <Row>
                {searchItemArr.map(({ type, typeParams, ...formTypeParams }) => (
                    <Col {...layout} key={formTypeParams.name}>
                        <Form.Item label={formTypeParams.label} name={formTypeParams.name}>
                            {formWidget({ type, typeParams })}
                        </Form.Item>
                    </Col>
                ))}
                <Col {...layout} style={{ textAlign: "right", marginLeft: "auto" }}>
                    <Form.Item wrapperCol={{ span: 24 }}>
                        <Button style={{ marginRight: "10px" }} onClick={reset} icon={<RollbackOutlined />}>
                            重置
                        </Button>
                        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                            查询
                        </Button>
                        <Button
                            type="link"
                            style={{ marginRight: "10px" }}
                            onClick={() => setIsUnfold((isUnfold) => !isUnfold)}
                        >
                            {formSearchItem.length > 3 && (
                                <>
                                    {!isUnfold && (
                                        <>
                                            <span>展开</span>
                                            <DownOutlined />
                                        </>
                                    )}
                                    {isUnfold && (
                                        <>
                                            <span>收起</span>
                                            <UpOutlined />
                                        </>
                                    )}
                                </>
                            )}
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default FormSearch;
