import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Para conseguir o __dirname no ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentes = [
    'Alert',
    'CardCategory',
    'CheckboxC',
    'Container',
    'PasswordCriteria',
    'Skeleton',
    'FabC',
    'Footer',
    'Header',
    'CurrencyLoader',
    'ModalAddEm',
    'ModalBase',
    'ModalPaymentCategory',
    'ModalExpense',               // antes era ModalBilling
    'ModalDelete',
    'ModalExport',
    'ModalFilters',
    'ModalFinancialInstitution',
    'ModalFirstAccess',
    'ModalIncome',
    'WithoutListing',
    'TooltipC',
    'ViewExpense'                 // antes era ViewBilling
];

for (const nome of componentes) {
    const pasta = path.join(__dirname, nome);
    if (!fs.existsSync(pasta)) {
        fs.mkdirSync(pasta);
    }

    // Cria style.scss vazio
    fs.writeFileSync(path.join(pasta, 'style.scss'), '');

    // Cria index.jsx
    const conteudo = `
import './style.scss';

export default function ${nome}() {
    return (
        <>
        </>
    );
}
  `.trim();

    fs.writeFileSync(path.join(pasta, 'index.jsx'), conteudo);

    console.log(`Componente ${nome} criado!`);
}

console.log('Todos os componentes criados!');
