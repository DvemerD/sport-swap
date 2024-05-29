import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../redux/api/productApi";
import { Row, Spin, Flex, message } from "antd";

import "./productList.scss";
import ProductItem from "../productItem/ProductItem";

const ProductList = ({ searchTerm, activeTab }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    data: products = { results: [] },
    error,
    isError,
    isLoading,
    isFetching,
  } = useGetProductsQuery({ search: searchTerm, filter: activeTab });

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

  if (isLoading || isFetching) {
    return (
      <div>
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
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <div className="products">
        <Row gutter={[16, 16]}>
          {products.results.map((item, i) => (
            <ProductItem key={i} data={item} />
          ))}
        </Row>
      </div>
    </>
  );
};

export default ProductList;
