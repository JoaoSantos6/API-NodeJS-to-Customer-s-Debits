/* 
    responsável pelas operações de banco do cliente utilizando MongoDB
*/
const { MongoClient } = require('mongodb');
const dbConfig = require('../db/db.config.js');

const client = new MongoClient(dbConfig.mongodb.uri, { useNewUrlParser: true, useUnifiedTopology: true });

const saveClient = async (clientData) => {
    await client.connect();
    const database = client.db();
    const collection = database.collection('clients');
    const result = await collection.insertOne(clientData);
    return result.ops[0];
};

module.exports = {
    saveClient,
};
