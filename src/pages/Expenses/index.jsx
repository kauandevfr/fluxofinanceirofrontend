import React, { useState, useEffect } from "react";
import './style.scss';
import Container from "../../components/Container";

export default function Expenses() {

  useEffect(() => {
    document.title = "Despesas | Fluxo Financeiro";
  }, [])

  return (
    <Container>
    </Container>
  );
}
