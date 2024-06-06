import { useEffect } from "react";
import {
  useChangeUserInfoMutation,
  useGetUserQuery,
} from "../../redux/api/userApi";
import { Form, Input, Button, message, Upload, Avatar } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const EditUserInfo = () => {
  const [form] = Form.useForm();
  const { data: userData, isFetching } = useGetUserQuery();
  const [changeUserInfo, { isLoading, error }] = useChangeUserInfoMutation();

  useEffect(() => {
    if (userData && !isFetching) {
      form.setFieldsValue(userData);
    }
  }, [userData, isFetching, form]);

  const handleSubmit = (values) => {
    const obj = {
      ...userData,
      ...values,
    };

    delete obj.id;

    if (typeof values.avatar === "string") {
      delete obj.avatar;
    } else {
      obj.avatar = values.avatar.fileList[0].originFileObj;
    }

    const formData = new FormData();
    for (const [key, value] of Object.entries(obj)) {
      formData.append(key, value);
    }

    changeUserInfo(formData)
      .then((res) => {
        // message.success("Data updated");
      })
      .catch((err) => {
        message.success(err);
      });
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      {userData.avatar && (
        <Avatar size={150} src={`http://127.0.0.1:8000${userData.avatar}`} />
      )}
      <Form.Item name="avatar">
        <Upload
          beforeUpload={(file) => {
            return new Promise((resolve, reject) => {
              if (file.size > 10) {
                reject("File size exceeded!");
              } else {
                resolve("Succses");
              }
            });
          }}
        >
          <Button icon={<UploadOutlined />} style={{ marginTop: 12 }}>
            Click to Upload
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input name="username" value={userData.username} />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid Email!",
          },
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
        hasFeedback
      >
        <Input name="email" value={userData.email} />
      </Form.Item>
      <Form.Item label="First Name" name="first_name">
        <Input name="first_name" value={userData.first_name} />
      </Form.Item>
      <Form.Item label="Last Name" name="last_name">
        <Input name="last_name" value={userData.last_name} />
      </Form.Item>
      <Form.Item
        label="Phone number"
        name="phone_number"
        rules={[{ required: true, message: "Please input your phone number!" }]}
        hasFeedback
      >
        <Input name="phone_number" value={userData.phone_number} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditUserInfo;
