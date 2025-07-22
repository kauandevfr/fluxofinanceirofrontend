import { Link } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import './style.scss';
import loginUsers from '../../schemas/users/login';
import { useUserContext } from '../../providers/userContext';
import { useEffect, useState } from 'react';
import Alert from "../../components/Alert"
import ButtonSubmit from '../../components/ButtonSubmit';
import FooterCopyright from '../../components/FooterCopyright';
import PasswordCriteria from '../../components/PasswordCriteria';
import registerUsers from '../../schemas/users/register';

export default function LoginRegister() {

  const [isReversed, setIsReversed] = useState(false);

  const { loginUser, registerUser } = useUserContext()

  const { register: rLogin, handleSubmit: hLogin, formState: { isSubmitting: isSubL } } = useForm({ resolver: yupResolver(loginUsers) })

  const { watch: watchR, register: rRegister, handleSubmit: hRegister, formState: { errors: errorsR, isSubmitting: isSubR } } = useForm({ resolver: yupResolver(registerUsers) })

  useEffect(() => {
    document.title = "Acessar Conta | Fluxo Financeiro";
  }, [])

  return (
    <main className="center-align min-h-100vh animated-gradient">
      <div className={`double-form br ${isReversed ? "reversed" : ""}`}>
        <div className="left center-align p4 br bg-gray-800">
          {!isReversed ?
            <form className="vertical-align gap2 w100" onSubmit={hLogin(loginUser)} >

              <header className="vertical-align ai-center gap1">
                <img className="form-icon br bg-gradient-2" src="https://www.fluxofinanceiro.site/assets/carteira.png" alt="Wallet icon" />
                <h1 className="form-title">Acesse a sua conta</h1>
                <h2 className="form-subtitle">Seu dinheiro, sua liberdade.</h2>
              </header>

              <div className="item-form">
                <label className="label" htmlFor="email">Email</label>
                <input className="input" type="email" id="email" placeholder="seuemail@email.com" required {...rLogin("email")} />
              </div>
              <div className="item-form">
                <label className="label" htmlFor="password">Senha</label>
                <input className="input" type="password" id="password" placeholder="********" required  {...rLogin("senha")} />
              </div>
              <Link className="link text-right" to="/send-token-password">Esqueceu a senha?</Link>
              <ButtonSubmit className="button w100" isLoading={isSubL}>Iniciar Sessão</ButtonSubmit>
            </form>
            :
            <form className="vertical-align gap2 w100" onSubmit={hRegister(registerUser)}>

              <header className="vertical-align ai-center gap1">
                <img className="form-icon br bg-gradient-2" src="https://www.fluxofinanceiro.site/assets/carteira.png" alt="Wallet icon" />
                <h1 className="form-title">Crie a sua conta</h1>
                <h2 className="form-subtitle">Comece sua jornada financeira hoje.</h2>
              </header>
              <div className="item-form">
                <label className="label" htmlFor="name">Nome completo</label>
                <input className="input" type="text" id="name" placeholder="Kauan Rodrigues" required autoFocus {...rRegister("nome")} />
                {errorsR.nome && <span className="span-message error">{errorsR.nome?.message}</span>}
              </div>
              <div className="item-form">
                <label className="label" htmlFor="email">Email</label>
                <input className="input" type="email" id="email" placeholder="seuemail@email.com" required {...rRegister("email")} />
                {errorsR.email && <span className="span-message error">{errorsR.email?.message}</span>}
              </div>
              <div className="item-form">
                <label className="label" htmlFor="password">Senha</label>
                <input className="input" type="password" id="password" placeholder="********" required {...rRegister("senha")} />
              </div>
              <PasswordCriteria value={watchR("senha")} />
              <ButtonSubmit isLoading={isSubR}>Registrar</ButtonSubmit>
            </form>
          }
        </div>
        <div className="right bg-gradient-2 center-align gap2 p4 text-center br">
          {!isReversed ? <>
            <span className="page-title">Novo por aqui?</span>
            <span className="page-subtitle ">Crie a sua conta agora e comece a transformar a sua vida financeira.</span>
            <button className="button" to="/register" type="button" onClick={() => setIsReversed(!isReversed)}>
              Criar conta
            </button>
          </>
            :
            <>
              <span className="page-title">Já tem uma conta?</span>
              <span className="page-subtitle">Faça login e continue sua jornada financeira!  </span>
              <button className="button" to="/register" type="button" onClick={() => setIsReversed(!isReversed)}>
                Conecte-se
              </button>
            </>}
        </div>
      </div>
      <Alert />
      <FooterCopyright />
    </main>
  );
}
