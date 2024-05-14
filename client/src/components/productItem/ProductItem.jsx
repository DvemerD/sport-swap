import { Col, Card, Drawer, Space, Button } from "antd";
import { useState } from "react";
import ProductInfo from "../productInfo/ProductInfo";

const ProductItem = ({ data }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Card
          hoverable
          cover={
            <img
              alt={`image ${data.title}`}
              src={data.image[0].url}
              style={{ maxHeight: "240px", objectFit: "cover" }}
            />
          }
          onClick={() => setOpen(true)}
        >
          <Card.Meta title={data.title} description={`Price: ${data.price}$`} />
          <p>User: {data.username}</p>
          <p>Location: {data.location_product.location}</p>
        </Card>
      </Col>
      <ProductInfo data={data} open={open} setOpen={setOpen} />
    </>
  );
};

export default ProductItem;
