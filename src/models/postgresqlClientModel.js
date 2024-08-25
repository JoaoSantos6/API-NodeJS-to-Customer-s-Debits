/* 
    responsável pelas operações de banco do cliente utilizando PostgreSQL
*/
const { Pool } = require('pg');
const dbConfig = require('../db/db.config.js');

const pool = new Pool(dbConfig.postgresql);

const DBCostumerInit = async () => {
    const client = await pool.connect(); // Conecta ao pool

    try {
        await client.query('BEGIN'); // Inicia a transação

        // Verifica se a tabela já existe antes de tentar criá-la
        const tableExists = await client.query(
            `SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'costumers'
            );`
        );

        if (!tableExists.rows[0].exists) {
            await client.query(`
                CREATE TABLE costumers (
                    id SERIAL PRIMARY KEY,
                    cpf VARCHAR(11) UNIQUE,
                    nome_completo VARCHAR(255) NOT NULL,
                    data_nascimento DATE NOT NULL,
                    valor_divida DECIMAL(15, 2) NOT NULL,
                    data_vencimento_divida DATE NOT NULL,
                    possui_acordo BOOLEAN NOT NULL
                );
            `);
            await client.query('COMMIT'); // Comita a transação
            return { status: 'created', message: 'Tabela criada com sucesso' };
        } else {
            return { status: 'exists', message: 'Tabela já existe' };
        }
    } catch (e) {
        await client.query('ROLLBACK'); // Reverte a transação em caso de erro
        console.error('Erro ao criar a tabela:', e);
        return { status: 'error', message: 'Erro ao criar a tabela' };
    } finally {
        client.release(); // Libera o cliente de volta ao pool
    }
};


const saveClient = async (clientData) => {
    const query = `
        INSERT INTO costumers (cpf, nome_completo, data_nascimento, valor_divida, data_vencimento_divida, possui_acordo)
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
    const dumpJSON = JSON.stringify(values, null, 2); 
    console.log("Dados enviados no body: ", dumpJSON);

    const res = await pool.query(query, values);
    return res.rows[0];
};

const searchClient = async (document) => {
    
        const cpf = document;  // Obtém o CPF dos parâmetros da URL
        const query = `
            SELECT cpf, nome_completo, data_nascimento, valor_divida, data_vencimento_divida, possui_acordo 
            FROM costumers
            WHERE cpf = $1;
        `;
        const values = [cpf];
        const res = await pool.query(query, values);
        return res.rows[0];
    
};

const getOverdueDebts = async () => {
    const query = `
        SELECT cpf, nome_completo, data_nascimento, valor_divida, data_vencimento_divida, possui_acordo 
        FROM costumers
        WHERE data_vencimento_divida < CURRENT_DATE;
    `;

    const res = await pool.query(query);
    return res.rows;  // Retorna todos os clientes com dívidas vencidas
};


module.exports = {
    saveClient, 
    DBCostumerInit, 
    searchClient,
    getOverdueDebts
};
