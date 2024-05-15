import { useSignupMutation } from "../../redux/api/authApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHideHeader } from "../../redux/slices/headerSlice";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import Title from "antd/es/typography/Title";
import { Link, useNavigate } from "react-router-dom";
import { setSession } from "../../redux/slices/authSlice";

import "./signup.scss";

const Signup = () => {
  const [signup, { isLoading, isError, error }] = useSignupMutation();
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
        type: "error",
        content: `Status: ${error.status}. ${JSON.stringify(
          error.data,
          null,
          2
        )}`,
      });
    }
  }, [isError, error, messageApi]);

  const onFinish = (values) => {
    signup(values)
      .then((res) => {
        dispatch(
          setSession({
            token: res.data.access,
          })
        );
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="signup">
      {contextHolder}
      <Form
        name="normal_login"
        className="signup__form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Title level={1} className="signup__title">
          Sign Up
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
          hasFeedback
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
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
          name="first_name"
          rules={[
            {
              required: true,
              message: "Please input your First Name!",
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="First Name"
          />
        </Form.Item>
        <Form.Item
          name="last_name"
          rules={[
            {
              required: true,
              message: "Please input your Last Name!",
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Last Name"
          />
        </Form.Item>
        <Form.Item
          name="phone_number"
          rules={[
            {
              required: true,
              message: "Please input your Phone Number!",
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Phone Number"
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
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
              message:
                "The password must contain an uppercase letter, a lowercase letter and a number!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="password2"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={isLoading}
          >
            Sign up
          </Button>
        </Form.Item>
        <Form.Item className="signup__txt">
          Already have an account? <Link to={"/login"}>Log in</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
