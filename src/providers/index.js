import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Para conseguir o __dirname no ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lista dos contextos com nomes dos arquivos e os nomes das variáveis em PascalCase
const contexts = [
    { fileName: 'expenseContext', varName: 'ExpenseContext' },
    { fileName: 'globalContext', varName: 'GlobalContext' },
    { fileName: 'incomeContext', varName: 'IncomeContext' },
    { fileName: 'userContext', varName: 'UserContext' }
];

const generateContent = (varName) => `
import React, { createContext, useContext, useState } from "react";
import instance from "../utilities/instance";

const ${varName} = createContext();

export const use${varName} = () => {
    return useContext(${varName});
};

export const ${varName}Provider = ({ children }) => {

    return (
        <${varName}.Provider value={{}}>
            {children}
        </${varName}.Provider>
    );
};
`.trim();

contexts.forEach(({ fileName, varName }) => {
    const filePath = path.join(__dirname, `${fileName}.jsx`);
    const content = generateContent(varName);

    fs.writeFileSync(filePath, content);
    console.log(`Arquivo ${fileName}.jsx criado!`);
});

console.log('Todos os contextos criados!');
