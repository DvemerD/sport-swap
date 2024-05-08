import { useState } from "react";
import { Form, Select, Typography, Space, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const { Title } = Typography;
const fieldNames = [
  {name: "hourly_rate", label: "Hourly Rate"},
  {name: "daily_rate", label: "Daily Rate"},
  {name: "monthly_rate", label: "Monthly Rate"},
  {name: "cleaning_fee", label: "Cleaning Fee"},
];

const ProfilePage = () => {
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
          console.log(values);
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

        <Form.List name="pricing">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Space
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center"
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...field}
                    label={fieldNames[index].label}
                    name={[field.name, fieldNames[index].name]}
                    // fieldKey={[field.fieldKey, fieldNames[index].name]}
                    rules={[{ required: true, message: "Please set pricing!" }]}
                  >
                    <Input prefix={"$"} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Rate
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="equipment__button"
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfilePage;
