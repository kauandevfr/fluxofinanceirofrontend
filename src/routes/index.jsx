import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import SendTokenPassword from "../pages/SendTokenPassword";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Expenses from "../pages/Expenses";
import ViewBilling from "../pages/ViewBilling";
import Dashboard from "../pages/Dashboard";
import Incomes from "../pages/Incomes";
import Login from "../pages/Login";
import RecoverPassword from "../pages/RecoverPassword";
import User from "../pages/User";
import Home from "../pages/Home";
import Settings from "../pages/Settings";

export default function Route() {
    function PrivateRoutes({ redirectTo }) {
        const isAuthenticated = localStorage.getItem("token");
        if (!isAuthenticated) localStorage.clear();
        return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
    }

    function PublicRoutes({ redirectTo }) {
        const isAuthenticated = localStorage.getItem("token");
        return isAuthenticated ? <Navigate to={redirectTo} /> : <Outlet />;
    }

    return (
        <Routes>
            <Route element={<PrivateRoutes redirectTo="/login" />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/incomes" element={<Incomes />} />
                <Route path="/billing/:id" element={<ViewBilling />} />
                <Route path="/user-account" element={<User />} />
                <Route path="/settings" element={<Settings />} />
            </Route>

            <Route element={<PublicRoutes redirectTo="/dashboard" />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
            </Route>

            <Route path="/*" element={<NotFound />} />
            <Route path="/send-token-password" element={<SendTokenPassword />} />
            <Route path="/recover-password/:token" element={<RecoverPassword />} />
        </Routes>
    );
}
