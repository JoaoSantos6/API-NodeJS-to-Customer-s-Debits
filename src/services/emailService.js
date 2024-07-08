/* Contêm a lógica de negócios da aplicação. Eles são responsáveis
 por processar os dados recebidos dos controladores e interagir com
  os modelos, se necessário.
    clintService.js
    - Chama o modelo de email para enviar o email.
    - Pode adicionar lógica de negócios adicional antes de chamar 
    o modelo, se necessário 
    e a reutilização em diferentes partes da aplicação.
*/
const emailModel = require("../models/emailModel.js");

const sendEmail = (idBoleto) => {
    // Aqui você pode adicionar lógica de negócios, se necessário
    return emailModel.sendEmail();
}

module.exports = {
    sendEmail,
};

