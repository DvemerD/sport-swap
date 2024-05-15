import Search from "../search/Search";
import Filter from "../filter/Filter";


const Subheader = ({setSearchTerm, setActiveTab}) => {

  return (
    <div
      style={{
        padding: 15,
      }}
    >
      <Filter setActiveTab={setActiveTab} />
      <Search setSearchTerm={setSearchTerm} />
    </div>
  );
};

export default Subheader;
