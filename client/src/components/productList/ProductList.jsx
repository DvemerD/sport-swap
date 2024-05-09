import { useEffect } from "react";
import { useGetProductsQuery } from "../../redux/api/productApi";
import { Row, Spin, Flex, message } from "antd";
import ProductItem from "../productItem/ProductItem";

import "./productList.scss";

const ProductList = () => {
  const { data = [], error, isError, isLoading } = useGetProductsQuery();
  const [messageApi, contextHolder] = message.useMessage();

  console.log(data);

  useEffect(() => {
    if (isError) {
      messageApi.open({
        type: "error",
        content: `Status: ${error.status}. ${JSON.stringify(
          error.data,
          null,
          2
        )}`,
      });
    }
  }, [isError, error, messageApi]);

  if (isLoading) {
    return (
      <Flex gap="small" vertical>
        <Flex gap="small" justify="center">
          <Spin tip="Loading" size="large">
            <div
              style={{
                padding: 50,
                background: "rgba(0, 0, 0, 0.09)",
                borderRadius: 4,
              }}
            ></div>
          </Spin>
        </Flex>
      </Flex>
    );
  }

  return (
    <>
      {contextHolder}
      <div className="products">
        <Row gutter={[16, 16]}>
          {data.map((item, i) => (
            <ProductItem key={i} data={item} />
          ))}
        </Row>
      </div>
    </>
  );
};

export default ProductList;
