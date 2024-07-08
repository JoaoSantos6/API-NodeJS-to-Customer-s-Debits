/* Serve como o ponto de entrada da aplicação. 
Apenas inicializa o servidor e configura a porta
 na qual a aplicação irá rodar.*/
const app = require("./app.js");

app.listen(3002, () => {
    console.log("Projeto rodando na porta 3002");
});
