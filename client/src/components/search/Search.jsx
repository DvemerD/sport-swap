import { Input } from "antd";

const Search = ({ setSearchTerm }) => {
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <Input.Search
      placeholder="Enter text to search"
      onSearch={handleSearch}
      style={{width: "300px"}}
    ></Input.Search>
  );
};

export default Search;
