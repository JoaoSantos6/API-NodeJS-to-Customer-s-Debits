/* 
    Configurações de cada banco de dados os quais o 
    projeto poderá utilizar
*/
const dbConfig = {
    type: 'mockDB', // pode ser 'postgresql', 'mongodb', ou 'mockDB'
    postgresql: {
        user: 'your_pg_user',
        host: 'your_pg_host',
        database: 'your_pg_database',
        password: 'your_pg_password',
        port: 5432,
    },
    mongodb: {
        uri: 'mongodb://your_mongo_host:your_mongo_port/your_mongo_database',
    }
};

module.exports = dbConfig;
