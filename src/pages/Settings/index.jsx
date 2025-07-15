import React, { useState, useEffect } from "react";
import './style.scss';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ListSettings from "../../components/ListSettings";
import { useGlobalContext } from "../../providers/globalContext"
import { useExpenseContext } from "../../providers/expenseContext"
import { Link } from "react-router-dom";
import ModalDelete from "../../components/ModalDelete";
import ModalPaymentCategory from "../../components/ModalPaymentCategory";
import Alert from "../../components/Alert";

export default function Settings() {
  const [content, setContent] = useState('categories')

  const { categories, listingCategories, paymentForms, listingPaymentForms, setBankModal, setPaymentCategory } = useExpenseContext()

  const { currentMonthYear, queryParams, setDeleteModal } = useGlobalContext()

  const { mes, ano } = currentMonthYear()

  const configs = {
    categories: {
      title: "Categorias",
      getSubtitle: (items) => `${items.length} categorias cadastradas`,
      items: categories,
      onAdd: () => setPaymentCategory({ open: true, type: "Adicionar", item: {}, tag: "categoria" }),
      onEdit: (el) => setPaymentCategory({ open: true, type: "Atualizar", item: el, tag: "categoria" }),
      onDelete: (el) => setDeleteModal({ open: true, type: "categoria", item: el }),
    },
    paymentForms: {
      title: "Formas de pagamento",
      getSubtitle: (items) => `${items.length} formas de pagamento cadastradas`,
      items: paymentForms,
      onAdd: () => setPaymentCategory({ open: true, type: "Adicionar", item: {}, tag: "forma de pagamento" }),
      onEdit: (el) => setPaymentCategory({ open: true, type: "Atualizar", item: el, tag: "forma de pagamento" }),
      onDelete: (el) => setDeleteModal({ open: true, type: "forma de pagamento", item: el }),
    }
  };

  useEffect(() => {
    const { query } = queryParams()
    listingCategories()
    listingPaymentForms()

    const tag = query.get("tag")
    if (tag) setContent(tag)

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
          </div>


          {configs[content] ? (
            <ListSettings
              title={configs[content].title}
              subtitle={configs[content].getSubtitle(configs[content].items.items)}
              items={configs[content].items}
              onAdd={configs[content].onAdd}
              onEdit={configs[content].onEdit}
              onDelete={configs[content].onDelete}
            />
          ) : ''}


        </section>
      </div>
      <Footer />

      <ModalPaymentCategory />
      <ModalDelete />
      <Alert />
    </main>
  );
}
