/* Contêm a lógica para lidar com as requisições HTTP. 
Eles recebem as requisições, processam os parâmetros e 
chamam os serviços apropriados. 
    emailService:
    - Recebe a requisição para enviar um email.
    - Valida os parâmetros de entrada.
    - Chama o serviço de email e retorna a resposta apropriada.
*/
const emailService = require("../services/emailService.js");

const sendEmail = (req, res) => {
    const idBoleto = req.query.idBoleto;

    if (!idBoleto || isNaN(idBoleto)) {
        return res.status(400).json({ message: "Parâmetro idBoleto é obrigatório e deve ser um número válido" });
    }

    emailService.sendEmail(idBoleto).then(response => {
        res.status(200).json({ message: "Email enviado com sucesso" });
    }).catch(error => {
        res.status(500).json({ message: "Falha ao enviar o email", error: error.message });
    });
}

module.exports = {
    sendEmail,
};
