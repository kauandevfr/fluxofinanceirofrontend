import React, { useState, useEffect } from "react";
import './style.scss';
import Alert from "../../components/Alert";
import { useGlobalContext } from "../../providers/globalContext";
import instance from "../../utilities/instance";
import { Link } from "react-router-dom";

export default function SendTokenPassword() {

  const [email, setEmail] = useState("")

  const { showError, setAlertModal } = useGlobalContext()

  const sendToken = async e => {
    e.preventDefault()

    const btn = e.target.querySelector('button.button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Enviando solicitação...';

    try {
      await instance.post("usuario/senha/enviar-token", { email });
      setAlertModal({
        open: true,
        tag: "sucess",
        message: `Email enviado com sucesso! Verifique sua caixa de entrada.`
      })
    } catch (error) {
      showError(error)
    } finally {
      btn.disabled = false
      btn.textContent = 'Enviar Email de Recuperação'
    }
  }

  useEffect(() => {
    document.title = "Recuperar senha | Fluxo Financeiro";
  }, [])
  return (
    <main className="center-align animated-gradient min-h-100vh">
      <form className="form" onSubmit={(e) => sendToken(e)}>
        <header className="vertical-align p2 ai-center gap1">
          <img className="form-icon bg-gradient" src="http://fluxofinanceiro.site/assets/carteira.png" alt="delete icon" />
          <h1 className="form-title">Recupere a sua senha</h1>
          <h2 className="form-subtitle">Insira seu email para receber as instruções de recuperação</h2>
        </header>

        <div className="vertical-align p2 gap2">
          <div className="item-form">
            <label className="label" htmlFor="email">Email</label>
            <input className="input" type="email" id="email" placeholder="seuemail@email.com" required autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="button" type="submit" disabled={!email} >Enviar Email de Recuperação</button>
          <Link className="span-message w100 text-center textd-none" to="/login">Voltar para a página anterior</Link>
        </div>

      </form>

      <Alert />
    </main>
  );
}
