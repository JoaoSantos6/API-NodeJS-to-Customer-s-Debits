# API-NodeJS-to-Customer-s-Debits
API em NodeJS para controle de dívidas bancárias do cliente, gerando boleto e enviando email aos clientes

## Como executar o código:
ao acessar o terminal da máquina ou da IDE desejada, execute o arquivo /src/index.js

## Como testar no postman:
Registrar Cliente: http://localhost:3002/RegistrarCliente
body: {
    "CPF": "12345678900",
    "Nome completo": "João da Silva",
    "data de nascimento": "01/01/1990",
    "valor da dívida": "1000,00",
    "data de vencimento da dívida": "01/01/2025",
    "possui acordo": true
}
