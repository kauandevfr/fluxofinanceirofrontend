import './style.scss';

export default function Footer() {
    return (
        <footer className="footer w100 bg-gray-900">
            <div className=" w83 m0auto horizontal-align jc-between">
                <div className="vertical-align gap1 ai-start">
                    <h3 className="page-title">Fluxo Financeiro</h3>
                    <span className="page-subtitle"> © {new Date().getFullYear()} Kauan Rodrigues. Todos os direitos reservados.</span>
                </div>
                <div className="footer__contact vertical-align gap1">
                    <div className="horizontal-align gap1">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path fillRule="evenodd" clipRule="evenodd" d="M20 4C21.6569 4 23 5.34315 23 7V17C23 18.6569 21.6569 20 20 20H4C2.34315 20 1 18.6569 1 17V7C1 5.34315 2.34315 4 4 4H20ZM19.2529 6H4.74718L11.3804 11.2367C11.7437 11.5236 12.2563 11.5236 12.6197 11.2367L19.2529 6ZM3 7.1688V17C3 17.5523 3.44772 18 4 18H20C20.5523 18 21 17.5523 21 17V7.16882L13.8589 12.8065C12.769 13.667 11.231 13.667 10.1411 12.8065L3 7.1688Z" fill="var(--main-800)"></path>
                            </g>
                        </svg>
                        <span>contato@fluxofinanceiro.site</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}