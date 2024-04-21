import { Col, Card, Drawer, Space, Button } from "antd";
import { useState } from "react";
import ProductInfo from "../productInfo/ProductInfo";
import bikeImg from "../../assets/bike.png";

const ProductItem = ({ data }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Card
          hoverable
          cover={<img alt="bike" src={bikeImg} />}
          onClick={() => setOpen(true)}
        >
          <Card.Meta
            title={`Bike Oskar 27.5" Veva`}
            description={`Price: 12$/Day`}
          />
          <p>James</p>
          <p>Kharkiv</p>
        </Card>
      </Col>
      <ProductInfo data={data} open={open} setOpen={setOpen} />
    </>
  );
};

export default ProductItem;
