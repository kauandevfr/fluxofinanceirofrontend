import WithoutListing from "../WithoutListing"
import Skeleton from "../Skeleton"
import CardCategory from "../CardCategory"

import "./style.scss"

export default function ListSettings({ title, subtitle, itens, onAdd, onEdit, onDelete }) {
    return (
        <div className="vertical-align p2 gap2">
            <div className="horizontal-align jc-between">
                <div className="vertical-align gap1">
                    <h1 className="page-title">{title}</h1>
                    <h2 className="page-subtitle">{subtitle}</h2>
                </div>
                <button className="button" type="text" onClick={onAdd}>
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
                    Adicionar</button>
            </div>
            <ul className="settings__listing gap2">
                {itens.carregando ? <Skeleton /> :
                    itens.itens.length ?
                        itens.itens.map((element, index) => {
                            return (
                                <li className="list-row" key={element.id}>
                                    <CardCategory color={element.cor} title={element.titulo} />
                                    <div className="horizontal-align gap2">
                                        <button type="text" onClick={onEdit}>
                                            <svg viewBox="-2 -2 24.00 24.00" xmlns="http://www.w3.org/2000/svg" fill="none"  >
                                                <g strokeWidth="0"></g>
                                                <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.12"></g>
                                                <g> <path stroke="var(--gray-600)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.8 12.963L2 18l4.8-.63L18.11 6.58a2.612 2.612 0 00-3.601-3.785L3.8 12.963z" />  </g>
                                            </svg>
                                        </button>
                                        <button type="text" onClick={onDelete}>
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="var(--gray-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                            )
                        }) : <WithoutListing />}
            </ul>
        </div>
    )
}