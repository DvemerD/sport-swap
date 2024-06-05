import { Card, Col, Row } from "antd";
import { useGetUserProductsQuery } from "../../redux/api/userApi";

const HistoryAnnouncement = () => {
  const {
    data: products = [],
    error,
    isLoading,
    isFetching,
  } = useGetUserProductsQuery();

  console.log(products);

  return (
    <>
      <div className="history">
        {/* <Row gutter={[16, 16]}>
          {products.map((item, i) => (
            <UserProductItem key={i} data={item} />
          ))}
        </Row> */}
      </div>
    </>
  );
};

export default HistoryAnnouncement;
