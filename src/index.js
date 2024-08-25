/* Serve como o ponto de entrada da aplicação. 
Apenas inicializa o servidor e configura a porta
 na qual a aplicação irá rodar.*/
const app = require("./app.js");

port = 3002;

app.listen(port, () => {
    console.log("Projeto rodando na porta :",port);
    console.log('______________________________');
});
