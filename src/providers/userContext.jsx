import { createContext, useContext } from "react";
import instance from "../utilities/instance";

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {

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

    return (
        <UserContext.Provider value={{
            registerUser,

        }}>
            {children}
        </UserContext.Provider>
    );
};