import React, { createContext, useContext, useState } from "react";
import instance from "../utilities/instance";

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {

    return (
        <UserContext.Provider value={{}}>
            {children}
        </UserContext.Provider>
    );
};