import { createContext, useContext } from "react";
import instance from "../utilities/instance";
import { useGlobalContext } from "./globalContext";

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {

    const { currentMonthYear, redirect } = useGlobalContext()

    const registerUser = async (data, e) => {
        e.preventDefault();

        const btn = e.target.querySelector('button.button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Aguarde...';

        try {
            await instance.post("/registrar", { ...data })
        } catch (error) {
            console.error(error);
        } finally {
            btn.disabled = false
            btn.textContent = 'Registrar'
        }
    }

    const loginUser = async (data, e) => {
        e.preventDefault();

        const btn = e.target.querySelector('button.button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Aguarde...';

        try {
            const { data: content } = await instance.post("/login", { ...data })
            localStorage.setItem("token", content.token)

            const { mes, ano } = currentMonthYear()
            redirect(`/dashboard?mes=${mes}&ano=${ano}`)

            window.location.reload()
        } catch (erro) {

            console.error(erro)
        } finally {
            btn.textContent = "Iniciar sessão"
            btn.disabled = false
        }
    }

    return (
        <UserContext.Provider value={{
            registerUser,
            loginUser,
        }}>
            {children}
        </UserContext.Provider>
    );
};