import React, { createContext, useContext, useState } from "react";
import instance from "../utilities/instance";
import { useGlobalContext } from "./globalContext";

const IncomeContext = createContext();

export const useIncomeContext = () => {
    return useContext(IncomeContext);
};

export const IncomeContextProvider = ({ children }) => {
    const initialListing = { loading: true, items: [] }
    const [incomes, setIncomes] = useState(initialListing)
    const { queryParams } = useGlobalContext()

    const listingIncomes = async () => {
        const { query } = queryParams()
        setIncomes(initialListing)
        try {
            const { data } = await instance.get(`/rendas?${query.toString()}`)
            setIncomes({
                loading: false, items: data.map(element => { return { ...element, seleted: false } })
                    .sort((a, b) => new Date(a.datainclusao) - new Date(b.datainclusao))
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <IncomeContext.Provider value={{
            listingIncomes,
            incomes

        }}>
            {children}
        </IncomeContext.Provider>
    );
};