import "./Styles/Header.css";
import SearchBar from "./SearchBar";

type HeaderProps = {
  toggleSideMenu: () => void;
};

const appTitle = "Users DataBase";

const Header = ({ toggleSideMenu }: HeaderProps) => {
  return (
    <>
      <div className="header-title-small-devices">{appTitle}</div>
      <div className="header">
        <button onClick={toggleSideMenu} className="menu-button">
          ☰
        </button>
        <h2 className="header-title">{appTitle}</h2>
        <SearchBar />
      </div>
    </>
  );
};

export default Header;
