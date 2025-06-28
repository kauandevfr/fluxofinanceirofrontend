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
    return (
        <GlobalContext.Provider value={{
            currentMonthYear,
            redirect

        }}>
            {children}
        </GlobalContext.Provider>
    );
};