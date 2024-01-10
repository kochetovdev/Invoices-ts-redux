import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

const ProtectedRoute = ({ children, ...rest }: any) => {
  const { isAuth } = useAuth();
  return (
    <Route {...rest}>{!isAuth ? <Navigate to="/login" /> : children}</Route>
  );
};

export default ProtectedRoute;
