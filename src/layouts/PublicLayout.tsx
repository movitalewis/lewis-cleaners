import PublicHeader from "../components/header/public/publicHeader";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <PublicHeader />
      <Outlet />
    </>
  );
};

export default PublicLayout;
