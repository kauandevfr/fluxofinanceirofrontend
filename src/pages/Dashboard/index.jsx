import React, { useState, useEffect } from "react";
import './style.scss';
import Container from "../../components/Container";
import { Link } from "react-router-dom";
import CardCategory from "../../components/CardCategory";
import { useGlobalContext } from "../../providers/globalContext";
import Skeleton from "../../components/Skeleton";
import WithoutListing from "../../components/WithoutListing";
import { useExpenseContext } from "../../providers/expenseContext";
import { useIncomeContext } from "../../providers/incomeContext";

export default function Dashboard() {

  const { resume, queryParams } = useGlobalContext()
  const { expenses, listingExpenses } = useExpenseContext()
  const { incomes, listingIncomes } = useIncomeContext()

  const { query } = queryParams()

  useEffect(() => {
    listingIncomes()
    listingExpenses()
    document.title = "Painel | Fluxo Financeiro";

  }, [])

  return (
    <Container>
      <section className="resume-expense-incomes vertical-align gap1">
        <h2 className="page-subtitle">Resumo</h2>
        <div className="horizontal-align gap4" id="step-3">
          <ul className="resume__item">
            <header>
              <h1 className="page-title">Despesas</h1>
              <Link className="link" to={`/expenses/?${query.toString()}`} id="step-4">Ver mais</Link>
            </header>
            {expenses.loading ? <Skeleton /> : expenses.items.length ?
              expenses.items.slice(0, 5).map(element => {
                return (
                  <li className="list-row" key={element.id}>
                    <div className="vertical-align">
                      <h1 className="list-row__title">{element.titulo}</h1>
                      <h2 className="list-row__subtitle">{element.categoria.titulo}</h2>
                    </div>
                    <h3 className="list-row__title">{element.precoBR}</h3>
                  </li>
                )
              }) : <WithoutListing tag="expense" />}
          </ul>
          <ul className="resume__item">
            <header>
              <h1 className="page-title">Receitas</h1>
              <Link className="link" to={`/incomes/?${query.toString()}`}>Ver mais</Link>
            </header>
            {incomes.loading ? <Skeleton /> : incomes.items.length ?
              incomes.items.slice(0, 5).map(element => {
                return (
                  <li className="list-row" key={element.id}>
                    <h1 className="list-row__title">{element.titulo}</h1>
                    <h3 className="list-row__title">{element.precoBR}</h3>
                  </li>
                )
              }) : <WithoutListing tag="income" />}
          </ul>
        </div>
      </section>
      <section className="sum-categories vertical-align gap1" id="step-5">
        <h2 className="page-subtitle">Somatória</h2>
        <div className="horizontal-align gap4">
          <ul className="resume__item">
            <header>
              <h1 className="page-title">Categoria</h1>
            </header>
            {resume.loading ? <Skeleton /> : resume.categoria?.length ?
              resume.categoria.map((element, index) => {
                return (
                  <li className="list-row" key={index}>
                    <CardCategory title={element.categoria} color={element.cor} />
                    <div className="horizontal-align gap1">
                      <span className="list-row__title">{element.somaBR}</span>
                      <span className="page-subtitle">{element.qtd}</span>
                    </div>
                  </li>
                )
              }) : <WithoutListing tag="category" />}
          </ul>
          <ul className="resume__item">
            <header>
              <h1 className="page-title">Forme de Pagamento</h1>
            </header>
            {resume.loading ? <Skeleton /> : resume.pagamento?.length ?
              resume.pagamento.map((element, index) => {
                return (
                  <li className="list-row" key={index}>
                    <CardCategory title={element.formapagamento} color={element.cor} />
                    <div className="horizontal-align gap1">
                      <span className="list-row__title">{element.somaBR}</span>
                      <span className="page-subtitle">{element.qtd}</span>
                    </div>
                  </li>
                )
              }) : <WithoutListing tag="paymentform" />}
          </ul>
          <ul className="resume__item">
            <header>
              <h1 className="page-title">Status</h1>
            </header>
            {resume.loading ? <Skeleton /> : resume.status?.length ?
              resume.status.map((element, index) => {
                return (
                  <li className="list-row" key={index}>
                    <CardCategory title={element.status == 1 ? "Pago" : "Não Pago"} color={element.status == 1 ? "var(--green-1000)" : "var(--red-1000)"} />
                    <div className="horizontal-align gap1">
                      <span className="list-row__title">{element.somaBR}</span>
                      <span className="page-subtitle">{element.qtd}</span>
                    </div>
                  </li>
                )
              }) : <WithoutListing tag="status" />}
          </ul>
          <ul className="resume__item">
            <header>
              <h1 className="page-title">Vencimento</h1>
            </header>
            {resume.loading ? <Skeleton /> : resume.vencimento?.length ?
              resume.vencimento.map((element, index) => {
                return (
                  <li className="list-row" key={index}>
                    <CardCategory title={element.status == 0 ? "No prazo" : "Pendente"} color={element.status == 0 ? "var(--green-1000)" : "var(--red-1000)"} />
                    <div className="horizontal-align gap1">
                      <span className="list-row__title">{element.somaBR}</span>
                      <span className="page-subtitle">{element.qtd}</span>
                    </div>
                  </li>
                )
              }) : <WithoutListing tag="overdue" />}
          </ul>
        </div>
      </section>

    </Container>
  );
}
