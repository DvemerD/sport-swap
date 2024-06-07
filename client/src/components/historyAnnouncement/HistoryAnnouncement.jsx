import { Flex, Row, Spin } from "antd";
import { useGetUserProductsQuery } from "../../redux/api/userApi";
import UserProductItem from "../userProductItem/UserProductItem";
import { useEffect } from "react";

const HistoryAnnouncement = () => {
  const {
    data: products = [],
    error,
    isLoading,
    isFetching,
    isError
  } = useGetUserProductsQuery();

  useEffect(() => {
    if (isError && error) {
      message.error(
        `Failed to delete product: ${errorDelete.message || "Unknown error"}`
      );
    }
  }, [isError, error]);

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
      <div className="history">
        <Row gutter={[16, 16]}>
          {products.map((item, i) => (
            <UserProductItem key={i} data={item} />
          ))}
        </Row>
      </div>
    </>
  );
};

export default HistoryAnnouncement;
