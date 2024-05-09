import { useState } from "react";
import { Form, Select, Typography, Space, Input, Button, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useCreateProductMutation } from "../../redux/api/productApi";
const { Title } = Typography;
const fieldNames = [
  { name: "hourly_rate", label: "Hourly Rate" },
  { name: "daily_rate", label: "Daily Rate" },
  { name: "monthly_rate", label: "Monthly Rate" },
  { name: "cleaning_fee", label: "Cleaning Fee" },
];

const ProfilePage = () => {
  const [createProduct, { isLoading, isError }] = useCreateProductMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
    });
  };
  
  return (
    <div>

      <Form
        name="equipment_form"
        className="equipment"
        layout="vertical"
        initialValues={{
          remember: true,
          pricing: [],
        }}
        onFinish={(values) => {
          createProduct({
            user: 1,
            title: "bike",
            category: {
              id: 1,
              category_name: "Bike",
              image:
                "http://127.0.0.1:8000/media/img_category/room_by_arsenixc_d9tyf2k.jpg",
            },
            description: "bike",
            image: [
              {
                id: 1,
                url: "http://127.0.0.1:8000/media/sci-fi-city-red-moon-minimalist-minimalism-y7219.jpg",
              },
            ],
            location_product: {
              id: 1,
              location: "Kharkiv",
            },
            price: 100.0,
            active: true
          }).unwrap();
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
            options={[
              {
                value: "biking",
                label: "Biking",
              },
              {
                value: "accessories",
                label: "Accessories",
              },
              {
                value: "water_sports",
                label: "Water Sports",
              },
              {
                value: "camping",
                label: "Camping",
              },
              {
                value: "golf",
                label: "Golf",
              },
              {
                value: "fishing",
                label: "Fishing",
              },
              {
                value: "travel",
                label: "Travel",
              },
              {
                value: "skating",
                label: "Skating",
              },
              {
                value: "individual",
                label: "Individual Sports",
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="pricing"></Form.Item>

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
  );
};

export default ProfilePage;
