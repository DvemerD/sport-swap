import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";

import "./login.scss";

const Login = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="login">
      <Form
        name="normal_login"
        className="login__form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Title level={1} className="signup__title">
          Log In
        </Title>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
            {
              min: 8,
              message: "Password must be at least 8 characters!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
        <Form.Item className="signup__txt">
          No account? <Link to={"/signup"}>Sign up</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
