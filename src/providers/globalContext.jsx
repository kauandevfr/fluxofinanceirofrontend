import React, { createContext, useContext, useState } from "react";
import instance from "../utilities/instance";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext();

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export const GlobalContextProvider = ({ children }) => {
    const redirect = useNavigate()

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

    return (
        <GlobalContext.Provider value={{
            currentMonthYear,
            redirect,
            queryParams

        }}>
            {children}
        </GlobalContext.Provider>
    );
};