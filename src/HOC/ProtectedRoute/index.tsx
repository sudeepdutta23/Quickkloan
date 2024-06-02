import { Navigate, useParams } from "react-router-dom";
import { RouteGuard } from "..";

export const Protected = ({ type = "User", children }: RouteGuard) => {
  const params = useParams();
  if (!localStorage.getItem(type === "User" ? "quikk-token" : 'quikk-admin')) {
    return <Navigate to={type === "User" ? "/" : '/adminLogin'} state={params || null} replace />;
  }
  return children;
};
