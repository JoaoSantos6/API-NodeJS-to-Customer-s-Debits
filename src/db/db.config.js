/* 
    Configurações de cada banco de dados os quais o 
    projeto poderá utilizar
*/
const dbConfig = {
    type: 'postgresql', // pode ser 'postgresql', 'mongodb', ou 'mockDB'
    postgresql: {
        user: 'postgres',
        host: 'localhost',
        database: 'costumersBank',
        password: '1234',
        port: 5432,
    },
    mongodb: {
        uri: 'mongodb://your_mongo_host:your_mongo_port/your_mongo_database',
    }
};

module.exports = dbConfig;
