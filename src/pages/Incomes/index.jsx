import { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { useGlobalContext } from "../../providers/globalContext";
import './style.scss';
import CardCategory from "../../components/CardCategory";
import { useIncomeContext } from "../../providers/incomeContext";
import WithoutListing from "../../components/WithoutListing";
import Skeleton from "../../components/Skeleton";
import { format } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

export default function Incomes() {

  const { currentMonthYear } = useGlobalContext()
  const { incomes } = useIncomeContext()

  const { mes, ano } = currentMonthYear()

  useEffect(() => {
    document.title = "Receitas | Fluxo Financeiro";
  }, [])

  return (
    <Container>
      <div className="horizontal-align jc-between ">
        <Link className="button" to={`/dashboard/?mes=${mes}&ano=${ano}`}>Painel</Link>
        <div className="horizontal-align gap2">
          <button className="button" type="button">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Edit / Add_Plus_Circle">
                <path
                  d="M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                  stroke="var(--white)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            Adicionar receita
          </button>
          <button className="button" type="button">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 20C7.58172 20 4 16.4183 4 12M20 12C20 14.5264 18.8289 16.7792 17 18.2454"
                stroke="var(--white)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M12 14L12 4M12 4L15 7M12 4L9 7"
                stroke="var(--white)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Exportar para PDF
          </button>
        </div>
      </div>
      <input className="input" type="text" placeholder="Pesquise por titulo" />
      <header className="list-header">
        <div className="list-cell">
          <img src="https://www.fluxofinanceiro.site/assets/ordem.png" alt="order icon"

          />
          <h1 className="list-row__title">Titulo</h1>
        </div>

        <div className="list-cell">
          <img src="https://www.fluxofinanceiro.site/assets/ordem.png" alt="order icon"

          />
          <h1 className="list-row__title">Valor</h1>
        </div>
        <div className="list-cell">
          <img src="https://www.fluxofinanceiro.site/assets/ordem.png" alt="order icon"

          />
          <h1 className="list-row__title">Inclusão</h1>
        </div>
        <div className="list-cell jc-center">
          <h1 className="list-row__title">Editar ou excluir</h1>
        </div>
      </header>
      <ul className="vertical-align gap2">
        {incomes.loading ? <Skeleton /> : incomes.items.length ?
          incomes.items.slice(0, 5).map(element => {
            return (
              <li className="list-row w100" key={element.id}>
                <div className="list-cell">
                  <h1 className="list-row__title">{element.titulo}</h1>
                </div>
                <div className="list-cell">
                  <h1 className="list-row__title">{element.precoBR}</h1>
                </div>
                <div className="list-cell">
                  <h1 className="list-row__title">{format(fromZonedTime(element.datainclusao, "America/Sao_Paulo"), "dd/MM/yyyy")}</h1>
                </div>
                <div className="list-cell gap4 jc-center">
                  <img src="https://fluxofinanceiro.site/assets/editar.png" alt="edit icon" />
                  <img src="https://fluxofinanceiro.site/assets/deletar.png" alt="delete icon" />
                </div>
              </li>
            )
          }) : <WithoutListing />}
      </ul>
    </Container>
  );
}
