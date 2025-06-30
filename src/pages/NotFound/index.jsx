import React, { useState, useEffect } from "react";
import './style.scss';
import { Link } from "react-router-dom";

export default function NotFound() {

  useEffect(() => {
    document.title = "Página não encontrada | Fluxo Financeiro";
  }, [])

  return (
    <main className="not-found center-align min-h-100vh animated-gradient gap4">
      <div className="not-found__titles vertical-align ai-center po-r gap4 br p4">
        <h1 className="not-found__title">404</h1>
        <h2 className="not-found__subtitle text-6xl">Página não encontrada</h2>
      </div>

      <div className="not-found__content vertical-align p4 br bg-gray-800 ai-center gap2">
        <h1 className="page-title">Ops! A página que você procura não está disponível</h1>
        <p className="page-subtitle">A página pode ter sido removida, renomeada ou está temporariamente indisponível.</p>
        <Link className="button w100" to="/"> Voltar para a página inicial</Link>
      </div>
    </main>
  );
}
