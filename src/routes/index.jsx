import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Expenses from "../pages/Expenses";
import Home from "../pages/Home";
import Incomes from "../pages/Incomes";
import AccessAccount from "../pages/AccessAccount";
import NotFound from "../pages/NotFound";
import RecoverPassword from "../pages/RecoverPassword";
import SendTokenPassword from "../pages/SendTokenPassword";
import Settings from "../pages/Settings";
import User from "../pages/User";
import VerifyEmail from "../pages/VerifyEmail";

export default function MainRoutes() {
    const isAuthenticated = () => {
        return !!localStorage.getItem("token");
    };

    function PrivateRoute() {
        return isAuthenticated() ? <Outlet /> : <Navigate to="/access-account" replace />;
    }

    return (
        <Routes>
            <Route element={< PrivateRoute />} >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/incomes" element={<Incomes />} />
                <Route path="/user-account" element={<User />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
            </Route>
            <Route path="/access-account" element={<AccessAccount />} />
            <Route path="/" element={<Home />} />
            <Route path="/send-token-password" element={<SendTokenPassword />} />
            <Route path="/recover-password/:token" element={<RecoverPassword />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}