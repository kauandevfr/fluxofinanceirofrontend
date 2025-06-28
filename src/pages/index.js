import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = [
    { original: 'Cobrancas', translated: 'Billings' },
    { original: 'EnviarTokenSenha', translated: 'SendTokenPassword' },
    { original: 'GerenciamentoBCF', translated: 'Settings' },
    { original: 'Inicial', translated: 'Home' },
    { original: 'Login', translated: 'Login' },
    { original: 'NaoEncontrada', translated: 'NotFound' },
    { original: 'Painel', translated: 'Dashboard' },
    { original: 'RecuperarSenha', translated: 'RecoverPassword' },
    { original: 'Registro', translated: 'Register' },
    { original: 'Rendas', translated: 'Incomes' },
    { original: 'Usuario', translated: 'User' },
    { original: 'VerCobranca', translated: 'ViewBilling' }
];

const template = (componentName) => `import React, { useState, useEffect } from "react";
import './style.scss';

export default function ${componentName}() {
  return (
    <>
    </>
  );
}
`;

pages.forEach(({ translated }) => {
    const folderPath = path.join(__dirname, translated);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    fs.writeFileSync(path.join(folderPath, 'style.scss'), '');
    fs.writeFileSync(path.join(folderPath, 'index.jsx'), template(translated));

});

console.log('Todas as páginas foram criadas!');
