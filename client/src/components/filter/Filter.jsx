import { Flex, Tabs } from "antd";
import { useGetCategoryQuery } from "../../redux/api/productApi";
import logoIcon from "../../assets/logo.png";

const Filter = ({ setActiveTab }) => {
  const {
    data: category = [],
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
    error: errorCategory,
  } = useGetCategoryQuery();

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <Tabs
      defaultActiveKey="0"
      tabPosition="top"
      style={{
        width: "100%",
        maxWidth: "1100px",
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
        key={""}
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
          key={item.category_name}
        ></Tabs.TabPane>
      ))}
    </Tabs>
  );
};

export default Filter;
