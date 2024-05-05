import "./Header.css";
import icon from "./../../assets/img/icon.png";

function Header() {
  return (
    <header>
      <nav>
        <img src={icon} alt="icon" width="40" height="40" />
        <h1>My Note Keeper </h1>
      </nav>
    </header>
  );
}

export default Header;
