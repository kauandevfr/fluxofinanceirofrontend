import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import PasswordCriteria from "../../components/PasswordCriteria";
import { useGlobalContext } from "../../providers/globalContext";
import { useUserContext } from "../../providers/userContext";
import updateUsers from "../../schemas/users/update";
import './style.scss';
import instance from "../../utilities/instance";
import Alert from "../../components/Alert"

export default function User() {
  const [content, setContent] = useState('personalData')
  const { currentMonthYear, showError } = useGlobalContext()
  const { listUser, user } = useUserContext()
  const { mes, ano } = currentMonthYear()

  const { register: registerUser, reset: resetUser, handleSubmit: handleSubmitUser, formState: { errors: errorsUser } } = useForm({
    resolver: yupResolver(updateUsers)
  })

  const { watch, register: registerPass, reset: resetPass, handleSubmit: handleSubmitPass, setError: setErrorPass, formState: { errors: errorsPass }
  } = useForm();

  const updateUser = async data => {
    data = Object.keys(data)
      .filter(e => data[e] !== "")
      .reduce((obj, key) => (obj[key] = data[key], obj), {});
    try {
      await instance.put("/usuario", { ...data })
      setAlertModal({
        open: true,
        tag: "suceess",
        message: "Sucesso ao atualizar seus dados!"
      })

      listUser()
    } catch (error) {
      showError(error)
    }
  }

  const updatePass = async data => {
    if (data.senhaNova !== data.senhaNovaRepetida) {
      setErrorPass("senhaNovaRepetida", {
        type: "manual",
        message: "As senhas não coincidem"
      });
      return;
    }
    const { senhaNovaRepetida, ...dataToSend } = data;
    try {
      await instance.put("/usuario", dataToSend)

      setAlertModal({
        open: true,
        tag: "suceess",
        message: "Sucesso ao atualizar sua senha!"
      })
      listUser()
    } catch (error) {
      showError(error)
    }
  }
  useEffect(() => {
    if (content === "updatePass") {
      resetPass();
    }
    if (content === "personalData" && user.data) {
      const { nome, email, numerocontato, datadenascimento } = user.data;
      resetUser({
        nome,
        email,
        numerocontato,
        datadenascimento
      });
    }
  }, [content, user.data, resetUser, resetPass]);
  useEffect(() => {
    listUser();
    document.title = "Minha conta | Fluxo Financeiro";
  }, []);

  return (
    <main className="min-h-100vh vertical-align">
      <Header tag={"user-account"} />
      <section className='user-account p4-0 w83 m0auto horizontal-align gap4 jc-between '>

        <div className="user-account__menu p4 bg-gray-800 br center-align gap2 po-r">
          <Link className="button user-account__menu-todashboard"
            to={`/dashboard/?mes=${mes}&ano=${ano}`}
          >
            <img src="https://www.fluxofinanceiro.site/assets/seta-esquerda.png" alt="Seta para esquerda" />
          </Link>

          <div className="user-account__menu-avatar"></div>
          <div className="center-align w100 gap1">
            <h1 className="page-title text-center">{user.data.nome}</h1>
            <h2 className="page-subtitle">Membro desde 2021.</h2>
          </div>
          <div className="vertical-align gap1 w100">
            <button className="button menu" type="button"
              style={{ background: content == 'personalData' ? 'var(--bg-gradient-2)' : '' }}
              onClick={() => setContent("personalData")}
            >
              <svg viewBox="0 0 24 24" fill=" var(--white)" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Dados Pessoais
            </button>
            <button className="button menu" type="button"
              style={{ background: content == 'updatePass' ? 'var(--bg-gradient-2)' : '' }}
              onClick={() => setContent("updatePass")}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M8.18164 10.7027C8.18164 10.7027 8.18168 8.13513 8.18164 6.59459C8.1816 4.74571 9.70861 3 11.9998 3C14.291 3 15.8179 4.74571 15.8179 6.59459C15.8179 8.13513 15.8179 10.7027 15.8179 10.7027" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.50005 11.3932C4.50001 13.1319 4.49995 16.764 4.50007 19.1988C4.5002 21.8911 8.66375 22.5 12.0001 22.5C15.3364 22.5 19.5 21.8911 19.5 19.1988L19.5 11.3932C19.5 10.8409 19.0523 10.3957 18.5 10.3957H5.50004C4.94777 10.3957 4.50006 10.8409 4.50005 11.3932ZM10.5 16.0028C10.5 16.4788 10.7069 16.9065 11.0357 17.2008V18.7529C11.0357 19.3051 11.4834 19.7529 12.0357 19.7529H12.1786C12.7309 19.7529 13.1786 19.3051 13.1786 18.7529V17.2008C13.5074 16.9065 13.7143 16.4788 13.7143 16.0028C13.7143 15.1152 12.9948 14.3957 12.1072 14.3957C11.2195 14.3957 10.5 15.1152 10.5 16.0028Z" fill="var(--white)"></path>
                </g>
              </svg>
              Alterar Senha
            </button>
            <button className="button menu" type="button"
              style={{ background: content == 'settings' ? 'var(--bg-gradient-2)' : '' }}
              onClick={() => setContent("settings")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="6.5" fill="none" stroke="var(--white)" strokeWidth="3" />
                <path
                  fill="none"
                  stroke="var(--white)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M30.8,35.7c1.2-0.7,2.8-0.8,4.1-0.2l2.7,1.2c1.9-2,3.4-4.5,4.2-7.3l-2.4-1.7c-1.2-0.8-1.8-2.2-1.8-3.6 s0.7-2.8,1.8-3.6l2.4-1.7c-0.8-2.8-2.3-5.2-4.2-7.3l-2.7,1.2c-1.3,0.6-2.8,0.5-4.1-0.2s-2.1-2-2.2-3.4L28.2,6 c-1.4-0.3-2.8-0.5-4.2-0.5S21.1,5.7,19.8,6"
                />
                <path
                  fill="none"
                  stroke="var(--white)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M17.3,12.3c-1.2,0.7-2.8,0.8-4.1,0.2l-2.7-1.2c-1.9,2-3.4,4.5-4.2,7.3l2.4,1.7c1.2,0.8,1.8,2.2,1.8,3.6s-0.7,2.8-1.8,3.6l-2.4,1.7c0.8,2.8,2.3,5.2,4.2,7.3l2.7-1.2c1.3-0.6,2.8-0.5,4.1,0.2s2.1,2,2.2,3.4l0.3,2.9 c1.4,0.3,2.8,0.5,4.2,0.5s2.9-0.2,4.2-0.5"
                />
              </svg>
              Configurações
            </button>
          </div>
        </div>

        <div className="user-account__content bg-gray-800 br vertical-align" >
          {content === "personalData" ? <form onSubmit={handleSubmitUser(updateUser)}>
            <header className="p4 horizontal-align gap2">
              <svg viewBox="0 0 24 24" fill=" var(--main-800)" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="vertical-align gap1">
                <h1 className="page-title">Dados Pessoais</h1>
                <h2 className="page-subtitle">Atualize as suas informações pessoais</h2>
              </div>
            </header>
            <div className="vertical-align gap4 p4 ai-end w100">
              <div className="horizontal-align gap4 w100">
                <div className="item-form">
                  <label className="label" htmlFor="name">Nome</label>
                  <input className="input" type="text" id="name" placeholder="Kauan Rodrigues"
                    {...registerUser("nome")}
                  />
                </div>
                <div className="item-form">
                  <label className="label" htmlFor="email">Email</label>
                  <input className="input" type="email" id="email" placeholder="seuemail@email.com"
                    {...registerUser("email")}
                  />
                </div>
              </div>

              <div className="horizontal-align gap4 w100">
                <div className="item-form">
                  <label className="label" htmlFor="phonenumber">Número de telefone</label>
                  <input className="input" type="number" id="phonenumber" placeholder="Ex.: (11) 91234-5678"
                    {...registerUser("numerocontato")}
                  />
                </div>
                <div className="item-form">
                  <label className="label" htmlFor="datebirth">Data de nascimento</label>
                  <input className="input" type="date" id="datebirth" placeholder="DD/MM/AAAA"
                    {...registerUser("datadenascimento")}
                  />
                </div>
              </div>
              <button className="button" type="submit">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17 21.0002L7 21M17 21.0002L17.8031 21C18.921 21 19.48 21 19.9074 20.7822C20.2837 20.5905 20.5905 20.2843 20.7822 19.908C21 19.4806 21 18.921 21 17.8031V9.21955C21 8.77072 21 8.54521 20.9521 8.33105C20.9095 8.14 20.8393 7.95652 20.7432 7.78595C20.6366 7.59674 20.487 7.43055 20.1929 7.10378L17.4377 4.04241C17.0969 3.66374 16.9242 3.47181 16.7168 3.33398C16.5303 3.21 16.3242 3.11858 16.1073 3.06287C15.8625 3 15.5998 3 15.075 3H6.2002C5.08009 3 4.51962 3 4.0918 3.21799C3.71547 3.40973 3.40973 3.71547 3.21799 4.0918C3 4.51962 3 5.08009 3 6.2002V17.8002C3 18.9203 3 19.4796 3.21799 19.9074C3.40973 20.2837 3.71547 20.5905 4.0918 20.7822C4.5192 21 5.07899 21 6.19691 21H7M17 21.0002V17.1969C17 16.079 17 15.5192 16.7822 15.0918C16.5905 14.7155 16.2837 14.4097 15.9074 14.218C15.4796 14 14.9203 14 13.8002 14H10.2002C9.08009 14 8.51962 14 8.0918 14.218C7.71547 14.4097 7.40973 14.7155 7.21799 15.0918C7 15.5196 7 16.0801 7 17.2002V21M15 7H9"
                    stroke="var(--white)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Salvar Alterações
              </button>
            </div>
          </form> : content === "updatePass" ?
            <form onSubmit={handleSubmitPass(updatePass)}>
              <header className="p4 horizontal-align gap2">
                <svg className="container-conteudo-usuario__principal-header-icone" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 6C20 6 19.1843 6 19.0001 6C16.2681 6 13.8871 4.93485 11.9999 3C10.1128 4.93478 7.73199 6 5.00009 6C4.81589 6 4.00009 6 4.00009 6C4.00009 6 4 8 4 9.16611C4 14.8596 7.3994 19.6436 12 21C16.6006 19.6436 20 14.8596 20 9.16611C20 8 20 6 20 6Z"
                    stroke="var(--main-800)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="vertical-align gap1">
                  <h1 className="page-title">Alterar Senha</h1>
                  <h2 className="page-subtitle">Mantenha a sua conta segura com uma senha forte</h2>
                </div>
              </header>
              <div className="vertical-align gap4 p4 ai-end w100">

                <div className="item-form">
                  <label className="label" htmlFor="currentpass">Senha atual</label>
                  <input className="input" type="password" id="currentpass" placeholder="*************"
                    {...registerPass("senhaAntiga")}
                  />
                </div>

                <div className="horizontal-align gap4 w100">
                  <div className="item-form">
                    <label className="label" htmlFor="newpass">Nova senha</label>
                    <input className="input" type="password" id="newpass" placeholder="Digite a nova senha"
                      {...registerPass("senhaNova")}
                    />
                  </div>
                  <div className="item-form vertical-align">
                    <label className="label" htmlFor="repeatnewpaass">Repita a nova senha</label>
                    <input className="input" type="password" id="repeatnewpaass" placeholder="Repita a nova senha"
                      {...registerPass("senhaNovaRepetida")}
                    />
                    {errorsPass.senhaNovaRepetida && <span className="span-message error">{errorsPass.senhaNovaRepetida?.message}</span>}
                  </div>
                </div>
                <Link className="link" to="/send-token-password">Esqueceu a senha?</Link>
                <div className="w100"><PasswordCriteria value={watch("senhaNova")} /></div>
                <button className="button" type="submit">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20 6C20 6 19.1843 6 19.0001 6C16.2681 6 13.8871 4.93485 11.9999 3C10.1128 4.93478 7.73199 6 5.00009 6C4.81589 6 4.00009 6 4.00009 6C4.00009 6 4 8 4 9.16611C4 14.8596 7.3994 19.6436 12 21C16.6006 19.6436 20 14.8596 20 9.16611C20 8 20 6 20 6Z"
                      stroke="var(--white)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  Alterar senha
                </button>
              </div>
            </form>
            : content === "settings" ?
              <>
                <header className="p4 horizontal-align gap2">
                  <svg className="container-conteudo-usuario__principal-header-icone" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.00195 17H5.60636C4.34793 17 3.71872 17 3.58633 16.9023C3.4376 16.7925 3.40126 16.7277 3.38515 16.5436C3.37082 16.3797 3.75646 15.7486 4.52776 14.4866C5.32411 13.1835 6.00031 11.2862 6.00031 8.6C6.00031 7.11479 6.63245 5.69041 7.75766 4.6402C8.88288 3.59 10.409 3 12.0003 3C13.5916 3 15.1177 3.59 16.2429 4.6402C17.3682 5.69041 18.0003 7.11479 18.0003 8.6C18.0003 11.2862 18.6765 13.1835 19.4729 14.4866C20.2441 15.7486 20.6298 16.3797 20.6155 16.5436C20.5994 16.7277 20.563 16.7925 20.4143 16.9023C20.2819 17 19.6527 17 18.3943 17H15.0003M9.00195 17L9.00031 18C9.00031 19.6569 10.3435 21 12.0003 21C13.6572 21 15.0003 19.6569 15.0003 18V17M9.00195 17H15.0003"
                      stroke="var(--main-800)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="vertical-align gap1">
                    <h1 className="page-title">Notificações</h1>
                    <h2 className="page-subtitle">Configure como você deseja receber notificações</h2>
                  </div>
                </header>
                <div className="vertical-align gap4 p4 ai-end w100">

                  <div className="delete-account">
                    <header className="delete-account__header horizontal-align gap2">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 7V13"
                          stroke="var(--red-900)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <circle cx="12" cy="16" r="1" fill="var(--red-900)" />
                        <path
                          d="M9.21603 3C10.3958 2.33333 11.1703 2 12 2C13.1138 2 14.1282 2.6007 16.1569 3.80211L16.8431 4.20846C18.8718 5.40987 19.8862 6.01057 20.4431 7C21 7.98943 21 9.19084 21 11.5937V12.4063C21 14.8092 21 16.0106 20.4431 17C19.8862 17.9894 18.8718 18.5901 16.8431 19.7915L16.1569 20.1979C14.1282 21.3993 13.1138 22 12 22C10.8862 22 9.8718 21.3993 7.84308 20.1979L7.15692 19.7915C5.1282 18.5901 4.11384 17.9894 3.55692 17C3 16.0106 3 14.8092 3 12.4063V11.5937C3 9.19084 3 7.98943 3.55692 7C3.99599 6.21995 4.71938 5.68151 6 4.89984"
                          stroke="var(--red-900)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>

                      <div className="vertical-align gap1">
                        <h2 className="delete-account__title">Zona de perigo</h2>
                        <span className="delete-account__subtitle">Ações irreversíveis que afetam a sua conta</span>
                      </div>
                    </header>
                    <div className="p4">
                      <div className="delete-account__content p4 br vertical-align ai-start gap1">
                        <h2 className="delete-account__title">Excluir conta</h2>
                        <span className="delete-account__subtitle">Essa ação é permanente e não pode ser desfeita. Todos os seus dados serão perdidos.</span>
                        <button className="button bg-gradient-red">


                          Excluir conta</button>
                      </div>
                    </div>
                  </div>

                  {/* <button className="button" type="button">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M17 21.0002L7 21M17 21.0002L17.8031 21C18.921 21 19.48 21 19.9074 20.7822C20.2837 20.5905 20.5905 20.2843 20.7822 19.908C21 19.4806 21 18.921 21 17.8031V9.21955C21 8.77072 21 8.54521 20.9521 8.33105C20.9095 8.14 20.8393 7.95652 20.7432 7.78595C20.6366 7.59674 20.487 7.43055 20.1929 7.10378L17.4377 4.04241C17.0969 3.66374 16.9242 3.47181 16.7168 3.33398C16.5303 3.21 16.3242 3.11858 16.1073 3.06287C15.8625 3 15.5998 3 15.075 3H6.2002C5.08009 3 4.51962 3 4.0918 3.21799C3.71547 3.40973 3.40973 3.71547 3.21799 4.0918C3 4.51962 3 5.08009 3 6.2002V17.8002C3 18.9203 3 19.4796 3.21799 19.9074C3.40973 20.2837 3.71547 20.5905 4.0918 20.7822C4.5192 21 5.07899 21 6.19691 21H7M17 21.0002V17.1969C17 16.079 17 15.5192 16.7822 15.0918C16.5905 14.7155 16.2837 14.4097 15.9074 14.218C15.4796 14 14.9203 14 13.8002 14H10.2002C9.08009 14 8.51962 14 8.0918 14.218C7.71547 14.4097 7.40973 14.7155 7.21799 15.0918C7 15.5196 7 16.0801 7 17.2002V21M15 7H9"
                        stroke="var(--white)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    Salvar Alterações
                  </button> */}
                </div>
              </>
              : ''}
        </div>
      </section>
      <Alert />
      <Footer />
    </main>
  );
}

