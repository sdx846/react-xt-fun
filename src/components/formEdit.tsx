/*
 * @Description: 通用新增编辑组件，用于简单的编辑表单
 */
import React, { useEffect, useContext, FC } from "react";
import { useHistory } from "react-router-dom";
import { Form, Card, Button, Typography, Row, Col } from "antd";
import { FormInstance, FormRulesType} from "../assets/typings";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import formWidget, { FormWidgetTypes, FormWidgetProps } from "@/components/FormWidget";
import { normFile } from "@/components/FormWidget/UploadImage";
import Store from "./store";


interface IProps {
  formItems: Array<IFormType>;
  onSubmit: (values: any) => void;
  formRules: FormRulesType;
  title: string;
  formData?: any;
  onValuesChange?: (changedValue: any, allValue: any, formInstance: FormInstance<any>) => void | (() => void);
}

export interface IFormType extends FormWidgetProps {
  formType?: "normal" | "read-only" | "list" | "group";
  label?: string;
  name?: string;
  extra?: React.ReactNode;
  tooltip?: React.ReactNode;
  required?: boolean;
  value?: any;
  addTitle?: React.ReactNode;
  addMethod?: any;
  removeTitle?: React.ReactNode;
  removeMethod?: any;
  children?: Array<IFormType>;
}

const { Title } = Typography;

const ComonEdit: FC<IProps> = ({ formItems, onSubmit, formRules, title, formData, onValuesChange = () => null }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  let { submitLoading } = useContext(Store);

  const getValueFromEvent = (type: FormWidgetTypes) => {
      if (type === "image-uploader") return normFile;
  };

  const getValuePropName = (type: FormWidgetTypes) => {
      switch (type) {
          case "image-uploader":
              return "fileList";
          case "switch":
              return "checked";
          default:
              return "value";
      }
  };

  useEffect(() => {
      form.setFieldsValue(formData);
  }, [formData]);

  return (
      <Card
          title={<Title level={4}>{title}</Title>}
          extra={
              <Button type="primary" onClick={() => history.go(-1)}>
                  返回
              </Button>
          }
          actions={[
              <div style={{ textAlign: "center" }}>
                  <Button type="primary" style={{ width: "100px", marginRight: "20px" }} size="large" onClick={form.submit} loading={submitLoading}>
                      确认
                  </Button>
                  <Button style={{ width: "100px" }} size="large" onClick={() => history.go(-1)}>
                      取消
                  </Button>
              </div>,
          ]}
      >
          <Form
              form={form}
              onFinish={onSubmit}
              onValuesChange={(changedValue, allValue) => onValuesChange(changedValue, allValue, form)}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
          >
              {formItems.map(({ formType, type, typeParams, ...formTypeParams }) => {
                  let element;
                  switch (formType) {
                      case "read-only":
                          element = (
                              <Form.Item {...formTypeParams} key={formTypeParams?.label} required>
                                  {formTypeParams?.value}
                              </Form.Item>
                          );
                          break;
                      case "list":
                          element = (
                              <Form.Item {...formTypeParams} key={formTypeParams?.name}>
                                  <Form.List name={formTypeParams?.name!}>
                                      {(fields, { add, remove }) => {
                                          return (
                                              <>
                                                  {fields.map((field) => (
                                                      <div
                                                          key={field.key}
                                                          style={{
                                                              width: "100%",
                                                              display: "flex",
                                                              alignItems: "center",
                                                              justifyContent: "space-between",
                                                          }}
                                                      >
                                                          {formTypeParams?.children?.map(({ formType, type, typeParams, ...formTypeParams }) => (
                                                              <Form.Item
                                                                  {...field}
                                                                  name={[field.name, formTypeParams?.name!]}
                                                                  fieldKey={[field.fieldKey, typeParams?.name!]}
                                                                  rules={formRules[typeParams?.name!]}
                                                                  style={{ flex: 1, marginRight: 8 }}
                                                              >
                                                                  {formWidget({ type, typeParams })}
                                                              </Form.Item>
                                                          ))}
                                                          <Button
                                                              style={{ marginBottom: 24 }}
                                                              type="primary"
                                                              danger
                                                              onClick={() => formTypeParams?.removeMethod(field.name, remove)}
                                                              icon={<MinusCircleOutlined />}
                                                          >
                                                              {formTypeParams?.removeTitle || "删除"}
                                                          </Button>
                                                      </div>
                                                  ))}
                                                  <div>
                                                      <Button type="primary" onClick={() => formTypeParams?.addMethod(add)} icon={<PlusOutlined />}>
                                                          {formTypeParams?.addTitle || "添加"}
                                                      </Button>
                                                  </div>
                                              </>
                                          );
                                      }}
                                  </Form.List>
                              </Form.Item>
                          );
                          break;
                      case 'group':
                          element = (
                            <Form.Item {...formTypeParams} key={formTypeParams?.name} required={formTypeParams?.required}>
                              <Row>
                                {formTypeParams?.children?.map(({ formType, type, typeParams, ...formTypeParams },index) => (
                                  <>
                                      <Col span={11}>
                                          <Form.Item
                                              noStyle
                                              {...formTypeParams}
                                              rules={formRules[formTypeParams?.name!]}
                                              key={formTypeParams?.name}
                                              valuePropName={getValuePropName(type!)}
                                              getValueFromEvent={getValueFromEvent(type!)}
                                          >
                                              {formWidget({ type, typeParams })}
                                          </Form.Item>
                                        </Col>
                                    {index === 0&&(<Col span={2}></Col>)}
                                    </>
                                ))}
                              </Row>
                        </Form.Item>
                          );
                          break;
                      case "normal":
                      default:
                          element = (
                              <Form.Item
                                  {...formTypeParams}
                                  rules={formRules[formTypeParams?.name!]}
                                  key={formTypeParams?.name}
                                  valuePropName={getValuePropName(type!)}
                                  getValueFromEvent={getValueFromEvent(type!)}
                              >
                                  {formWidget({ type, typeParams })}
                              </Form.Item>
                          );
                          break;
                  }
                  return element;
              })}
          </Form>
      </Card>
  );
};

export default ComonEdit;
