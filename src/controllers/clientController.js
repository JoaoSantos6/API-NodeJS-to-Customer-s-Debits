/* Contêm a lógica para lidar com as requisições HTTP. 
Eles recebem as requisições, processam os parâmetros e 
chamam os serviços apropriados. 
    clientController.js
    - Recebe a requisição para consultar cliente.
    - Valida os dados do cliente utilizando o serviço de validação.
    - Retorna a resposta com base na validação.*/
const clientService = require("../services/clientService.js");

const registerClient = async (req, res) => {
    try {
        const client = await clientService.registerClient(req.body);
        res.status(200).json({ message: "Cliente registrado com sucesso", client });
        console.log("executou: registerClient");
        console.log("______________________________");
    } catch (error) {
        res.status(400).json({ message: "Parâmetros inválidos", errors: error.message });
    }
}

module.exports = {
    registerClient,
};

