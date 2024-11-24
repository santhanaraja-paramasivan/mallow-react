/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Form, Input, Checkbox, Typography, Row, Col, Space, message } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/service/query/endpoints/LoginApi";
import { setLocalStorage } from "@/lib/utils";
import { LOCAL_CONSTANTS } from "@/constants/localConstant";
import { updateUserInfo } from "@/slice/appSlice";
import { useAppDispatch } from "@/hooks/redux";

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleLoginSuccess = (response: any, email:string) => {
    if (response.token) {
      dispatch(updateUserInfo({...response, email}));
      if (rememberMe) {
        setLocalStorage(LOCAL_CONSTANTS.ACCESS, response.token);
      }
      navigate("/");
      console.log("Login successful:", response);
    }
  };

  const handleLoginError = (error: any) => {
    console.error("Login failed:", error);
    message.error("Login failed. Please check your credentials and try again.");
  };

  const handleSubmit = async (values: any) => {
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      handleLoginSuccess(response, values.email);
    } catch (err) {
      handleLoginError(err);
    }
  };

  const handleSubmitFailed = (errorInfo: any) => {
    console.log("Form failed:", errorInfo);
  };

  const handleRememberMeChange = (e: CheckboxChangeEvent) => {
    setRememberMe(e.target.checked);
  };

  return (
    <Row justify="center" align="middle" className="h-full">
      <Col xs={22} sm={20} md={12} lg={8} xl={6} className="p-6 bg-white rounded-md shadow-sm">
        <Space direction="vertical" className="w-full" size="large">
          <Title level={2} className="text-center">
            Login
          </Title>
          <Form
            name="login"
            layout="vertical"
            onFinish={handleSubmit}
            onFinishFailed={handleSubmitFailed}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input type="email" placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item name="rememberMe" valuePropName="checked">
              <Checkbox onChange={handleRememberMeChange}>Remember Me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={isLoading}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Col>
    </Row>
  );
};

export default LoginPage;
