import { Navigate } from "react-router-dom";
import { RouteGuard } from "..";

export const Public = ({ type = "User", children }: RouteGuard) => {
    
    if (localStorage.getItem(type === "User" ? 'quikk-token' : 'quikk-admin')) {
        return <Navigate to={type === "User" ? "/dashboard/home" : '/admin/getAllLeads/all'} replace />;
    }

    return children;
};
