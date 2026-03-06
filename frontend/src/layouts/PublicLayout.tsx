import PublicHeader from "../components/header/public/publicHeader";
import PublicFooter from "../components/footer/public/publicFooter";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <PublicHeader />
      <Outlet />
      <PublicFooter />
    </>
  );
};

export default PublicLayout;
