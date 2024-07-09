/* 
    responsável pelas operações de banco do cliente utilizando PostgreSQL
*/
const { Pool } = require('pg');
const dbConfig = require('../db/db.config.js');

const pool = new Pool(dbConfig.postgresql);

const saveClient = async (clientData) => {
    const query = `
        INSERT INTO clients (cpf, nome_completo, data_nascimento, valor_divida, data_vencimento_divida, possui_acordo)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const values = [
        clientData.CPF,
        clientData['Nome completo'],
        clientData['data de nascimento'],
        clientData['valor da dívida'],
        clientData['data de vencimento da dívida'],
        clientData['possui acordo']
    ];
    const res = await pool.query(query, values);
    return res.rows[0];
};

module.exports = {
    saveClient,
};
