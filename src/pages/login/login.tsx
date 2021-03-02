import React, { useState, useEffect, FC } from "react";
import { Form, Input, Row, Col, Button, Checkbox, message} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { FormRulesType, RouteComponentProps} from "../../assets/typings";
import style from "./login.module.css";
import * as loginApi from '../../api/request/login';
import {localStore,sessionStore} from "../../utils/storage";

const Login: FC<RouteComponentProps> = ({ history }) => {
  const [form] = Form.useForm();
    let [loading, setLoading] = useState(false);
  let [verifyImg, setVerifyImg] = useState<any>({});
  let [uuid, setUuid] = useState('');
    let [remember, setRemember] = useState<boolean>(false);

  const formRules: FormRulesType = {
    loginName: [{ required: true, message: "请输入用户名" }],
    password: [{ required: true, message: "请输入密码" }],
    code: [{ required: true, message: "请输入验证码" }],
  };
  useEffect(() => {
    getVerifyCodeImg();
    const loginInfo = localStore.getItem("loginInfo");
    if (loginInfo) {
      const mo = moData(loginInfo);
      form.setFieldsValue(mo);
    }
}, [form]);
  const getVerifyCodeImg=()=>{
    loginApi.getVerifyCode().then(res => {
      setVerifyImg(`data:image/bmp;base64,${res.data.imgBase64}`);
      setUuid(res.data.uuid);
    })
  }
  const getUserInfo = () => {
    loginApi.getLoginUserInfo().then(res => {
      const { code, data} = res;
      if (code !== 1) {
        return;
      }
      localStore.setItem("userInfo", data);
      message.success("登录成功");
      history.push({ pathname: "/home" });
    });
  }
  const handleRemember = (e: any) => {
    setRemember(e.target.checked);
  }
  const onSubmit = async(values: any) => { 
    setLoading(true);
    let res = await loginApi.login({ ...values, uuid: uuid });
    setLoading(false);
    if (!res) return;
    localStore.setItem("token", res.data.token);
    if (remember) {
      localStore.setItem('loginInfo', moData(values));
    } else {
      localStore.removeItem('loginInfo');
    }
    getUserInfo();
  }
  const moData=(mo: any)=> {
    return {
      loginName: mo.loginName,
      password: mo.password,
      remember:mo.remember || remember
    }
  }
    return (
      <div className={style.wrapper}>
        <div className={style.formWrapper}>
          <div className={style.title}>后台管理系统</div>
          <Form onFinish={onSubmit} form={form}>
            <Form.Item rules={formRules.loginName} name="loginName">
              <Input
                prefix={<UserOutlined />}
                size="large"
                placeholder="请输入用户名"
              />
            </Form.Item>
            <Form.Item rules={formRules.password} name="password">
              <Input.Password
                prefix={<LockOutlined />}
                size="large"
                placeholder="请输入密码"
                type="password"
              />
            </Form.Item>
            <Form.Item rules={formRules.code} name="code">
              <Row gutter={20}>
                <Col span={14}>
                  <Input size="large" placeholder="请输入验证码"/>
                </Col>
                <Col span={10}>
                  <img
                    src={verifyImg}
                    className={style.vertifyImg}
                    height={40}
                    width={165}
                    onClick={getVerifyCodeImg}
                  />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Checkbox checked={remember} onChange={handleRemember}>
                记住密码
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button
                className="btn-bg"
                size="large"
                shape="round"
                block
                htmlType="submit"
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  
}
export default Login;
