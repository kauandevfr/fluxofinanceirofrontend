import React, { useState, useEffect } from "react";
import './style.scss';
import Container from "../../components/Container";
import { Link } from 'react-router-dom'
import { useGlobalContext } from "../../providers/globalContext";
import CardCategory from "../../components/CardCategory";
import { useExpenseContext } from "../../providers/expenseContext";
import WithoutListing from "../../components/WithoutListing";
import Skeleton from "../../components/Skeleton";
import { format } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

export default function Expenses() {
  const { currentMonthYear } = useGlobalContext()
  const { expenses } = useExpenseContext()

  const { mes, ano } = currentMonthYear()

  useEffect(() => {
    document.title = "Despesas | Fluxo Financeiro";
  }, [])

  return (
    <Container amount={1}>
      <div className="horizontal-align jc-between ">
        <Link className="button" to={`/dashboard/?mes=${mes}&ano=${ano}`}>Painel</Link>
        <div className="horizontal-align gap2">
          <button className="button" type="button">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Edit / Add_Plus_Circle">
                <path
                  d="M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                  stroke="var(--white)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            Adicionar despesa
          </button>
          <button className="button" type="button">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z"
                fill="var(--white)"
              />
            </svg>
            Filtros
          </button>
          <button className="button" type="button">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 20C7.58172 20 4 16.4183 4 12M20 12C20 14.5264 18.8289 16.7792 17 18.2454"
                stroke="var(--white)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M12 14L12 4M12 4L15 7M12 4L9 7"
                stroke="var(--white)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Exportar para PDF
          </button>
        </div>
      </div>
      <input className="input" type="text" placeholder="Pesquise por titulo" />
      <header className="list-header">
        <div className="list-cell">
          <img src="https://www.fluxofinanceiro.site/assets/ordem.png" alt="order icon"

          />
          <h1 className="list-row__title">Titulo</h1>
        </div>
        <div className="list-cell">
          <img src="https://www.fluxofinanceiro.site/assets/ordem.png" alt="order icon"

          />
          <h1 className="list-row__title">Pagamento</h1>
        </div>
        <div className="list-cell">
          <img src="https://www.fluxofinanceiro.site/assets/ordem.png" alt="order icon"

          />
          <h1 className="list-row__title">Categoria</h1>
        </div>
        <div className="list-cell">
          <img src="https://www.fluxofinanceiro.site/assets/ordem.png" alt="order icon"

          />
          <h1 className="list-row__title">Status</h1>
        </div>
        <div className="list-cell">
          <img src="https://www.fluxofinanceiro.site/assets/ordem.png" alt="order icon"

          />
          <h1 className="list-row__title">Valor</h1>
        </div>
        <div className="list-cell">
          <img src="https://www.fluxofinanceiro.site/assets/ordem.png" alt="order icon"

          />
          <h1 className="list-row__title">Vencimento</h1>
        </div>
        <div className="list-cell jc-center">
          <h1 className="list-row__title">Editar ou excluir</h1>
        </div>
      </header>
      <ul className="vertical-align gap2">
        {expenses.loading ? <Skeleton /> : expenses.items.length ?
          expenses.items.map(element => {
            const formattedDueDate = element.datavencimento ? format(fromZonedTime(element.datavencimento, "America/Sao_Paulo"), "dd/MM/yyyy") : 'Não consta'
            return (
              <li className="list-row w100" key={element.id}>
                <div className="list-cell">
                  <h1 className="list-row__title">{element.titulo}</h1>
                </div>
                <div className="list-cell">
                  <CardCategory title={element.formapagamento.titulo} color={element.formapagamento.cor} />
                </div>
                <div className="list-cell">
                  <CardCategory title={element.categoria.titulo} color={element.categoria.cor} />
                </div>
                <div className="list-cell">
                  <CardCategory title={element.status == 1 ? "Pago" : "Não pago"} color={element.status == 1 ? "var(--green-1000)" : "var(--red-1000)"} />
                </div>
                <div className="list-cell">
                  <h1 className="list-row__title">{element.precoBR}</h1>
                </div>
                <div className="list-cell">
                  <h1 className="list-row__title">{formattedDueDate}</h1>
                </div>
                <div className="list-cell gap4 jc-center">
                  <button>
                    <img src="https://fluxofinanceiro.site/assets/editar.png" alt="edit icon" />
                  </button>
                  <button>
                    <img src="https://fluxofinanceiro.site/assets/deletar.png" alt="delete icon" />
                  </button>
                </div>
              </li>
            )
          }) : <WithoutListing />}
      </ul>
    </Container>
  );
}
