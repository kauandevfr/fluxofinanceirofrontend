import './style.scss';

export default function Header({ tag }) {
    const data = [
        {
            tag: 'user-accont',
            title: 'Meu Perfil',
            subtitle: 'Gerencie seus dados pessoais e configurações',
            icon: <img className="header__icon" src="https://www.fluxofinanceiro.site/assets/usuario.png" alt="Ícone de usuário" />
        },
        {
            tag: 'dashboard',
            title: 'Painel Principal',
            subtitle: 'Visualize e gerencie suas finanças com clareza',
            icon: <img className="header__icon" src="https://www.fluxofinanceiro.site/assets/painel.png" alt="Ícone de painel" />
        },
        {
            tag: 'incomes',
            title: 'Receitas',
            subtitle: 'Aqui estão listadas todas as suas entradas financeiras.',
            icon: <img className="header__icon" src="https://www.fluxofinanceiro.site/assets/receitas.png" alt="Ícone de receitas" />
        },
        {
            tag: 'expenses',
            title: 'Despesas',
            subtitle: 'Aqui estão listadas todas as suas saídas financeiras.',
            icon: <img className="header__icon" src="https://www.fluxofinanceiro.site/assets/despesa.png" alt="Ícone de receitas" />
        },
        {
            tag: 'settings',
            title: 'Configurações financeiras',
            subtitle: 'Gerencie suas categorias, formas de pagamento e bancos.',
            icon: <img className="header__icon" src="https://www.fluxofinanceiro.site/assets/configuracoes.png" alt="Ícone de configurações" />
        }
    ];

    const header = data.find(d => d.tag === tag) || {
        titulo: 'Página',
        subtitulo: '',
        icon: <></>
    };
    return (
        <header className="header">
            <div className="w83 m0auto horizontal-align gap2">
                {header.icon}
                <div className="vertical-align gap1 jc-center">
                    <h3 className="page-title">{header.title}</h3>
                    <span className="page-subtitle">{header.subtitle}</span>
                </div>
            </div>
        </header>
    );
}