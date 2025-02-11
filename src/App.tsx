import { useState } from "react";
import "./App.css";
import AddUser from "./Components/AddUser";
import Header from "./Components/Header";
import RemoveUser from "./Components/RemoveUser";
import SideMenu from "./Components/SideMenu";
import UserList from "./Components/UserList";

function App() {
  const [currentComponent, setCurrentComponent] = useState<number>(0);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);

  const components = [<AddUser />, <UserList />, <RemoveUser />];

  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <>
      <Header toggleSideMenu={toggleSideMenu} />
      {isSideMenuOpen && <SideMenu closeSideMenu={closeSideMenu} currentComponent={currentComponent} setCurrentComponent={setCurrentComponent} />}

      {components[currentComponent]}
    </>
  );
}

export default App;
