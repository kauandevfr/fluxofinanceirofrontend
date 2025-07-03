import React, { createContext, useContext, useState } from "react";
import instance from "../utilities/instance";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext();

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export const GlobalContextProvider = ({ children }) => {
    const redirect = useNavigate()

    const [deleteModal, setDeleteModal] = useState({
        open: false,
        item: {},
        type: ""
    })

    const [resume, setResume] = useState({
        loading: true,
        categoria: [],
        pagamento: [],
        status: [],
        saldoRestante: "",
        somaCobrancas: {
            valor: "",
            br: ""
        },
        somaRenda: {
            valor: "",
            br: ""
        }
    })

    function currentMonthYear() {
        const date = new Date();
        return {
            mes: date.getMonth() + 1,
            ano: date.getFullYear()
        };
    }

    const queryParams = () => {
        const query = new URLSearchParams(location.search);
        const objQuery = {};
        query.forEach((valor, chave) => {
            if (objQuery[chave]) {
                objQuery[chave] = [].concat(objQuery[chave], valor);
            } else {
                objQuery[chave] = valor;
            }
        });
        for (const chave in objQuery) {
            if (objQuery[chave].includes(',')) {
                objQuery[chave] = objQuery[chave].split(',');
            }
        }
        return {
            query,
            objQuery,
            page: window.location.pathname.split("/")[1],
            queryStr: query.toString() ? "?" + query.toString() : ""
        }
    }

    const listingResume = async () => {
        const { query } = queryParams()
        try {
            const { data } = await instance.get(`/cobrancas/resumo${query.toString() ? "?" + query.toString() : ""}`)
            setResume({ loading: false, ...data })

            console.log(resume)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <GlobalContext.Provider value={{
            currentMonthYear,
            queryParams,
            redirect,
            deleteModal,
            setDeleteModal,

            listingResume,
            resume,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};