import React, { createContext, useContext, useState } from "react";
import instance from "../utilities/instance";
import { useGlobalContext } from "./globalContext";

const ExpenseContext = createContext();

export const useExpenseContext = () => {
    return useContext(ExpenseContext);
};

export const ExpenseContextProvider = ({ children }) => {

    const [categories, setCategories] = useState({
        loading: true,
        items: []
    })

    const [paymentForms, setPaymentForms] = useState({
        loading: true,
        items: []
    })

    const [expenseModal, setExpenseModal] = useState({
        open: false,
        type: "Editar",
        item: {}
    })

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


    const listingCategories = async () => {
        try {
            const { data } = await instance.get("/categorias");
            const filteredItems = data.map(e => ({ ...e, selected: false, filter: false })).sort((a, b) => b.titulo.length - a.titulo.length);
            setCategories({
                loading: false,
                items: filteredItems,
            });

            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    const listingPaymentForms = async () => {
        try {
            const { data } = await instance.get("/formaspagamento");
            const filteredItems = data.map(e => ({ ...e, selected: false, filter: false })).sort((a, b) => b.titulo.length - a.titulo.length);

            setPaymentForms({
                loading: false,
                items: filteredItems
            })

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <ExpenseContext.Provider value={{
            listingExpenses,
            expenses,

            expenseModal,
            setExpenseModal,

            listingCategories,
            categories,

            listingPaymentForms,
            paymentForms

        }}>
            {children}
        </ExpenseContext.Provider>
    );
};