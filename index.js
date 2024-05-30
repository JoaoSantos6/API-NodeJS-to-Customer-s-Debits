const express = require("express");
const bodyParser = require("body-parser");
const transport = require("./mail/transport.js");
const configEmail = require("./config/emailConfig.js");

const app = express();
app.use(bodyParser.json()); // Middleware para processar JSON no corpo da requisição

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


app.get('/SendEmail', (req, res) => {
    const idBoleto = req.query.idBoleto;

    if (!idBoleto || isNaN(idBoleto)) {
        return res.status(400).json({ message: "Parâmetro idBoleto é obrigatório e deve ser um número válido" });
    }

    sendEmail(idBoleto).then(response => {
        res.status(200).json({ message: "Email enviado com sucesso" });
    }).catch(error => {
        res.status(500).json({ message: "Falha ao enviar o email", error: error.message });
    });
});

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

app.post('/ConsultarCliente', (req, res) => {
    const errors = validateClientData(req.body);

    if (errors.length > 0) {
        return res.status(400).json({ message: "Parâmetros inválidos", errors });
    }

    res.status(200).json({ message: "Dívida cadastrada com sucesso" });
});

app.listen(3002, () => {
    console.log("Projeto rodando na porta 3002");
});
