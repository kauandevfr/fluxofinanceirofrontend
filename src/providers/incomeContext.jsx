import React, { createContext, useContext, useState } from "react";
import instance from "../utilities/instance";

const IncomeContext = createContext();

export const useIncomeContext = () => {
    return useContext(IncomeContext);
};

export const IncomeContextProvider = ({ children }) => {

    return (
        <IncomeContext.Provider value={{}}>
            {children}
        </IncomeContext.Provider>
    );
};