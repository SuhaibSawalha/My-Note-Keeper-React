import "./Search.css";
import searchIcon from "./../../assets/img/search.png";

function Search({ searchText, setSearchText }) {
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
}

export default Search;
