import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Expenses from "../pages/Expenses";
import Home from "../pages/Home";
import Incomes from "../pages/Incomes";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import RecoverPassword from "../pages/RecoverPassword";
import Register from "../pages/Register";
import SendTokenPassword from "../pages/SendTokenPassword";
import Settings from "../pages/Settings";
import User from "../pages/User";

export default function MainRoutes() {
    const date = new Date();
    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();

    const isAuthenticated = () => {
        return !!localStorage.getItem("token");
    };

    function PrivateRoute() {
        return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
    }

    function PublicRoute() {
        return !isAuthenticated() ? <Outlet /> : <Navigate to={`/dashboard/?mes=${mes}&ano=${ano}`} replace />;
    }

    return (
        <Routes>
            <Route element={< PrivateRoute />} >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/incomes" element={<Incomes />} />
                <Route path="/user-account" element={<User />} />
                <Route path="/settings" element={<Settings />} />
            </Route>
            <Route element={<PublicRoute />} >
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
            </Route>
            <Route path="/send-token-password" element={<SendTokenPassword />} />
            <Route path="/recover-password/:token" element={<RecoverPassword />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}