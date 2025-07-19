import "./style.scss"

export default function FooterCopyright() {
    return (
        <footer className="footer-recovery-pass center-align gap1">
            <div className="horizontal-align gap1 ai-center">
                <img className="w5rem" src="https://fluxofinanceiro.site/assets/carteira.png" alt="wallet icon" />
                <h3 className="page-title">Fluxo Financeiro</h3>
            </div>
            <span className="page-subtitle"> © {new Date().getFullYear()} Fluxo Financeiro. Todos os direitos reservados.</span>
        </footer>
    )
}