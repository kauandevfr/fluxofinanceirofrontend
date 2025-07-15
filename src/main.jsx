import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.scss'
import MainRoutes from './routes'
import { GlobalContextProvider } from './providers/globalContext'
import { ExpenseContextProvider } from './providers/expenseContext'
import { IncomeContextProvider } from './providers/incomeContext'
import { UserContextProvider } from './providers/userContext'
import RouteObserver from './components/RouteObserver'

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <GlobalContextProvider>
                <ExpenseContextProvider>
                    <IncomeContextProvider>
                        <UserContextProvider>
                            <RouteObserver />
                            <MainRoutes />
                        </UserContextProvider>
                    </IncomeContextProvider>
                </ExpenseContextProvider>
            </GlobalContextProvider>
        </BrowserRouter>
    </React.StrictMode>
)
