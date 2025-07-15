import './style.scss';
import ModalBase from "../ModalBase"
import { useUserContext } from '../../providers/userContext';
import instance from '../../utilities/instance';

export default function ModalFirstAccess() {

    const { user, listUser, setUser, setInitTutorial } = useUserContext()

    const closeModal = async () => {
        console.log("função de fechar o modal de primeiro acesso")

        await instance.put('/usuario', { primeiroacesso: 0 })
        listUser()

    }

    const showTutorial = (e) => {
        e.preventDefault()

        setInitTutorial(true)

        closeModal()

        setUser(prev => ({
            ...prev,
            data: { ...prev.data, primeiroacesso: 0 }
        }))
    }

    return (
        <ModalBase
            isOpen={user.data.primeiroacesso === 1}
            header={{
                icon: <img className='form-icon bg-main-800' src="https://fluxofinanceiro.site/assets/sucesso.png" alt="new acess icon" />,
                title: `Bem vindo (a), ${user.data.nome.split(" ")[0]}!`
            }}
            onClose={closeModal}
            onSubmit={(e) => showTutorial(e)}
        >
            <h1 className="form-title text-center">Descubra o que separamos pra você:</h1>
            <span className="span-message text-center">Pensamos em cada detalhe para proporcionar a você a melhor experiência. Confira alguns dos recursos que separamos:</span>

            <div className="features-modal vertical-align gap2 ai-start">

                <div className="features-modal__feature horizontal-align ai-center p1 gap2">
                    <img className=' p1 br bg-gradient-2' src="https://fluxofinanceiro.site/assets/cerebro.png" alt="new acess icon" />
                    <div className="vertical-align ai-start">
                        <h4 className="text-3xl text-white fontw-600">Resumo inteligente</h4>
                        <span className="text-2xl text-gray-500">Tudo o que importa em um só lugar.</span>
                    </div>
                </div>
                <div className="features-modal__feature horizontal-align ai-center p1 gap2">
                    <img className=' p1 br bg-gradient-2' src="https://fluxofinanceiro.site/assets/lampada.png" alt="new acess icon" />
                    <div className="vertical-align ai-start">
                        <h4 className="text-3xl text-white fontw-600">Interface intuitiva</h4>
                        <span className="text-2xl text-gray-500">Design pensado para facilitar sua navegação e uso diário.</span>
                    </div>
                </div>
                <div className="features-modal__feature horizontal-align ai-center p1 gap2">
                    <img className=' p1 br bg-gradient-2' src="https://fluxofinanceiro.site/assets/balanca.png" alt="new acess icon" />
                    <div className="vertical-align ai-start">
                        <h4 className="text-3xl text-white fontw-600">Saldo em Tempo Real</h4>
                        <span className="text-2xl text-gray-500">Veja quanto você tem agora.</span>
                    </div>
                </div>
            </div>

            <button className="button bg-main-800 pulse" type="submit">Vamos começar!</button>
            <span className="text-center text-xl fontw-600 text-gray-500">Essa mensagem só aparece no seu primeiro acesso.</span>
        </ModalBase>
    );
}