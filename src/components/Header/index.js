import "./Header.css";
import icon from "./../../assets/img/icon.png";
import Search from "./../Search";

function Header({ searchText, setSearchText }) {
  return (
    <header>
      <nav>
        <img src={icon} alt="icon" width="40" height="40" />
        <h1>My Note Keeper </h1>
      </nav>
      <Search searchText={searchText} setSearchText={setSearchText} />
    </header>
  );
}

export default Header;
