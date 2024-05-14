import { useEffect, useState } from "react";
import {
  useGetCategoryQuery,
  useGetProductsQuery,
} from "../../redux/api/productApi";
import { Row, Spin, Flex, message, Radio, Tabs } from "antd";
import ProductItem from "../productItem/ProductItem";
import Search from "../search/Search";
import logoIcon from "../../assets/logo.png";

import "./productList.scss";

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("0");
  const [messageApi, contextHolder] = message.useMessage();
  const {
    data: products = [],
    error,
    isError,
    isLoading,
    isFetching,
  } = useGetProductsQuery(searchTerm);
  const {
    data: category = [],
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
    error: errorCategory,
  } = useGetCategoryQuery();

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

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

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
        <Flex
          gap="small"
          justify="space-between"
          wrap="wrap"
          style={{ marginBottom: "20px" }}
        >
          <Search setSearchTerm={setSearchTerm} />
          <Tabs
            defaultActiveKey="0"
            tabPosition="top"
            style={{
              width: "100%",
            }}
            onChange={handleTabChange}
          >
            <Tabs.TabPane
              tab={
                <Flex
                  justify="center"
                  align="center"
                  gap="small"
                  style={{ flexDirection: "column" }}
                >
                  <img
                    height={25}
                    src={logoIcon}
                    style={{ filter: "grayscale(1)" }}
                  />
                  All
                </Flex>
              }
              key={0}
            ></Tabs.TabPane>
            {category.map((item) => (
              <Tabs.TabPane
                tab={
                  <Flex
                    justify="center"
                    align="center"
                    gap="small"
                    style={{ flexDirection: "column" }}
                  >
                    <img
                      height={25}
                      src={item.image}
                      style={{ filter: "grayscale(1)" }}
                    />
                    {item.category_name}
                  </Flex>
                }
                key={item.id}
              ></Tabs.TabPane>
            ))}
          </Tabs>
        </Flex>
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
