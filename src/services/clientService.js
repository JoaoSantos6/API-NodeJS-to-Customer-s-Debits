const { loadClientModel } = require('../db/modelLoader.js');
const clientModel = loadClientModel();

const validateClientData = (data) => {
    const errors = [];

    if (!data.CPF || typeof data.CPF !== 'string') {
        errors.push("CPF deve ser uma string alfanumérica");
    }

    if (!data["Nome completo"] || typeof data["Nome completo"] !== 'string') {
        errors.push("Nome completo deve ser uma string");
    }

    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    const isValidDate = (dateString) => {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date);
    };

    if (!data["data de nascimento"] || (!dateRegex.test(data["data de nascimento"]) && !isValidDate(data["data de nascimento"]))) {
        errors.push("Data de nascimento deve estar no formato dd/mm/yyyy ou ser uma data válida");
    }

    const valorRegex = /^\d+(\,\d{2})?$/;
    if (!data["valor da dívida"] || !valorRegex.test(data["valor da dívida"])) {
        errors.push("Valor da dívida deve estar no padrão do real brasileiro (ex: 1000,00)");
    }

    if (!data["data de vencimento da dívida"] || (!dateRegex.test(data["data de vencimento da dívida"]) && !isValidDate(data["data de vencimento da dívida"]))) {
        errors.push("Data de vencimento da dívida deve estar no formato dd/mm/yyyy ou ser uma data válida");
    }

    if (typeof data["possui acordo"] !== 'boolean') {
        errors.push("Possui acordo deve ser um booleano");
    }

    return errors;
}

const DBCostumerInit = async () =>{
    return await clientModel.DBCostumerInit();
}

const registerClient = async (clientData) => {
    const errors = validateClientData(clientData);
    if (errors.length > 0) {
        throw new Error(errors.join(", "));
    }
    return await clientModel.saveClient(clientData);
};

const searchClient = (clientData) => {
    return clientModel.searchClient(clientData);
};

module.exports = {
    registerClient,
    searchClient,
    DBCostumerInit,
};
