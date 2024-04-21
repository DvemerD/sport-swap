import { Col, Row, Card } from "antd";
import ProductItem from "../productItem/ProductItem";

import "./productList.scss";

const products = new Array(16).fill(null).map((_, i) => <ProductItem key={i}/>);

const ProductList = () => {
  return (
    <div className="products">
      <Row gutter={[16, 16]}>{products}</Row>
    </div>
  );
};

export default ProductList;
