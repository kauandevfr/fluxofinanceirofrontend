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

    const [incomeModal, setIncomeModal] = useState({
        open: false,
        item: {},
        type: "Adicionar"
    })

    const listingIncomes = async () => {
        const { query } = queryParams()
        setIncomes(initialListing)

        console.log(query.toString())
        try {
            const { data } = await instance.get(`/rendas?${query.toString()}`)
            setIncomes({
                loading: false, items: data
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <IncomeContext.Provider value={{
            listingIncomes,
            incomes,

            incomeModal,
            setIncomeModal

        }}>
            {children}
        </IncomeContext.Provider>
    );
};