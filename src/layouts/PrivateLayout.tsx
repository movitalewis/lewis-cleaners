import PrivateHeader from "../components/header/private/header";
import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
  return (
    <>
      <PrivateHeader />
      <Outlet />
    </>
  );
};

export default PrivateLayout;
