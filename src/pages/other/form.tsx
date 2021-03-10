import React, { useState, useEffect, FC } from "react";
import { DatePicker, Space, Form, Modal, Button} from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { FormRulesType, RouteComponentProps } from "../../assets/typings";
import formWidget from "@/components/FormWidget";
import { ADVERTISE_SPACE_TYPE, ADVERTISE_AREA_TYPE } from "@/assets/constant";

const MyForm: FC<RouteComponentProps> = ({ history }) => {
  const [form] = Form.useForm();
  let [formData, setFormData] = useState<any>({});
  let [show, setShow] = useState(false);
  //表单验证信息
  const formRules: FormRulesType = {
    source: [{ required: true, message: "请选择来源" }],
    area: [{ required: true, message: "请选择范围" }],
    url: [{ required: true, message: "请输入链接" }],
    name: [{ required: true, message: "请输入名称" }],
    cascaderData: [{ required: true, message: "请选择所属地区" }],
  };
  const reset = () => {
    form.resetFields();
    // 通过form设置的值不会触发onValuesChange方法执行，则手动触发
    // if (onValuesChange) {
    //   onValuesChange({}, {}, form);
    // }
  };
  const onSubmit = async (values) => {
    console.log(values);
  };
  return (
    <div>
      <Button type="primary" onClick={() => setShow(true)}>
        显示Form
      </Button>
      <Modal
        title="编辑"
        visible={show}
        onCancel={() => setShow(false)}
        forceRender
        onOk={form.submit}
      >
        <Form
          form={form}
          // onValuesChange={(changeValue, allValue) => onValuesChange(changeValue, allValue, form)}
          onValuesChange={(changedValues) =>
            setFormData((formData) => ({ ...formData, ...changedValues }))
          }
          onFinish={onSubmit}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={{
            name: "",
            source: "H5",
            area: "ALL",
            url: "",
          }}
        >
          <Form.Item label="名称" name="name" rules={formRules.name}>
            {formWidget({
              type: "input",
              typeParams: { placeholder: "请输入名称" },
            })}
          </Form.Item>
          <Form.Item label="来源" name="source" rules={formRules.source}>
            {formWidget({
              type: "select",
              typeParams: {
                options: ADVERTISE_SPACE_TYPE,
                placeholder: "请选择来源",
              },
            })}
          </Form.Item>
          <Form.Item label="范围" name="area" rules={formRules.area}>
            {formWidget({
              type: "select",
              typeParams: {
                options: ADVERTISE_AREA_TYPE,
                placeholder: "请选择范围",
              },
            })}
          </Form.Item>
          <Form.Item noStyle dependencies={["source", "area"]}>
            {({ getFieldValue }) =>
              getFieldValue("source") === "H5" &&
              getFieldValue("area") === "ALL" && (
                <Form.Item label="链接" name="url" rules={formRules.url}>
                  {formWidget({
                    type: "input",
                    typeParams: { placeholder: "请输入链接" },
                  })}
                </Form.Item>
              )
            }
          </Form.Item>
          <Form.Item
            label="所属地区"
            name="cascaderData"
            rules={formRules.cascaderData}
          >
            {formWidget({ type: "area-cascader" })}
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "10px" }}
          >
            确定
          </Button>
          <Button type="primary" onClick={() => form.resetFields()}>
            重置
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
export default MyForm;
