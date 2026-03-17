import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { JSX } from "react";
import { getUser } from "../utils/storage";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const reduxuser = useSelector((state: RootState) => state.auth.user);
  const storedUser = getUser();

  const user = reduxuser || storedUser;

  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
