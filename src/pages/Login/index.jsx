import { Link } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import './style.scss';
import loginUsers from '../../schemas/users/login';
import { useUserContext } from '../../providers/userContext';

export default function Login() {

  const { register, handleSubmit } = useForm({ resolver: yupResolver(loginUsers) })

  const { loginUser } = useUserContext()

  useEffect(() => {
    document.title = "Login | Fluxo Financeiro";
  }, [])

  return (
    <main className="center-align min-h-100vh animated-gradient">
      <form className="form" onSubmit={handleSubmit(loginUser)}>
        <header className="header-form center-align">
          <img className="form-icon br bg-gradient-2" src="https://www.fluxofinanceiro.site/assets/carteira.png" alt="Wallet icon" />
          <h1 className="form-title">Acesse a sua conta</h1>
          <h2 className="form-subtitle">Seu dinheiro, sua liberdade.</h2>
        </header>
        <div className="vertical-align p2 gap2">
          <div className="item-form">
            <label className="label" htmlFor="email">Email</label>
            <input className="input" type="email" id="email" placeholder="seuemail@email.com" required {...register("email")} />
          </div>
          <div className="item-form">
            <label className="label" htmlFor="password">Senha</label>
            <input className="input" type="password" id="password" placeholder="********" required  {...register("senha")} />
          </div>
          <button className="button" type="submit">Iniciar Sessão</button>
          <div className="horizontal-align gap2 br bg-gray-700 p2">
            <svg
              className="w5rem"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: 'rotate(90deg)' }}
            >
              <path
                d="M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="var(--main-800)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="vertical-align gap1">
              <span className="text-3xl">Novo por aqui?</span>
              <span className="text-2xl text-gray-500">Crie a sua conta agora e comece a transformar a sua vida financeira. &nbsp;
                <Link className="link" to="/register" >Criar conta</Link>
              </span>
            </div>
          </div>
        </div>
        <footer className="center-align footer-form">
          <span className="footer-form__title">© {new Date().getFullYear()} Fluxo Financeiro. Todos os direitos reservados.</span>
        </footer>
      </form>
    </main>
  );
}
