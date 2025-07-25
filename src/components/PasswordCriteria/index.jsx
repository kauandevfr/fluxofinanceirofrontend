import './style.scss';

export default function PasswordCriteria({ value }) {
    const pass = value ? value : ""
    return (
        <ul className='container-pass-criteria vertical-align br p1'>
            <span className="container-pass-criteria__title">Requisitos de senha: </span>
            <li><span className={`span-message  ${pass.length > 7 && "success"}`}>Contém no mínimo 8 caracteres</span></li>
            <li><span className={`span-message  ${/[0-9]/.test(pass) && "success"}`}>Contém 1 número</span></li>
            <li><span className={`span-message  ${/[A-Z]/.test(pass) && "success"}`}>Contém 1 letra maiúscula</span></li>
            <li><span className={`span-message  ${/[a-z]/.test(pass) && "success"}`}>Contém 1 letra minúscula</span></li>
            <li><span className={`span-message  ${/[!@#$%^&*(),.?":{}|<>]/.test(pass) && "success"}`}>Contém 1 caractere especial</span></li>
            <li><span className={`span-message  ${!/\s/.test(pass) && "success"}`}>Não contém espaços</span></li>
        </ul>
    );
}