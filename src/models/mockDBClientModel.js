/* 
    responsável pelas operações de banco do cliente utilizando mock
*/
const mockDatabase = [];

const saveClient = async (clientData) => {
    const id = mockDatabase.length + 1;
    const newClient = { id, ...clientData };
    mockDatabase.push(newClient);
    return newClient;
};

module.exports = {
    saveClient,
};
