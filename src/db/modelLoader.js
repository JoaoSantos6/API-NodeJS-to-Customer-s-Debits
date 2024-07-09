/* para ter uma abstração maior dentro das classes que utilizarão
banco de dados, foi criado um loader que, ao verificar o tipo de
SGBD determinado em db.config.js, levará ao caminho da Model desse
SGBD */
const dbConfig = require('./db.config.js');

const loadClientModel = () => {
    if (dbConfig.type === 'postgresql') {
        console.log("SGBD: postgresql");
        return require('../models/postgresqlClientModel.js');
    } else if (dbConfig.type === 'mongodb') {
        console.log("SGBD: mongodb");
        return require('../models/mongoClientModel.js');
    } else if (dbConfig.type === 'mockDB') {
        console.log("SGBD: mockado");
        return require('../models/mockDBClientModel.js');
    } else {
        throw new Error('Unsupported database type');
    }
};

module.exports = {
    loadClientModel,
};
