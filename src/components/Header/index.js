import "./Header.css";
import icon from "./../../assets/img/icon.png";
import Search from "./../Search";
import { useContext } from "react";
import { Context } from "./../../App";

const Header = () => {
  const { isServerFound } = useContext(Context);

  return (
    <header>
      <nav>
        <img src={icon} alt="icon" width="40" height="40" />
        <h1>My Note Keeper </h1>
      </nav>
      {isServerFound && <Search />}
    </header>
  );
};

export default Header;
