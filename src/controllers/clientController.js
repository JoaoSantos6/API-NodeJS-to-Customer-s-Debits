/* Contêm a lógica para lidar com as requisições HTTP. 
Eles recebem as requisições, processam os parâmetros e 
chamam os serviços apropriados. 
    clientController.js
    - Recebe a requisição para consultar cliente.
    - Valida os dados do cliente utilizando o serviço de validação.
    - Retorna a resposta com base na validação.*/
const clientService = require("../services/clientService.js");

const DBCostumerInit = async (req, res) => {
    try {
        console.log("executou: DBCostumerInit");
        const result = await clientService.DBCostumerInit();
        if (result.status === 'created') {
            res.status(201).json({ message: result.message });
        } else if (result.status === 'exists') {
            res.status(200).json({ message: result.message });
        } else {
            res.status(500).json({ message: result.message });
        }
        console.log("______________________________");
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor", errors: error.message });
        console.log("______________________________");
    }
};

const registerClient = async (req, res) => {
    try {
        console.log("executou: registerClient");
        const client = await clientService.registerClient(req.body);
        res.status(200).json({ message: "Cliente registrado com sucesso", client });
        console.log("______________________________");
    } catch (error) {
        if (error.message.includes("duplicar valor da chave viola")) {
            res.status(400).json({ message: "Parâmetros inválidos", errors: "CPF já cadastrado" });
            console.log("______________________________");
        } else {
            res.status(400).json({ message: "Parâmetros inválidos", errors: error.message });
            console.log("______________________________");
        }

    }
}

const searchClient = async (req, res) => {
    try {
        console.log("executou: searchClient");
        const document = req.query.CPF;
        const client = await clientService.searchClient(document);
        //========== cliente nao encontrado =======
        if (!client) {
            console.log('cliente não encontrado');
            res.status(404).json({ status: "NOK", message: "cliente não encontrado" });
        }
        //========== cliente encontrado ===========
        else {
            console.log('cliente encontrado: ', client);
            res.status(200).json(client);
        }
        console.log("______________________________");
    } catch (error) {
        res.status(400).json({ message: "Parâmetros inválidos", errors: error.message });
        console.log("______________________________");
    }
}

const overdueDebts = async (req, res) => {
    try {
        console.log("executou: overdueDebts");
        const result = await clientService.getOverdueDebts();
        res.status(200).json(result);
        console.log("______________________________");
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor", errors: error.message });
        console.log("______________________________");
    }
};

module.exports = {
    registerClient,
    searchClient,
    DBCostumerInit,
    overdueDebts
};

