import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.scss'
import Route from './routes'
import { GlobalProvider } from './providers/globalContext'
import { ExpenseProvider } from './providers/expenseContext'
import { IncomeProvider } from './providers/incomeContext'
import { UserProvider } from './providers/userContext'

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <GlobalProvider>
                <ExpenseProvider>
                    <IncomeProvider>
                        <UserProvider>
                            <Route />
                        </UserProvider>
                    </IncomeProvider>
                </ExpenseProvider>
            </GlobalProvider>
        </BrowserRouter>
    </React.StrictMode>
)
