/* Configura a aplicação Express, adiciona middlewares (como bodyParser
     para processar JSON) e define as rotas, conectando-as aos controladores.*/
const express = require("express");
const bodyParser = require("body-parser");
const emailController = require("./controllers/emailController.js");
const clientController = require("./controllers/clientController.js");

const app = express();
app.use(bodyParser.json());

// captura e log do IP do cliente
app.use((req, res, next) => {
     const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
     req.clientIp = clientIp;
     console.log(`ip: ${clientIp}`);
     console.log("data: ",new Date().toLocaleString());
     next();
 });

app.get('/SendEmail', emailController.sendEmail);
app.post('/RegistrarCliente', clientController.registerClient);
app.get('/ConsultarCliente', clientController.searchClient);
app.get('/ClientesDebitoAtrasado', clientController.overdueDebts);
app.get('/InitDB', clientController.DBCostumerInit)

module.exports = app;
