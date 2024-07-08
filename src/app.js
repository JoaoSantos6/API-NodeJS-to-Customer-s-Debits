/* Configura a aplicação Express, adiciona middlewares (como bodyParser
     para processar JSON) e define as rotas, conectando-as aos controladores.*/
const express = require("express");
const bodyParser = require("body-parser");
const emailController = require("./controllers/emailController.js");
const clientController = require("./controllers/clientController.js");

const app = express();
app.use(bodyParser.json());

app.get('/SendEmail', emailController.sendEmail);
app.post('/RegistrarCliente', clientController.registerClient);

module.exports = app;
