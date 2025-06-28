import React, { createContext, useContext, useState } from "react";
import instance from "../utilities/instance";

const ExpenseContext = createContext();

export const useExpenseContext = () => {
    return useContext(ExpenseContext);
};

export const ExpenseContextProvider = ({ children }) => {

    return (
        <ExpenseContext.Provider value={{}}>
            {children}
        </ExpenseContext.Provider>
    );
};