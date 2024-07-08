/* Contêm a lógica para interagir com fontes de dados externas, 
como bancos de dados ou serviços externos.
    emailModel.js
    - responsável por enviar o email utilizando a configuração e o transporte especificados.
    - Se comunica com o serviço de email externo.*/
const transport = require("../mail/transport.js");
const configEmail = require("../../config/emailConfig.js");

const sendEmail = () => {
    return new Promise((resolve, reject) => {
        transport.sendMail(configEmail)
            .then(res => {
                transport.close();
                return resolve(res);
            }).catch(error => {
                console.log(error);
                transport.close();
                return reject(error);
            });
    });
}

module.exports = {
    sendEmail,
};
