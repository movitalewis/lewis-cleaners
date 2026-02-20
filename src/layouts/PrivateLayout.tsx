import PrivateHeader from "../components/header/private/header";
import { Outlet } from "react-router-dom";
import PrivateFooter from "../components/footer/private/footer";

const PrivateLayout = () => {
  return (
    <>
      <PrivateHeader />
      <Outlet />
      <PrivateFooter />
    </>
  );
};

export default PrivateLayout;
