import './style.scss';

export default function PasswordCriteria({ value }) {
    return (
        <ul className='container-pass-criteria vertical-align br p1'>
            <span className="container-pass-criteria__title">Requisitos de senha: </span>
            <li><span className={`span-message  ${value.length > 7 && "success"}`}>Contém no mínimo 8 caracteres</span></li>
            <li><span className={`span-message  ${/[0-9]/.test(value) && "success"}`}>Contém 1 número</span></li>
            <li><span className={`span-message  ${/[A-Z]/.test(value) && "success"}`}>Contém 1 letra maiúscula</span></li>
            <li><span className={`span-message  ${/[a-z]/.test(value) && "success"}`}>Contém 1 letra minúscula</span></li>
            <li><span className={`span-message  ${/[!@#$%^&*(),.?":{}|<>]/.test(value) && "success"}`}>Contém 1 caractere especial</span></li>
            <li><span className={`span-message  ${!/\s/.test(value) && "success"}`}>Não contém espaços</span></li>
        </ul>
    );
}