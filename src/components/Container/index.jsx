import { useEffect, useState } from 'react';
import './style.scss';
import months from "../../data/months"
import { Fade } from "@mui/material";
import { useGlobalContext } from "../../providers/globalContext"
import { Link } from 'react-router-dom';
import { useUserContext } from '../../providers/userContext';
import Header from '../Header';
import Footer from '../Footer';
import { useExpenseContext } from '../../providers/expenseContext';
import { useIncomeContext } from '../../providers/incomeContext';
import AnimatedNumber from '../AnimateNumber';
import ModalDelete from '../ModalDelete';
import ModalExpense from '../ModalExpense';

export default function Container({ children, amount }) {
    const [viewAside, setViewAside] = useState(false)
    const [selectPeriod, setSelectPeriod] = useState({ mes: "", ano: "" })
    const { currentMonthYear, queryParams, redirect, listingResume, resume } = useGlobalContext()
    const { listingExpenses } = useExpenseContext()
    const { listingIncomes } = useIncomeContext()
    const { logoutSystem, listUser, user } = useUserContext()
    const { mes, ano } = currentMonthYear()
    const { query, page, objQuery, queryStr } = queryParams()
    const goToCurrentPeriod = () => {
        query.set('mes', mes)
        query.set('ano', ano)
        redirect(`${window.location.pathname}?${query.toString()}`);
    }
    const changePeriod = (value) => {
        let mes = (+objQuery.mes || currentMonthYear().mes) + value;
        let ano = +objQuery.ano || currentMonthYear().ano;

        if (mes > 12) mes = 1, ano++;
        else if (mes < 1) mes = 12, ano--;

        query.set('mes', mes);
        query.set('ano', ano);
        redirect(`${page}?${query}`);
    };
    useEffect(() => {
        setViewAside(false);
        const query = new URLSearchParams(location.search);
        const ano = query.has('ano') ? Number(query.get('ano')) : null;
        const mes = query.has('mes') ? months.find(e => e.id === Number(query.get('mes')) - 1)?.month : null;

        setSelectPeriod(prev => ({
            ...prev,
            ano: ano ?? prev.ano,
            mes: mes ?? prev.mes,
        }));
        listUser()
        listingIncomes()
        listingExpenses()
        listingResume()

    }, [])
    return (
        <main>
            <aside className={`aside-menu vertical-align gap1 ${viewAside ? "active" : ''}`}>
                <button className="button menu toggle" onClick={() => setViewAside(!viewAside)}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M4 6H20M4 12H20M4 18H20"
                                stroke="var(--white)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                </button>
                <h1 className="page-title text-center">Fluxo Financeiro</h1>
                <form className="vertical-align gap2 w100">
                    <h3 className="page-subtitle text-center">Selecionar periodo</h3>
                    <div className="horizontal-align gap1">
                        <input
                            className="input"
                            type="text"
                            list="months"
                            placeholder="Mês"
                            value={selectPeriod.mes}
                            onChange={(e) => setSelectPeriod({ ...selectPeriod, mes: e.target.value })}
                        />
                        <datalist id="months">
                            {months.map(month => (
                                <option key={month.id}
                                    value={month.month}
                                >
                                    {month.month}
                                </option>
                            ))}
                        </datalist>
                        <input
                            className="input"
                            type="number"
                            placeholder="Ano"
                            value={selectPeriod.ano}
                            onChange={(e) => setSelectPeriod({ ...selectPeriod, ano: e.target.value })}

                        />
                    </div>
                    <div className="horizontal-align gap1">
                        <button className="button" type="button"
                            onClick={() => changePeriod(-1)}
                        >
                            <img src="https://www.fluxofinanceiro.site/assets/seta-esquerda.png" alt="arrow" />
                        </button>
                        <button
                            className="button w100"
                            type="submit"
                            disabled={!selectPeriod.mes && !selectPeriod.ano ? true : false}
                        >
                            Selecionar
                        </button>
                        <button
                            className="button"
                            type="button"
                            onClick={() => changePeriod(+1)}
                        >
                            <img src="https://www.fluxofinanceiro.site/assets/seta-direita.png" alt="Seta para direita" />
                        </button>
                    </div>
                    <Fade
                        in={(mes == query.get('mes') && ano == query.get('ano')) ? false : true}
                    >
                        <button className="button w100"
                            type="button"
                            onClick={goToCurrentPeriod}
                        >{months[mes - 1].month} de {ano}</button>
                    </Fade>
                </form>
                <div className="vertical-align w100 gap2 mb-auto" id="etapa-7">
                    <div className="vertical-align w100 gap1 ai-start">
                        <span className="page-subtitle">Principal</span>
                        <Link className="button menu" to={`/dashboard/${queryStr}`}
                            style={{ background: page === 'dashboard' ? 'var(--bg-gradient-2)' : '' }}
                        >
                            <svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M9.918 10.0005H7.082C6.66587 9.99708 6.26541 10.1591 5.96873 10.4509C5.67204 10.7427 5.50343 11.1404 5.5 11.5565V17.4455C5.5077 18.3117 6.21584 19.0078 7.082 19.0005H9.918C10.3341 19.004 10.7346 18.842 11.0313 18.5502C11.328 18.2584 11.4966 17.8607 11.5 17.4445V11.5565C11.4966 11.1404 11.328 10.7427 11.0313 10.4509C10.7346 10.1591 10.3341 9.99708 9.918 10.0005Z"
                                    stroke="var(--white)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M9.918 4.0006H7.082C6.23326 3.97706 5.52559 4.64492 5.5 5.4936V6.5076C5.52559 7.35629 6.23326 8.02415 7.082 8.0006H9.918C10.7667 8.02415 11.4744 7.35629 11.5 6.5076V5.4936C11.4744 4.64492 10.7667 3.97706 9.918 4.0006Z"
                                    stroke="var(--white)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M15.082 13.0007H17.917C18.3333 13.0044 18.734 12.8425 19.0309 12.5507C19.3278 12.2588 19.4966 11.861 19.5 11.4447V5.55666C19.4966 5.14054 19.328 4.74282 19.0313 4.45101C18.7346 4.1592 18.3341 3.9972 17.918 4.00066H15.082C14.6659 3.9972 14.2654 4.1592 13.9687 4.45101C13.672 4.74282 13.5034 5.14054 13.5 5.55666V11.4447C13.5034 11.8608 13.672 12.2585 13.9687 12.5503C14.2654 12.8421 14.6659 13.0041 15.082 13.0007Z"
                                    stroke="var(--white)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M15.082 19.0006H17.917C18.7661 19.0247 19.4744 18.3567 19.5 17.5076V16.4936C19.4744 15.6449 18.7667 14.9771 17.918 15.0006H15.082C14.2333 14.9771 13.5256 15.6449 13.5 16.4936V17.5066C13.525 18.3557 14.2329 19.0241 15.082 19.0006Z"
                                    stroke="var(--white)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>Painel Principal</span>
                        </Link>
                    </div>
                    <div className="vertical-align w100 gap1 ai-start">
                        <span className="page-subtitle">Financeiro</span>
                        <Link className="button menu" to={`/expenses/${queryStr}`}
                            style={{ background: page === 'expenses' ? 'var(--bg-gradient-2)' : '' }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                                    stroke="var(--white)"
                                    strokeWidth="1.5"
                                />
                                <path
                                    d="M10 16H6"
                                    stroke="var(--white)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M14 16H12.5"
                                    stroke="var(--white)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M2 10L22 10"
                                    stroke="var(--white)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <span>Despesas</span>
                        </Link>
                        <Link className="button menu" to={`/incomes/${queryStr}`}
                            style={{ background: page === 'incomes' ? 'var(--bg-gradient-2)' : '' }}
                        >
                            <svg
                                fill="var(--white)"
                                viewBox="-5 0 19 19"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M8.699 11.907a3.005 3.005 0 0 1-1.503 2.578 4.903 4.903 0 0 1-1.651.663V16.3a1.03 1.03 0 1 1-2.059 0v-1.141l-.063-.011a5.199 5.199 0 0 1-1.064-.325 3.414 3.414 0 0 1-1.311-.962 1.029 1.029 0 1 1 1.556-1.347 1.39 1.39 0 0 0 .52.397l.002.001a3.367 3.367 0 0 0 .648.208h.002a4.964 4.964 0 0 0 .695.084 3.132 3.132 0 0 0 1.605-.445c.5-.325.564-.625.564-.851a1.005 1.005 0 0 0-.245-.65 2.06 2.06 0 0 0-.55-.44 2.705 2.705 0 0 0-.664-.24 3.107 3.107 0 0 0-.65-.066 6.046 6.046 0 0 1-1.008-.08 4.578 4.578 0 0 1-1.287-.415A3.708 3.708 0 0 1 1.02 9.04a3.115 3.115 0 0 1-.718-1.954 2.965 2.965 0 0 1 .321-1.333 3.407 3.407 0 0 1 1.253-1.335 4.872 4.872 0 0 1 1.611-.631V2.674a1.03 1.03 0 1 1 2.059 0v1.144l.063.014h.002a5.464 5.464 0 0 1 1.075.368 3.963 3.963 0 0 1 1.157.795A1.03 1.03 0 0 1 6.39 6.453a1.901 1.901 0 0 0-.549-.376 3.516 3.516 0 0 0-.669-.234l-.066-.014a3.183 3.183 0 0 0-.558-.093 3.062 3.062 0 0 0-1.572.422 1.102 1.102 0 0 0-.615.928 1.086 1.086 0 0 0 .256.654l.002.003a1.679 1.679 0 0 0 .537.43l.002.002a2.57 2.57 0 0 0 .703.225h.002a4.012 4.012 0 0 0 .668.053 5.165 5.165 0 0 1 1.087.112l.003.001a4.804 4.804 0 0 1 1.182.428l.004.002a4.115 4.115 0 0 1 1.138.906l.002.002a3.05 3.05 0 0 1 .753 2.003z" />
                                </g>
                            </svg>
                            <span>Receitas</span>
                        </Link>
                        <Link className="button menu" to="/dashboard">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z"
                                    stroke="var(--white)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>Exibir todos os registros</span>
                        </Link>
                    </div>
                    <div className="vertical-align w100 gap1 ai-start" id="etapa-8">
                        <span className="page-subtitle">Configurações</span>
                        <Link className="button menu" to="/settings?tag=banks">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M18 21V22C18.5523 22 19 21.5523 19 21H18ZM6 21H5C5 21.5523 5.44772 22 6 22V21ZM17.454 3.10899L17 4L17.454 3.10899ZM17.891 3.54601L17 4L17.891 3.54601ZM6.54601 3.10899L7 4L6.54601 3.10899ZM6.10899 3.54601L7 4L6.10899 3.54601ZM9 6C8.44772 6 8 6.44772 8 7C8 7.55228 8.44772 8 9 8V6ZM10 8C10.5523 8 11 7.55228 11 7C11 6.44772 10.5523 6 10 6V8ZM9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11V9ZM10 11C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9V11ZM14 9C13.4477 9 13 9.44772 13 10C13 10.5523 13.4477 11 14 11V9ZM15 11C15.5523 11 16 10.5523 16 10C16 9.44772 15.5523 9 15 9V11ZM14 12C13.4477 12 13 12.4477 13 13C13 13.5523 13.4477 14 14 14V12ZM15 14C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12V14ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14V12ZM10 14C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12V14ZM14 6C13.4477 6 13 6.44772 13 7C13 7.55228 13.4477 8 14 8V6ZM15 8C15.5523 8 16 7.55228 16 7C16 6.44772 15.5523 6 15 6V8ZM7.6 4H16.4V2H7.6V4ZM17 4.6V21H19V4.6H17ZM18 20H6V22H18V20ZM7 21V4.6H5V21H7ZM16.4 4C16.6965 4 16.8588 4.00078 16.9754 4.0103C17.0803 4.01887 17.0575 4.0293 17 4L17.908 2.21799C17.6366 2.07969 17.3668 2.03562 17.1382 2.01695C16.9213 1.99922 16.6635 2 16.4 2V4ZM19 4.6C19 4.33647 19.0008 4.07869 18.9831 3.86177C18.9644 3.63318 18.9203 3.36344 18.782 3.09202L17 4C16.9707 3.94249 16.9811 3.91972 16.9897 4.02463C16.9992 4.14122 17 4.30347 17 4.6H19ZM17 4L18.782 3.09202C18.5903 2.7157 18.2843 2.40973 17.908 2.21799L17 4ZM7.6 2C7.33647 2 7.07869 1.99922 6.86177 2.01695C6.63318 2.03562 6.36344 2.07969 6.09202 2.21799L7 4C6.94249 4.0293 6.91972 4.01887 7.02463 4.0103C7.14122 4.00078 7.30347 4 7.6 4V2ZM7 4.6C7 4.30347 7.00078 4.14122 7.0103 4.02463C7.01887 3.91972 7.0293 3.94249 7 4L5.21799 3.09202C5.07969 3.36344 5.03562 3.63318 5.01695 3.86177C4.99922 4.07869 5 4.33647 5 4.6H7ZM6.09202 2.21799C5.71569 2.40973 5.40973 2.71569 5.21799 3.09202L7 4L6.09202 2.21799ZM9 8H10V6H9V8ZM9 11H10V9H9V11ZM14 11H15V9H14V11ZM14 14H15V12H14V14ZM9 14H10V12H9V14ZM14 8H15V6H14V8ZM13 18V21H15V18H13ZM11 21V18H9V21H11ZM12 17C12.5523 17 13 17.4477 13 18H15C15 16.3431 13.6569 15 12 15V17ZM12 15C10.3431 15 9 16.3431 9 18H11C11 17.4477 11.4477 17 12 17V15Z"
                                    fill="var(--white)"
                                />
                            </svg>
                            <span>Bancos</span>
                        </Link>
                        <Link className="button menu" to="/settings?tag=categories">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.0498 7.0498H7.0598M10.5118 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V10.5118C3 11.2455 3 11.6124 3.08289 11.9577C3.15638 12.2638 3.27759 12.5564 3.44208 12.8249C3.6276 13.1276 3.88703 13.387 4.40589 13.9059L9.10589 18.6059C10.2939 19.7939 10.888 20.388 11.5729 20.6105C12.1755 20.8063 12.8245 20.8063 13.4271 20.6105C14.112 20.388 14.7061 19.7939 15.8941 18.6059L18.6059 15.8941C19.7939 14.7061 20.388 14.112 20.6105 13.4271C20.8063 12.8245 20.8063 12.1755 20.6105 11.5729C20.388 10.888 19.7939 10.2939 18.6059 9.10589L13.9059 4.40589C13.387 3.88703 13.1276 3.6276 12.8249 3.44208C12.5564 3.27759 12.2638 3.15638 11.9577 3.08289C11.6124 3 11.2455 3 10.5118 3ZM7.5498 7.0498C7.5498 7.32595 7.32595 7.5498 7.0498 7.5498C6.77366 7.5498 6.5498 7.32595 6.5498 7.0498C6.5498 6.77366 6.77366 6.5498 7.0498 6.5498C7.32595 6.5498 7.5498 6.77366 7.5498 7.0498Z"
                                    stroke="var(--white)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>Categorias</span>
                        </Link>
                        <Link className="button menu" to="/settings?tag=paymentForms">
                            <svg fill="var(--white)" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                <g><g><path d="M493.714,66.178h-69.66H197.661h-69.663c-10.099,0-18.286,8.187-18.286,18.286v69.659v30.475H18.286C8.187,184.598,0,192.785,0,202.884v224.653c0,10.099,8.187,18.286,18.286,18.286H335.24c10.099,0,18.286-8.187,18.286-18.286v-63.565h70.528h69.66c10.099,0,18.286-8.186,18.286-18.286v-69.66V154.122V84.464C512,74.364,503.813,66.178,493.714,66.178z M146.285,102.75h29.729c-5.214,13.642-16.084,24.511-29.729,29.725V102.75z M316.954,409.249H36.572V294.311h280.383V409.249z M316.954,257.74H36.572v-36.571h280.383V257.74z M475.428,327.4h-29.727c5.213-13.642,16.082-24.511,29.727-29.725V327.4z M475.428,259.667c-33.843,7.186-60.548,33.891-67.735,67.734h-54.169v-71.918h0.001c14.81-9.817,23.609-24.527,23.607-40.409c0-29.475-29.112-52.564-66.276-52.564c-21.971,0-42.032,8.405-54.207,22.088H146.285v-14.114c33.844-7.186,60.55-33.891,67.737-67.734h193.672c7.188,33.842,33.892,60.545,67.735,67.734V259.667z M475.428,132.475c-13.644-5.214-24.513-16.082-29.727-29.725h29.727V132.475z" /></g></g>
                                <g><g><path d="M152.383,330.883H91.429c-10.099,0-18.286,8.187-18.286,18.286c0,10.099,8.187,18.286,18.286,18.286h60.954c10.099,0,18.286-8.187,18.286-18.286C170.668,339.07,162.481,330.883,152.383,330.883z" /></g></g>
                            </svg>
                            <span>Formas de pagamento</span>
                        </Link>
                    </div>
                </div>
                <div className="vertical-align gap1">
                    <span className="fontw-600 text-4xl">{user.data.nome}</span>
                    <button className="button menu" type="button">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
                                    stroke="var(--white)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                        </svg>
                        <span>Ativar Modo Claro</span>
                    </button>
                    <div className="horizontal-align gap1 aside-menu__user-actions">
                        <Link className="button w100" to='/user-account'>
                            <svg viewBox="0 0 24 24" fill=" var(--white)" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>Minha Conta</span>
                        </Link>
                        <button className="button w100 bg-gradient-red" type="button" onClick={logoutSystem}>
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M12.9999 2C10.2385 2 7.99991 4.23858 7.99991 7C7.99991 7.55228 8.44762 8 8.99991 8C9.55219 8 9.99991 7.55228 9.99991 7C9.99991 5.34315 11.3431 4 12.9999 4H16.9999C18.6568 4 19.9999 5.34315 19.9999 7V17C19.9999 18.6569 18.6568 20 16.9999 20H12.9999C11.3431 20 9.99991 18.6569 9.99991 17C9.99991 16.4477 9.55219 16 8.99991 16C8.44762 16 7.99991 16.4477 7.99991 17C7.99991 19.7614 10.2385 22 12.9999 22H16.9999C19.7613 22 21.9999 19.7614 21.9999 17V7C21.9999 4.23858 19.7613 2 16.9999 2H12.9999Z"
                                        fill="var(--white)"
                                    />
                                    <path
                                        d="M13.9999 11C14.5522 11 14.9999 11.4477 14.9999 12C14.9999 12.5523 14.5522 13 13.9999 13V11Z"
                                        fill="var(--white)"
                                    />
                                    <path
                                        d="M5.71783 11C5.80685 10.8902 5.89214 10.7837 5.97282 10.682C6.21831 10.3723 6.42615 10.1004 6.57291 9.90549C6.64636 9.80795 6.70468 9.72946 6.74495 9.67492L6.79152 9.61162L6.804 9.59454L6.80842 9.58848C6.80846 9.58842 6.80892 9.58778 5.99991 9L6.80842 9.58848C7.13304 9.14167 7.0345 8.51561 6.58769 8.19098C6.14091 7.86637 5.51558 7.9654 5.19094 8.41215L5.18812 8.41602L5.17788 8.43002L5.13612 8.48679C5.09918 8.53682 5.04456 8.61033 4.97516 8.7025C4.83623 8.88702 4.63874 9.14542 4.40567 9.43937C3.93443 10.0337 3.33759 10.7481 2.7928 11.2929L2.08569 12L2.7928 12.7071C3.33759 13.2519 3.93443 13.9663 4.40567 14.5606C4.63874 14.8546 4.83623 15.113 4.97516 15.2975C5.04456 15.3897 5.09918 15.4632 5.13612 15.5132L5.17788 15.57L5.18812 15.584L5.19045 15.5872C5.51509 16.0339 6.14091 16.1336 6.58769 15.809C7.0345 15.4844 7.13355 14.859 6.80892 14.4122L5.99991 15C6.80892 14.4122 6.80897 14.4123 6.80892 14.4122L6.804 14.4055L6.79152 14.3884L6.74495 14.3251C6.70468 14.2705 6.64636 14.1921 6.57291 14.0945C6.42615 13.8996 6.21831 13.6277 5.97282 13.318C5.89214 13.2163 5.80685 13.1098 5.71783 13H13.9999V11H5.71783Z"
                                        fill="var(--white)"
                                    />
                                </g>
                            </svg>
                            <span>Sair</span>
                        </button>
                    </div>
                </div>
            </aside>
            <main className="vertical-align w100 min-h-100vh">
                <Header tag={page} amount={amount} />
                <section className='p4-0 w83 m0auto vertical-align gap4 jc-between'>
                    <div className="financial-summary horizontal-align gap4 w100">
                        <div className="financial-summary__sum gap1">
                            <div className="vertical-align w100 gap1">
                                <h1 className="financial-summary__sum-title text-gray-500 fontw-500 text-5xl">Receita mensal</h1>
                                <AnimatedNumber value={resume.somaRenda.valor} />
                            </div>
                            <img className='bg-green-1000' src="https://fluxofinanceiro.site/assets/receitas.png" alt="income icon" />
                        </div>
                        <div className="financial-summary__sum gap1">
                            <div className="vertical-align w100 gap1">
                                <h1 className="financial-summary__sum-title text-gray-500 fontw-500 text-5xl">Despesas totais</h1>
                                <AnimatedNumber value={resume.somaCobrancas.valor} />
                            </div>
                            <img className='bg-red-900' src="https://fluxofinanceiro.site/assets/despesa.png" alt="expense icon" />
                        </div>
                        <div className="financial-summary__sum gap1">
                            <div className="vertical-align w100 gap1">
                                <h1 className="financial-summary__sum-title text-gray-500 fontw-500 text-5xl">Saldo restante</h1>
                                <AnimatedNumber value={resume.saldoRestante.valor} />
                            </div>
                            <img className='bg-main-500' src="https://fluxofinanceiro.site/assets/carteira.png" alt="wallet icon" />
                        </div>
                    </div>
                    {children}

                </section>
                <Footer />
            </main>

            <ModalDelete />
            <ModalExpense />
        </main>
    );
}