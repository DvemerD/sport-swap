import Search from "../search/Search";
import Filter from "../filter/Filter";
import { Flex } from "antd";

const Subheader = ({ setSearchTerm, setActiveTab }) => {
  return (
    <div
      style={{
        padding: 15,
      }}
    >
      <Flex
        gap="small"
        justify="space-between"
        align="center"
        wrap="wrap-reverse"
        style={{ marginBottom: "20px" }}
      >
        <Filter setActiveTab={setActiveTab} />
        <Search setSearchTerm={setSearchTerm} />
      </Flex>
    </div>
  );
};

export default Subheader;
