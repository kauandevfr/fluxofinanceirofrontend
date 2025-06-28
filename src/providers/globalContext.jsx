import React, { createContext, useContext, useState } from "react";
import instance from "../utilities/instance";

const GlobalContext = createContext();

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export const GlobalContextProvider = ({ children }) => {

    return (
        <GlobalContext.Provider value={{}}>
            {children}
        </GlobalContext.Provider>
    );
};