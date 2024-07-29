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

const searchClient = (clientData) => {
    let newClient = {};
    newClient = DBSearch(clientData);
    return newClient;
};


function DBSearch(clientData) {

    let listCostumers = {
        '12345678900': {
            "CPF": "12345678900",
            "data de nascimento": "01/01/1990",
            "valor da dívida": "1000,00",
            "data de vencimento da dívida": "01/01/2025",
            "possui acordo": false
        }
    }

    if (listCostumers[clientData]) {
        return listCostumers[clientData];
    } else {
        return {status: "NOK", response : "client não encontrado"};
    }

}


module.exports = {
    saveClient,
    searchClient,
};

