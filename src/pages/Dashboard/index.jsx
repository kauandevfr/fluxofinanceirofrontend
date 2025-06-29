import React, { useState, useEffect } from "react";
import './style.scss';
import Container from "../../components/Container";
import { Link } from "react-router-dom";
import CardCategory from "../../components/CardCategory";

export default function Dashboard() {

  useEffect(() => {
    document.title = "Painel | Fluxo Financeiro";
  }, [])

  return (
    <Container>
      <section className="resume-expense-incomes vertical-align gap1">
        <h2 className="page-subtitle">Resumo</h2>
        <div className="horizontal-align gap4">
          <ul className="resume__item">
            <header>
              <h1 className="page-title">Despesas</h1>
              <Link className="link" to={'/'}>Ver mais</Link>
            </header>
            <li className="list-item">
              <div className="vertical-align">
                <h1 className="list-item__title">teste</h1>
                <h2 className="list-item__subtitle">teste cat</h2>
              </div>
              <h3 className="list-item__title">r$ 1.000,00</h3>
            </li>
          </ul>
          <ul className="resume__item">
            <header>
              <h1 className="page-title">Receitas</h1>
              <Link className="link" to={'/'}>Ver mais</Link>
            </header>
            <li className="list-item">
              <h1 className="list-item__title">teste</h1>
              <h3 className="list-item__title">r$ 1.000,00</h3>
            </li>
          </ul>
        </div>
      </section>

      <section className="sum-categories vertical-align gap1">
        <h2 className="page-subtitle">Somatória</h2>
        <div className="horizontal-align gap4">
          <ul className="resume__item">
            <header>
              <h1 className="page-title">Categoria</h1>
            </header>
            <li className="list-item">
              <CardCategory title="Alimentação" color="var(--gray-500)" />

              <div className="horizontal-align gap1">
                <span className="list-item__title">R$ 1.000,00</span>
                <span className="page-subtitle">10</span>
              </div>
            </li>
          </ul>
          <ul className="resume__item">
            <header>
              <h1 className="page-title">Forme de Pagamento</h1>
            </header>
            <li className="list-item">
              <CardCategory title="PIX" color="var(--gray-500)" />
              <div className="horizontal-align gap1">
                <span className="list-item__title">R$ 1.000,00</span>
                <span className="page-subtitle">10</span>
              </div>
            </li>
          </ul>
          <ul className="resume__item">
            <header>
              <h1 className="page-title">Status</h1>
            </header>
            <li className="list-item">
              <CardCategory title="Pagos" color="var(--green-1000)" />
              <div className="horizontal-align gap1">
                <span className="list-item__title">R$ 1.000,00</span>
                <span className="page-subtitle">10</span>
              </div>
            </li>
            <li className="list-item">
              <CardCategory title="Não pagos" color="var(--red-1000)" />
              <div className="horizontal-align gap1">
                <span className="list-item__title">R$ 1.000,00</span>
                <span className="page-subtitle">10</span>
              </div>
            </li>
          </ul>
          <ul className="resume__item">
            <header>
              <h1 className="page-title">Vencimento</h1>
            </header>
            <li className="list-item">
              <CardCategory title="No prazo" color="var(--green-1000)" />
              <div className="horizontal-align gap1">
                <span className="list-item__title">R$ 1.000,00</span>
                <span className="page-subtitle">10</span>
              </div>
            </li>
            <li className="list-item">
              <CardCategory title="Pendetes" color="var(--red-1000)" />
              <div className="horizontal-align gap1">
                <span className="list-item__title">R$ 1.000,00</span>
                <span className="page-subtitle">10</span>
              </div>
            </li>
          </ul>
        </div>

      </section>
    </Container>
  );
}
