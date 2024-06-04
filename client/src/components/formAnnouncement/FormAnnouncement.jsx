import { useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {
  useCreateProductMutation,
  useGetUserQuery,
} from "../../redux/api/userApi";
import {
  useGetCategoryQuery,
  useGetLocationQuery,
} from "../../redux/api/productApi";
import {
  Form,
  Select,
  InputNumber,
  Input,
  Button,
  message,
  Upload,
} from "antd";

const FormAnnouncement = () => {
  const [
    createProduct,
    { isLoading: isLoadingCreate, isError: isErrorCreate, error: errorCreate },
  ] = useCreateProductMutation();
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
  const { data: user = {} } = useGetUserQuery();
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
    if (isErrorCreate) {
      messageApi.open({
        type: "error",
        content: `Status: ${errorCreate.status}. ${JSON.stringify(
          errorCreate.data,
          null,
          2
        )}`,
      });
    }
  }, [
    isLoadingCategory,
    isLoadingCreate,
    errorCreate,
    errorCategory,
    messageApi,
  ]);

  return (
    <>
      {contextHolder}
      <Form
        name="equipment_form"
        className="equipment"
        layout="vertical"
        initialValues={{
          remember: true,
          pricing: "",
          description: "",
          images: "",
          title: "",
          category: "",
          location: "",
        }}
        onFinish={(values) => {
          const images = values.images.fileList.map((img) => img.originFileObj);

          const obj = {
            user: user.id,
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

          createProduct(formData)
            .then((res) => {
              if (res.error && res.error.status === 400) {
                throw new Error("Error Status: 400");
              } else {
                messageApi.open({
                  type: "success",
                  content: "Product created successfully!",
                });
              }
            })
            .catch((err) => {
              console.log(err.message);
            });
        }}
      >
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
            disabled={isLoadingCreate}
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormAnnouncement;
