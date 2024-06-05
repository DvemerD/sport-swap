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
      // avatar: values.avatar.fileList[0].originFileObj,
    };
    delete obj.id;
    if (typeof values.avatar === "string") delete values.avatar;

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
      {/* {userData.avatar && <Avatar size={84} src={userData.avatar} />}
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
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item> */}
      <Form.Item label="Username" name="username">
        <Input name="username" value={userData.username} />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input name="email" value={userData.email} />
      </Form.Item>
      <Form.Item label="First Name" name="first_name">
        <Input name="first_name" value={userData.first_name} />
      </Form.Item>
      <Form.Item label="Last Name" name="last_name">
        <Input name="last_name" value={userData.last_name} />
      </Form.Item>
      <Form.Item label="Phone number" name="phone_number">
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
