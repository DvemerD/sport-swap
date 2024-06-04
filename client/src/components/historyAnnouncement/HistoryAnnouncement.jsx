import { useGetUserProductsQuery } from "../../redux/api/userApi";

const HistoryAnnouncement = () => {
  const {
    data: products = [],
    error,
    isLoading,
    isFetching,
  } = useGetUserProductsQuery();
  console.log(products);
  return <>hello</>;
};

export default HistoryAnnouncement;
