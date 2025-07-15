import { createContext, useContext, useState } from "react";
import instance from "../utilities/instance";
import { useGlobalContext } from "./globalContext";

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {

    const { currentMonthYear, redirect, showError, setAlertModal } = useGlobalContext()

    const [initTutorial, setInitTutorial] = useState(false)

    const [user, setUser] = useState({
        loading: true,
        data: {}
    })

    const registerUser = async (data, e) => {
        e.preventDefault();

        const btn = e.target.querySelector('button.button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Aguarde...';

        try {
            await instance.post("/registrar", { ...data })

            setAlertModal({
                open: true,
                tag: "sucess",
                message: "Sucesso ao criar conta!"
            })

        } catch (error) {
            showError(error);
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

            setAlertModal({
                open: true,
                tag: "sucess",
                message: "Redirecionando para o seu painel financeiro."
            })

            redirect(`/dashboard?mes=${mes}&ano=${ano}`)

            window.location.reload()
        } catch (erro) {
            showError(erro)
        } finally {
            btn.textContent = "Iniciar sessão"
            btn.disabled = false
        }
    }

    const logoutSystem = () => {
        localStorage.clear()
        redirect("/")
        document.querySelector('html').setAttribute('data-theme', '');
    }

    const listUser = async () => {

        try {
            const { data } = await instance.get("/usuario")
            setUser({
                loading: false, data: {
                    ...data, datadenascimento: data.datadenascimento ? data.datadenascimento.split("T")[0] : ""
                }
            })
            const html = document.querySelector('html');
            html.setAttribute('data-theme', data.tema);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <UserContext.Provider value={{
            registerUser,
            loginUser,
            logoutSystem,
            listUser,
            user,
            setUser,
            initTutorial,
            setInitTutorial
        }}>
            {children}
        </UserContext.Provider>
    );
};