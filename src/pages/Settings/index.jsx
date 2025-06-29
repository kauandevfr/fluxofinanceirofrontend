import React, { useState, useEffect } from "react";
import './style.scss';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CardCategory from "../../components/CardCategory";
import ListSettings from "../../components/ListSettings";
import { useGlobalContext } from "../../providers/globalContext"
import { Link } from "react-router-dom";

export default function Settings() {
  const [content, setContent] = useState('categories')

  const { currentMonthYear } = useGlobalContext()

  const { mes, ano } = currentMonthYear()

  // const configs = {
  //   categories: {
  //     titulo: "Categorias",
  //     getSubtitle: '(itens) => `${itens.length} categorias cadastradas`',
  //     items: 'categories',
  //     onAdd: '() => setModalCP({ modal: true, tipo: "Adicionar", item: "categoria", valor: {} })',
  //     onEdit: '(el) => setModalCP({ modal: true, tipo: "Atualizar", item: "categoria", valor: el })',
  //     onDelete: '(id) => setModalDelete({ modal: true, tag: "categoria", id })',
  //   },
  //   paymentForms: {
  //     titulo: "Formas de pagamento",
  //     getSubtitle: '(itens) => `${itens.length} formas de pagamento cadastradas`',
  //     items: 'paymentForms',
  //     onAdd: '() => setModalCP({ modal: true, tipo: "Adicionar", item: "forma de pagamento", valor: {} })',
  //     onEdit: '(el) => setModalCP({ modal: true, tipo: "Atualizar", item: "forma de pagamento", valor: el })',
  //     onDelete: '(id) => setModalDelete({ modal: true, tag: "categoria", id })',
  //   },
  //   banks: {
  //     titulo: "Bancos",
  //     getSubtitle: '(itens) => `${itens.length} bancos cadastrados`',
  //     items: 'banks',
  //     onAdd: '() => setModalBank({ modal: true, item: {} })',
  //     onEdit: '(el) => setModalBank({ modal: true, item: el })',
  //     onDelete: '(id) => setModalDelete({ modal: true, tag: "instituicaofinanceira", id })',
  //   }
  // };

  useEffect(() => {
    document.title = "Configurações | Fluxo Financeiro";
  }, [])
  return (
    <main className="min-h-100vh vertical-align">
      <Header tag="settings" />
      <div className='p4-0 w83 m0auto vertical-align gap4 jc-between'>
        <section className="settings vertical-align bg-gray-800 br">
          <div className="settings__menu horizontal-align p2 gap2 br">
            <Link className="button menu" to={`/dashboard/?mes=${mes}&ano=${ano}`}>
              <img src="https://fluxofinanceiro.site/assets/seta-esquerda.png" alt="left arrow" />
            </Link>
            <button className="button menu" type="button" onClick={() => setContent("categories")}
              style={{ background: content == 'categories' ? 'var(--bg-gradient-2)' : '' }}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.0498 7.0498H7.0598M10.5118 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V10.5118C3 11.2455 3 11.6124 3.08289 11.9577C3.15638 12.2638 3.27759 12.5564 3.44208 12.8249C3.6276 13.1276 3.88703 13.387 4.40589 13.9059L9.10589 18.6059C10.2939 19.7939 10.888 20.388 11.5729 20.6105C12.1755 20.8063 12.8245 20.8063 13.4271 20.6105C14.112 20.388 14.7061 19.7939 15.8941 18.6059L18.6059 15.8941C19.7939 14.7061 20.388 14.112 20.6105 13.4271C20.8063 12.8245 20.8063 12.1755 20.6105 11.5729C20.388 10.888 19.7939 10.2939 18.6059 9.10589L13.9059 4.40589C13.387 3.88703 13.1276 3.6276 12.8249 3.44208C12.5564 3.27759 12.2638 3.15638 11.9577 3.08289C11.6124 3 11.2455 3 10.5118 3ZM7.5498 7.0498C7.5498 7.32595 7.32595 7.5498 7.0498 7.5498C6.77366 7.5498 6.5498 7.32595 6.5498 7.0498C6.5498 6.77366 6.77366 6.5498 7.0498 6.5498C7.32595 6.5498 7.5498 6.77366 7.5498 7.0498Z"
                  stroke="var(--white)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Categorias
            </button>
            <button className="button menu" type="button" onClick={() => setContent("paymentForms")}
              style={{ background: content == 'paymentForms' ? 'var(--bg-gradient-2)' : '' }}
            >
              <svg fill="var(--white)" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <g><g><path d="M493.714,66.178h-69.66H197.661h-69.663c-10.099,0-18.286,8.187-18.286,18.286v69.659v30.475H18.286C8.187,184.598,0,192.785,0,202.884v224.653c0,10.099,8.187,18.286,18.286,18.286H335.24c10.099,0,18.286-8.187,18.286-18.286v-63.565h70.528h69.66c10.099,0,18.286-8.186,18.286-18.286v-69.66V154.122V84.464C512,74.364,503.813,66.178,493.714,66.178z M146.285,102.75h29.729c-5.214,13.642-16.084,24.511-29.729,29.725V102.75z M316.954,409.249H36.572V294.311h280.383V409.249z M316.954,257.74H36.572v-36.571h280.383V257.74z M475.428,327.4h-29.727c5.213-13.642,16.082-24.511,29.727-29.725V327.4z M475.428,259.667c-33.843,7.186-60.548,33.891-67.735,67.734h-54.169v-71.918h0.001c14.81-9.817,23.609-24.527,23.607-40.409c0-29.475-29.112-52.564-66.276-52.564c-21.971,0-42.032,8.405-54.207,22.088H146.285v-14.114c33.844-7.186,60.55-33.891,67.737-67.734h193.672c7.188,33.842,33.892,60.545,67.735,67.734V259.667z M475.428,132.475c-13.644-5.214-24.513-16.082-29.727-29.725h29.727V132.475z" /></g></g>
                <g><g><path d="M152.383,330.883H91.429c-10.099,0-18.286,8.187-18.286,18.286c0,10.099,8.187,18.286,18.286,18.286h60.954c10.099,0,18.286-8.187,18.286-18.286C170.668,339.07,162.481,330.883,152.383,330.883z" /></g></g>
              </svg>
              Formas de pagamento</button>
            <button className="button menu" type="button" onClick={() => setContent("banks")}
              style={{ background: content == 'banks' ? 'var(--bg-gradient-2)' : '' }}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                <path d="M18 21V22C18.5523 22 19 21.5523 19 21H18ZM6 21H5C5 21.5523 5.44772 22 6 22V21ZM17.454 3.10899L17 4L17.454 3.10899ZM17.891 3.54601L17 4L17.891 3.54601ZM6.54601 3.10899L7 4L6.54601 3.10899ZM6.10899 3.54601L7 4L6.10899 3.54601ZM9 6C8.44772 6 8 6.44772 8 7C8 7.55228 8.44772 8 9 8V6ZM10 8C10.5523 8 11 7.55228 11 7C11 6.44772 10.5523 6 10 6V8ZM9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11V9ZM10 11C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9V11ZM14 9C13.4477 9 13 9.44772 13 10C13 10.5523 13.4477 11 14 11V9ZM15 11C15.5523 11 16 10.5523 16 10C16 9.44772 15.5523 9 15 9V11ZM14 12C13.4477 12 13 12.4477 13 13C13 13.5523 13.4477 14 14 14V12ZM15 14C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12V14ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14V12ZM10 14C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12V14ZM14 6C13.4477 6 13 6.44772 13 7C13 7.55228 13.4477 8 14 8V6ZM15 8C15.5523 8 16 7.55228 16 7C16 6.44772 15.5523 6 15 6V8ZM7.6 4H16.4V2H7.6V4ZM17 4.6V21H19V4.6H17ZM18 20H6V22H18V20ZM7 21V4.6H5V21H7ZM16.4 4C16.6965 4 16.8588 4.00078 16.9754 4.0103C17.0803 4.01887 17.0575 4.0293 17 4L17.908 2.21799C17.6366 2.07969 17.3668 2.03562 17.1382 2.01695C16.9213 1.99922 16.6635 2 16.4 2V4ZM19 4.6C19 4.33647 19.0008 4.07869 18.9831 3.86177C18.9644 3.63318 18.9203 3.36344 18.782 3.09202L17 4C16.9707 3.94249 16.9811 3.91972 16.9897 4.02463C16.9992 4.14122 17 4.30347 17 4.6H19ZM17 4L18.782 3.09202C18.5903 2.7157 18.2843 2.40973 17.908 2.21799L17 4ZM7.6 2C7.33647 2 7.07869 1.99922 6.86177 2.01695C6.63318 2.03562 6.36344 2.07969 6.09202 2.21799L7 4C6.94249 4.0293 6.91972 4.01887 7.02463 4.0103C7.14122 4.00078 7.30347 4 7.6 4V2ZM7 4.6C7 4.30347 7.00078 4.14122 7.0103 4.02463C7.01887 3.91972 7.0293 3.94249 7 4L5.21799 3.09202C5.07969 3.36344 5.03562 3.63318 5.01695 3.86177C4.99922 4.07869 5 4.33647 5 4.6H7ZM6.09202 2.21799C5.71569 2.40973 5.40973 2.71569 5.21799 3.09202L7 4L6.09202 2.21799ZM9 8H10V6H9V8ZM9 11H10V9H9V11ZM14 11H15V9H14V11ZM14 14H15V12H14V14ZM9 14H10V12H9V14ZM14 8H15V6H14V8ZM13 18V21H15V18H13ZM11 21V18H9V21H11ZM12 17C12.5523 17 13 17.4477 13 18H15C15 16.3431 13.6569 15 12 15V17ZM12 15C10.3431 15 9 16.3431 9 18H11C11 17.4477 11.4477 17 12 17V15Z" fill="var(--white)" />

              </svg>
              Bancos
            </button>
          </div>

          {/* 
          {configs[content] ? (
            <ListSettings
              title={configs[content].title}
              subtitle={configs[content].getSubtitle(configs[content].itens.itens)}
              items={configs[content].items}
              onAdd={configs[content].onAdd}
              onEdit={configs[content].onEdit}
              onDelete={configs[content].onDelete}
            />
          ) : ''} 
           */}

        </section>
      </div>
      <Footer />
    </main>
  );
}
