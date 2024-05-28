const express = require("express");
const transport = require("./mail/transport.js");
const configEmail = require("./config/emailConfig.js");

const app = express();

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

// Definindo a rota /GetEmail
app.get('/GetEmail', (req, res) => {
    sendEmail().then(response => {
        res.status(200).json({ message: "Email enviado com sucesso" });
    }).catch(error => {
        res.status(500).json({ message: "Falha ao enviar o email", error: error.message });
    });
});

app.listen(3002, () => {
    console.log("Projeto rodando na porta 3002");
});
