# API-NodeJS-to-Customer-s-Debits
API em NodeJS para controle de dívidas bancárias do cliente, gerando boleto e enviando email aos clientes

## Estrutura do Projeto

Este projeto foi desenvolvido seguindo o Design Pattern SOLID:

- Single Responsibility Principle: Cada classe tem uma única responsabilidade.
- Open/Closed Principle: As classes estão abertas para extensão, mas fechadas para modificação.
- Liskov Substitution Principle: As subclasses podem substituir suas superclasses sem alterar o comportamento esperado.
- Interface Segregation Principle: As interfaces específicas do cliente são favorecidas em detrimento de uma interface única geral.
- Dependency Inversion Principle: As dependências estão invertidas, com as abstrações não dependendo de detalhes, mas sim o contrário.

## Configuração e Uso

### Pré-requisitos

- Node.js (v14 ou superior)
- NPM (v6 ou superior)

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio

2. Instale as dependências:
    npm install

3. Configure o banco de dados no arquivo db/db.config.js:

## Execução: 
No terminal, execute: node index.js

## Postman:
Para testar a API, você pode usar o Postman ou qualquer outra ferramenta de sua preferência.

curl: 
curl --location 'http://localhost:3002/RegistrarCliente' \
--header 'Content-Type: application/json' \
--data '{
    "CPF": "12345678900",
    "Nome completo": "João da Silva",
    "data de nascimento": "01/01/1990",
    "valor da dívida": "1000,00",
    "data de vencimento da dívida": "01/01/2025",
    "possui acordo": false
}
'