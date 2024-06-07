import { Button, Input } from "antd";
import { useState } from "react";

const Search = ({ setSearchTerm }) => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchValue("");
  };

  return (
    <div>
      <Input.Search
        placeholder="Enter text to search"
        onSearch={handleSearch}
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        style={{ width: "300px", minWidth: "150px" }}
      ></Input.Search>
      <Button onClick={handleReset} style={{ marginLeft: "5px" }}>
        Reset
      </Button>
    </div>
  );
};

export default Search;
