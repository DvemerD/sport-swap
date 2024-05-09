import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSession } from "../../redux/slices/authSlice";
import { useNavigate } from 'react-router-dom';
import { setHideHeader } from "../../redux/slices/headerSlice";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/authApi";

import "./login.scss";


const Login = () => {
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setHideHeader(true));
    return () => {
      dispatch(setHideHeader(false));
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      messageApi.open({
        type: 'error',
        content: `Status: ${error.status}. ${error.data.detail}`,
      });
    }
  }, [isError, error, messageApi]);

  const onFinish = (values) => {
    login(values)
      .then((res) => {
        dispatch(
          setSession({
            token: res.data.access,
          })
        );
        navigate("/")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      {contextHolder}
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
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
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
            loading={isLoading}
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
