import { useEffect } from "react";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import Alert from "../../components/Alert";
import { useGlobalContext } from "../../providers/globalContext";
import instance from "../../utilities/instance";
import './style.scss';
import ButtonSubmit from "../../components/ButtonSubmit";

const schemaEmail = Yup.object().shape({
  email: Yup
    .string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório")
});

export default function SendTokenPassword() {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm({ resolver: yupResolver(schemaEmail) })
  const { showError, setAlertModal, currentMonthYear } = useGlobalContext()

  const { mes, ano } = currentMonthYear()

  const sendToken = async data => {
    try {
      await instance.post("usuario/senha/enviar-token", data);
      setAlertModal({
        open: true,
        tag: "sucess",
        message: `Email enviado com sucesso! Verifique sua caixa de entrada.`
      })
    } catch (error) {
      showError(error)
    }
  }

  useEffect(() => {
    document.title = "Recuperar senha | Fluxo Financeiro";
  }, [])

  return (
    <main className="center-align animated-gradient min-h-100vh">
      <form className="form" onSubmit={handleSubmit(sendToken)}>
        <header className="vertical-align p2 ai-center gap1">
          <img className="form-icon bg-gradient-2 w5rem" src="http://fluxofinanceiro.site/assets/carteira.png" alt="wallet icon" />
          <h1 className="form-title">Recupere a sua senha</h1>
          <h2 className="form-subtitle">Para darmos continuidade à alteração da sua senha, pedimos que nos informe o e-mail associado à sua conta.</h2>
        </header>
        <div className="vertical-align p2 gap2">
          <div className="item-form">
            <label className="label" htmlFor="email">Email</label>
            <input className="input" type="email" id="email" placeholder="seuemail@email.com" required autoFocus
              {...register('email')}
            />
            {errors.email && <span className="span-message error">{errors.email?.message}</span>}
          </div>
          <ButtonSubmit isLoading={isSubmitting}>Enviar</ButtonSubmit>
          <span className="span-message text-center">Você receberá um e-mail contendo um link para redefinição de sua senha. Este link permanecerá válido por 15 minutos.</span>
          <Link className="span-message w100 text-center textd-none" to={`/dashboard/?mes=${mes}&ano=${ano}`}>Voltar para o painel</Link>
        </div>

      </form>

      <Alert />
    </main>
  );
}
