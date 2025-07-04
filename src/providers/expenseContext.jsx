import React, { createContext, useContext, useState } from "react";
import instance from "../utilities/instance";
import { useGlobalContext } from "./globalContext";

const ExpenseContext = createContext();

export const useExpenseContext = () => {
    return useContext(ExpenseContext);
};

export const ExpenseContextProvider = ({ children }) => {

    const initialListing = { loading: true, items: [] }

    const [categories, setCategories] = useState(initialListing)

    const [paymentForms, setPaymentForms] = useState(initialListing)

    const [banks, setBanks] = useState(initialListing)

    const [expenses, setExpenses] = useState(initialListing)

    const [bankModal, setModalBank] = useState({
        open: false,
        type: "Adicionar",
        item: {}
    })

    const [expenseModal, setExpenseModal] = useState({
        open: false,
        type: "Adicionar",
        item: {}
    })

    const { queryParams } = useGlobalContext()

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
            setCategories(initialListing)
            const { data } = await instance.get("/categorias");
            const filteredItems = data.map(e => ({ ...e, selected: false, filter: false })).sort((a, b) => b.titulo.length - a.titulo.length);
            setCategories({
                loading: false,
                items: filteredItems,
            });
        } catch (error) {
            console.error(error)
        }
    }

    const listingPaymentForms = async () => {
        try {
            setPaymentForms(initialListing)
            const { data } = await instance.get("/formaspagamento");
            const filteredItems = data.map(e => ({ ...e, filter: false })).sort((a, b) => b.titulo.length - a.titulo.length);
            setPaymentForms({
                loading: false,
                items: filteredItems
            })
        } catch (error) {
            console.error(error)
        }
    }

    const listingBanks = async () => {
        try {
            setBanks(initialListing)

            const { data } = await instance.get("/instituicoesfinanceiras")
            const filteredItems = data.map(e => ({ ...e, filter: false })).sort((a, b) => b.titulo.length - a.titulo.length);


            setBanks({ loading: false, items: filteredItems })
            console.log(filteredItems)

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
            paymentForms,

            listingBanks,
            banks,

            bankModal,
            setModalBank
        }}>
            {children}
        </ExpenseContext.Provider>
    );
};