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

    const [justVerified, setJustVerified] = useState(false);

    const [user, setUser] = useState({
        loading: true,
        data: {}
    })

    const registerUser = async (data, e) => {
        e.preventDefault();

        try {
            await instance.post("/registrar", { ...data })

            setAlertModal({
                open: true,
                tag: "sucess",
                message: "Sucesso ao criar conta!"
            })

        } catch (error) {
            showError(error);
        }
    }

    const loginUser = async (data, e) => {
        e.preventDefault();
        try {
            const { data: content } = await instance.post("/login", data)

            const { mes, ano } = currentMonthYear()

            localStorage.setItem("token", content.token);

            instance.defaults.headers.Authorization = `Bearer ${content.token}`;

            setAlertModal({
                open: true,
                tag: "sucess",
                message: "Redirecionando para o seu painel financeiro.",
                onClose: () => {
                    redirect(`/dashboard/?mes=${mes}&ano=${ano}`);
                }
            })

        } catch (error) {
            console.error(error)
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

            const dataFormatted = {
                ...data, datadenascimento: data.datadenascimento ? data.datadenascimento.split("T")[0] : "",
            }

            if (dataFormatted.emailverified == 0) {
                redirect("/verify-email")
            }

            if (dataFormatted.emailverified == 1) {
                setJustVerified(true)
            }


            setUser({
                loading: false, data: dataFormatted
            })

            const html = document.querySelector('html');
            html.setAttribute('data-theme', data.tema);
        } catch (error) {
            showError(error)
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
            setInitTutorial,
            justVerified
        }}>
            {children}
        </UserContext.Provider>
    );
};