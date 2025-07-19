import React, { useState, useEffect } from "react";
import './style.scss';
import PasswordCriteria from "../../components/PasswordCriteria"
import ButtonSubmit from "../../components/ButtonSubmit";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useGlobalContext } from "../../providers/globalContext";
import { Link, useParams } from "react-router-dom";
import instance from "../../utilities/instance";
import Alert from "../../components/Alert";
import { schemaRecoveryPass } from "../../schemas/users/password";
import FooterCopyright from "../../components/FooterCopyright";

export default function RecoverPassword() {
  const { showError, setAlertModal, currentMonthYear, redirect } = useGlobalContext()
  const { token } = useParams()

  const { register, watch, handleSubmit, formState: { isSubmitting, errors } } = useForm({
    resolver: yupResolver(schemaRecoveryPass)
  })

  const { mes, ano } = currentMonthYear()

  const updatePass = async data => {
    try {
      await instance.put(`usuario/senha/recuperar-senha/${token}`, data)

      setAlertModal({
        open: true,
        tag: "sucess",
        message: "Senha alterada com sucesso!",
        onClose: () => {
          redirect(`/dashboard/?mes=${mes}&ano=${ano}`);
        }
      });

    } catch (error) {
      showError(error)
    }
  }

  useEffect(() => {
    document.title = "Alterar senha | Fluxo Financeiro";
  }, [])

  return (
    <main className="center-align animated-gradient min-h-100vh">
      <form className="form" onSubmit={handleSubmit(updatePass)}>
        <header className="vertical-align p2 ai-center gap1">
          <img className="form-icon bg-gradient-2 w5rem" src="http://fluxofinanceiro.site/assets/senha.png" alt="delete icon" />
          <h1 className="form-title">Recupere a sua senha</h1>
          <h2 className="form-subtitle">Insira seu email para receber as instruções de recuperação</h2>
        </header>

        <div className="vertical-align p2 gap2">
          <div className="item-form">
            <label className="label" htmlFor="newPass">Crie uma nova senha</label>
            <input className="input" type="password" id="newPass" placeholder="*******" required autoFocus
              {...register("senha")}
            />
          </div>
          <div className="item-form">
            <label className="label" htmlFor="repeatPass">Repita a senha</label>
            <input className="input" type="password" id="repeatPass" placeholder="*******" required
              {...register("repitaSenha")}
            />
            {errors.repitaSenha && <span className="span-message error">{errors.repitaSenha?.message}</span>}
          </div>

          <PasswordCriteria value={watch("senha")} />

          <ButtonSubmit isLoading={isSubmitting}>Alterar senha</ButtonSubmit>

          <Link className="span-message w100 text-center textd-none" to={`/dashboard/?mes=${mes}&ano=${ano}`}>Voltar para o painel</Link>
        </div>
      </form>
      <FooterCopyright />
      <Alert />
    </main>
  );
}

