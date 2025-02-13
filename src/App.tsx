import { useState } from "react";
import "./App.css";
import AddUser from "./Components/AddUser";
import Header from "./Components/Header";
import RemoveUser from "./Components/RemoveUser";
import SideMenu from "./Components/SideMenu";
import UserList from "./Components/UserList";
import ToastsDisplay from "./Components/ToastsDisplay";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

function App() {
  const [currentComponent, setCurrentComponent] = useState<number>(0);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const { quantity } = useSelector((state: RootState) => state.toasts);

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
      {quantity > 0 && <ToastsDisplay />}
      {isSideMenuOpen && <SideMenu closeSideMenu={closeSideMenu} currentComponent={currentComponent} setCurrentComponent={setCurrentComponent} />}

      {components[currentComponent]}
    </>
  );
}

export default App;
