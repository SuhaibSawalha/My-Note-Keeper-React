import "./Search.css";
import searchIcon from "./../../assets/img/search.png";
import { Context } from "./../../App";
import { useContext } from "react";

const Search = () => {
  const { searchText, setSearchText } = useContext(Context);

  return (
    <div className="search">
      <img src={searchIcon} alt="search icon" />
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default Search;
