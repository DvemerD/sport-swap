import { useEffect, useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {
  useCreateProductMutation,
  useGetCategoryQuery,
  useGetLocationQuery,
} from "../../redux/api/productApi";
import {
  Form,
  Select,
  Typography,
  InputNumber,
  Input,
  Button,
  message,
  Image,
  Upload,
} from "antd";
const { Title } = Typography;

const ProfilePage = () => {
  const [createProduct, { isLoading, isError }] = useCreateProductMutation();
  const {
    data: category = [],
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
    error: errorCategory,
  } = useGetCategoryQuery();
  const {
    data: location = [],
    isLoading: isLoadingLocation,
    isError: isErrorLocation,
    error: errorLocation,
  } = useGetLocationQuery();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (isErrorCategory) {
      messageApi.open({
        type: "error",
        content: `Status: ${errorCategory.status}. ${JSON.stringify(
          errorCategory.data,
          null,
          2
        )}`,
      });
    }
  }, [isLoadingCategory, errorCategory, messageApi]);

  return (
    <>
      {contextHolder}
      <div style={{ padding: "30px" }}>
        <Form
          name="equipment_form"
          className="equipment"
          layout="vertical"
          initialValues={{
            remember: true,
            pricing: [],
            description: "",
            images: "",
            title: "",
            category: "",
          }}
          onFinish={(values) => {
            const images = values.images.fileList.map(
              (img) => img.originFileObj
            );

            const obj = {
              user: 1,
              title: values.title,
              category: values.category,
              description: values.description,
              location_product: values.location,
              price: values.pricing,
              active: true,
            };

            const formData = new FormData();
            for (const [key, value] of Object.entries(obj)) {
              formData.append(key, value);
            }

            for (const value of images) {
              formData.append("image", value);
            }
            
            createProduct(formData).unwrap();
          }}
        >
          <Title level={2} className="equipment__title">
            Add equipment
          </Title>
          <Form.Item
            name="category"
            label="Select Category"
            rules={[
              {
                required: true,
                message: "Please select a category!",
              },
            ]}
          >
            <Select
              defaultValue="Select category"
              options={category.map((item) => {
                return { value: item.id, label: item.category_name };
              })}
            />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input a title!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="pricing"
            label="Pricing"
            rules={[
              {
                required: true,
                message: "Please input a pricing!",
              },
            ]}
          >
            <InputNumber addonBefore="$" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input a description!",
              },
            ]}
          >
            <TextArea rows={4} maxLength={1024} showCount />
          </Form.Item>
          <Form.Item
            name="images"
            label="Images"
            rules={[
              {
                required: true,
                message: "Please upload a image!",
              },
            ]}
          >
            <Upload
              multiple
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
          </Form.Item>
          <Form.Item
            name="location"
            label="Select Location"
            rules={[
              {
                required: true,
                message: "Please select a location!",
              },
            ]}
          >
            <Select
              defaultValue="Select location"
              options={location.map((item) => {
                return { value: item.id, label: item.location };
              })}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="equipment__button"
              disabled={isLoading}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ProfilePage;
