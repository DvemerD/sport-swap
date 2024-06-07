import { EllipsisOutlined } from "@ant-design/icons";
import { Col, Card, Menu, Dropdown, Button, message } from "antd";
import { useEffect, useState } from "react";
import { useDeleteProductMutation } from "../../redux/api/userApi";

const UserProductItem = ({ data }) => {
  const [
    deleteProduct,
    {
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: errorDelete,
    },
  ] = useDeleteProductMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isDeleteError && errorDelete) {
      message.error(
        `Failed to delete product: ${errorDelete.message || "Unknown error"}`
      );
    }
  }, [isDeleteError, errorDelete]);

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => console.log("Edit")}>
        Edit
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleDelete()}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const handleDelete = () => {
    deleteProduct(data.id)
      .unwrap()
      .then(() => {
        message.success("Product deleted successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {contextHolder}
      <Col
        xs={24}
        sm={12}
        md={8}
        lg={6}
        xl={6}
        style={{ position: "relative" }}
      >
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button
            style={{
              position: "absolute",
              right: "14px",
              top: "6px",
              zIndex: 2,
            }}
            shape="circle"
            icon={<EllipsisOutlined />}
          />
        </Dropdown>
        <Card
          cover={
            <img
              alt={`image ${data.title}`}
              src={data.image[0].url}
              style={{ height: "240px", objectFit: "cover" }}
            />
          }
          onClick={() => setOpen(true)}
        >
          <Card.Meta title={data.title} description={`Price: ${data.price}$`} />
          <p>User: {data.user.username}</p>
          <p>Location: {data.location_product.location}</p>
        </Card>
      </Col>
      {/* <ProductInfo data={data} open={open} setOpen={setOpen} /> */}
    </>
  );
};

export default UserProductItem;
