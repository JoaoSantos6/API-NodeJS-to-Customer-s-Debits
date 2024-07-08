/* Contêm a lógica para lidar com as requisições HTTP. 
Eles recebem as requisições, processam os parâmetros e 
chamam os serviços apropriados. 
    clientController.js
    - Recebe a requisição para consultar cliente.
    - Valida os dados do cliente utilizando o serviço de validação.
    - Retorna a resposta com base na validação.*/
const clientService = require("../services/clientService.js");

const registerClient = (req, res) => {
    const errors = clientService.validateClientData(req.body);

    if (errors.length > 0) {
        return res.status(400).json({ message: "Parâmetros inválidos", errors });
    }

    // Aqui, você poderia adicionar lógica adicional para registrar o cliente,
    // como salvar os dados no banco de dados. Vou apenas simular essa lógica.

    res.status(200).json({ message: "Cliente registrado com sucesso" });
}

module.exports = {
    registerClient,
};
    