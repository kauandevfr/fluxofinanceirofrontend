import React, { createContext, useContext, useState } from "react";
import instance from "../utilities/instance";
import { useGlobalContext } from "./globalContext";

const ExpenseContext = createContext();

export const useExpenseContext = () => {
    return useContext(ExpenseContext);
};

export const ExpenseContextProvider = ({ children }) => {

    const { queryParams } = useGlobalContext()
    const initialListing = { loading: true, items: [] }
    const [expenses, setExpenses] = useState(initialListing)

    const listingExpenses = async () => {
        const { query } = queryParams()
        setExpenses(initialListing)
        try {
            const { data } = await instance.get(`/cobrancas?${query.toString()}`)
            setExpenses({ loading: false, items: data.map(element => { return { ...element, seleted: false } }) })

        } catch (error) {
            console.error(error)
        }

    }

    return (
        <ExpenseContext.Provider value={{
            listingExpenses,
            expenses

        }}>
            {children}
        </ExpenseContext.Provider>
    );
};