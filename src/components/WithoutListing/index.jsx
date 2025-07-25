import './style.scss';

export default function WithoutListing({ tag }) {

    const configs = {
        expense: {
            title: "Você ainda não adicionou as suas despesas.",
            icon: <svg className='w5rem' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                    stroke="var(--gray-500)"
                    strokeWidth="1.5"
                />
                <path
                    d="M10 16H6"
                    stroke="var(--gray-500)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <path
                    d="M14 16H12.5"
                    stroke="var(--gray-500)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <path
                    d="M2 10L22 10"
                    stroke="var(--gray-500)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        },
        income: {
            title: "Você ainda não adicionou as suas receitas.",
            icon: <svg
                className="w5rem"
                fill="var(--gray-500)"
                viewBox="-5 0 19 19"
                xmlns="http://www.w3.org/2000/svg"  >

                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M8.699 11.907a3.005 3.005 0 0 1-1.503 2.578 4.903 4.903 0 0 1-1.651.663V16.3a1.03 1.03 0 1 1-2.059 0v-1.141l-.063-.011a5.199 5.199 0 0 1-1.064-.325 3.414 3.414 0 0 1-1.311-.962 1.029 1.029 0 1 1 1.556-1.347 1.39 1.39 0 0 0 .52.397l.002.001a3.367 3.367 0 0 0 .648.208h.002a4.964 4.964 0 0 0 .695.084 3.132 3.132 0 0 0 1.605-.445c.5-.325.564-.625.564-.851a1.005 1.005 0 0 0-.245-.65 2.06 2.06 0 0 0-.55-.44 2.705 2.705 0 0 0-.664-.24 3.107 3.107 0 0 0-.65-.066 6.046 6.046 0 0 1-1.008-.08 4.578 4.578 0 0 1-1.287-.415A3.708 3.708 0 0 1 1.02 9.04a3.115 3.115 0 0 1-.718-1.954 2.965 2.965 0 0 1 .321-1.333 3.407 3.407 0 0 1 1.253-1.335 4.872 4.872 0 0 1 1.611-.631V2.674a1.03 1.03 0 1 1 2.059 0v1.144l.063.014h.002a5.464 5.464 0 0 1 1.075.368 3.963 3.963 0 0 1 1.157.795A1.03 1.03 0 0 1 6.39 6.453a1.901 1.901 0 0 0-.549-.376 3.516 3.516 0 0 0-.669-.234l-.066-.014a3.183 3.183 0 0 0-.558-.093 3.062 3.062 0 0 0-1.572.422 1.102 1.102 0 0 0-.615.928 1.086 1.086 0 0 0 .256.654l.002.003a1.679 1.679 0 0 0 .537.43l.002.002a2.57 2.57 0 0 0 .703.225h.002a4.012 4.012 0 0 0 .668.053 5.165 5.165 0 0 1 1.087.112l.003.001a4.804 4.804 0 0 1 1.182.428l.004.002a4.115 4.115 0 0 1 1.138.906l.002.002a3.05 3.05 0 0 1 .753 2.003z" />
                </g>
            </svg>
        },
        categorie: {
            title: "Você ainda não registrou despesas em nenhuma categoria.",
            icon: <svg className="w5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M7.0498 7.0498H7.0598M10.5118 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V10.5118C3 11.2455 3 11.6124 3.08289 11.9577C3.15638 12.2638 3.27759 12.5564 3.44208 12.8249C3.6276 13.1276 3.88703 13.387 4.40589 13.9059L9.10589 18.6059C10.2939 19.7939 10.888 20.388 11.5729 20.6105C12.1755 20.8063 12.8245 20.8063 13.4271 20.6105C14.112 20.388 14.7061 19.7939 15.8941 18.6059L18.6059 15.8941C19.7939 14.7061 20.388 14.112 20.6105 13.4271C20.8063 12.8245 20.8063 12.1755 20.6105 11.5729C20.388 10.888 19.7939 10.2939 18.6059 9.10589L13.9059 4.40589C13.387 3.88703 13.1276 3.6276 12.8249 3.44208C12.5564 3.27759 12.2638 3.15638 11.9577 3.08289C11.6124 3 11.2455 3 10.5118 3ZM7.5498 7.0498C7.5498 7.32595 7.32595 7.5498 7.0498 7.5498C6.77366 7.5498 6.5498 7.32595 6.5498 7.0498C6.5498 6.77366 6.77366 6.5498 7.0498 6.5498C7.32595 6.5498 7.5498 6.77366 7.5498 7.0498Z"
                    stroke="var(--gray-500)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        },
        paymentform: {
            title: "Adicione despesas para ver os métodos de pagamento utilizados.",
            icon: <svg className="w5rem" fill="var(--gray-500)" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <g><g><path d="M493.714,66.178h-69.66H197.661h-69.663c-10.099,0-18.286,8.187-18.286,18.286v69.659v30.475H18.286C8.187,184.598,0,192.785,0,202.884v224.653c0,10.099,8.187,18.286,18.286,18.286H335.24c10.099,0,18.286-8.187,18.286-18.286v-63.565h70.528h69.66c10.099,0,18.286-8.186,18.286-18.286v-69.66V154.122V84.464C512,74.364,503.813,66.178,493.714,66.178z M146.285,102.75h29.729c-5.214,13.642-16.084,24.511-29.729,29.725V102.75z M316.954,409.249H36.572V294.311h280.383V409.249z M316.954,257.74H36.572v-36.571h280.383V257.74z M475.428,327.4h-29.727c5.213-13.642,16.082-24.511,29.727-29.725V327.4z M475.428,259.667c-33.843,7.186-60.548,33.891-67.735,67.734h-54.169v-71.918h0.001c14.81-9.817,23.609-24.527,23.607-40.409c0-29.475-29.112-52.564-66.276-52.564c-21.971,0-42.032,8.405-54.207,22.088H146.285v-14.114c33.844-7.186,60.55-33.891,67.737-67.734h193.672c7.188,33.842,33.892,60.545,67.735,67.734V259.667z M475.428,132.475c-13.644-5.214-24.513-16.082-29.727-29.725h29.727V132.475z" /></g></g>
                <g><g><path d="M152.383,330.883H91.429c-10.099,0-18.286,8.187-18.286,18.286c0,10.099,8.187,18.286,18.286,18.286h60.954c10.099,0,18.286-8.187,18.286-18.286C170.668,339.07,162.481,330.883,152.383,330.883z" /></g></g>
            </svg>
        },
        status: {
            title: "Os status de suas despesas aparecerão aqui quando você adicioná-las.",
            icon: <svg className="w5rem" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" fill="var(--gray-500)">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6A6 6 0 110 6a6 6 0 0112 0zM5 3a1 1 0 012 0v3a1 1 0 01-2 0V3zm1 5a1 1 0 100 2 1 1 0 000-2z" fill="var(--gray-500)"></path>
                </g>
            </svg>
        },
        overdue: {
            title: "Os vencimentos das suas despesas serão listados aqui quando você adicioná-las.",
            icon: <svg
                className="w5rem"
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="var(--gray-500)"
            >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g fill="var(--gray-500)" fillRule="nonzero">
                            <path d="M17.5,12 C20.5376,12 23,14.4624 23,17.5 C23,20.5376 20.5376,23 17.5,23 C14.4624,23 12,20.5376 12,17.5 C12,14.4624 14.4624,12 17.5,12 Z M17.5,19.875 C17.1548,19.875 16.875,20.1548 16.875,20.5 C16.875,20.8452 17.1548,21.125 17.5,21.125 C17.8452,21.125 18.125,20.8452 18.125,20.5 C18.125,20.1548 17.8452,19.875 17.5,19.875 Z M17.75,3 C19.5449,3 21,4.45507 21,6.25 L21,12.0218 C20.5368,11.7253 20.0335,11.4858 19.5,11.3135 L19.5,8.5 L4.5,8.5 L4.5,17.75 C4.5,18.7165 5.2835,19.5 6.25,19.5 L11.3135,19.5 C11.4858,20.0335 11.7253,20.5368 12.0218,21 L6.25,21 C4.45507,21 3,19.5449 3,17.75 L3,6.25 C3,4.45507 4.45507,3 6.25,3 L17.75,3 Z M17.5,14 C17.2239,14 17,14.2239 17,14.5 L17,18.5 C17,18.7761 17.2239,19 17.5,19 C17.7761,19 18,18.7761 18,18.5 L18,14.5 C18,14.2239 17.7761,14 17.5,14 Z M17.75,4.5 L6.25,4.5 C5.2835,4.5 4.5,5.2835 4.5,6.25 L4.5,7 L19.5,7 L19.5,6.25 C19.5,5.2835 18.7165,4.5 17.75,4.5 Z" />
                        </g>
                    </g>
                </g>
            </svg>

        }
    }

    const fallback = {
        title: "Nenhum item para listar no momento.",
        icon: <svg
            className="w5rem"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--gray-500)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
            <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
    }

    return (
        <div class="no-items br p4 center-align bg-gray-700">
            {(configs[tag]?.icon || fallback.icon)}
            <span className="text-2xl text-gray-500 text-center"> {configs[tag]?.title || fallback.title}</span>
        </div>
    );
}