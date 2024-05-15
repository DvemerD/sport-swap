import ProductList from "../../components/productList/ProductList";
import Subheader from "../../components/subheader/Subheader";
import { useState } from "react";

const CatalogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("");

  return (
    <div>
      <Subheader setSearchTerm={setSearchTerm} setActiveTab={setActiveTab} />
      <ProductList searchTerm={searchTerm} activeTab={activeTab}/>
    </div>
  );
};

export default CatalogPage;
