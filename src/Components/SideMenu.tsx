import ReactDOM from "react-dom";
import "./Styles/SideMenu.css";
import { useRef } from "react";

type SideMenuProps = {
  closeSideMenu: () => void;
  setCurrentComponent: (num: number) => void;
  currentComponent: number;
};

const SideMenu = ({ closeSideMenu, setCurrentComponent, currentComponent }: SideMenuProps) => {
  const sideMenuRef = useRef<HTMLDivElement>(null);
  const portal = document.getElementById("portal");

  const addUserHandler = () => {
    setCurrentComponent(0);
    closeSideMenu();
  };
  const allUsersHandler = () => {
    setCurrentComponent(1);
    closeSideMenu();
  };
  const removeUserHandler = () => {
    setCurrentComponent(2);
    closeSideMenu();
  };

  const closeMenuHandler = () => {
    if (sideMenuRef.current) {
      sideMenuRef.current.classList.add("side-menu-leave");
    }
    setTimeout(() => {
      closeSideMenu();
    }, 300);
  };

  return portal
    ? ReactDOM.createPortal(
        <>
          <div ref={sideMenuRef} className="side-menu">
            <div className="header-spacer">
              <button onClick={closeMenuHandler} className="close-menu-button">
                ✖
              </button>
            </div>
            <div className="menu-body">
              <h2 className="menu-title">Select an option</h2>
              <div className="side-menu_buttons">
                <button onClick={addUserHandler} style={{ filter: currentComponent === 0 ? "brightness(1.3)" : "none" }}>
                  Add User
                </button>
                <button onClick={allUsersHandler} style={{ filter: currentComponent === 1 ? "brightness(1.3)" : "none" }}>
                  View all Users
                </button>
                <button onClick={removeUserHandler} style={{ filter: currentComponent === 2 ? "brightness(1.3)" : "none" }}>
                  Remove User
                </button>
              </div>
            </div>
          </div>
          <div className="screen" onClick={closeMenuHandler} />
        </>,
        document.getElementById("portal") as Element
      )
    : null;
};

export default SideMenu;
