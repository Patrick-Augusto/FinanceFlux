# FinanceFlux

Testando a Aplicação
1. Verifique se a aplicação está em execução:
curl http://localhost:3000/
Você deve receber a resposta:


Aplicação de Monitoramento de Portfólios em execução!


2. Criar uma nova entrada de portfólio:

curl -X POST http://localhost:3000/portfolio \
  -H "Content-Type: application/json" \
  -d '{
    "investorId": "1",
    "stockSymbol": "GOOGL",
    "quantity": 15,
    "price": 2800.00,
    "timestamp": "2023-10-01T12:00:00Z"
  }'
Resposta esperada:

json

{
  "message": "Entrada de portfólio criada com sucesso"
}

3. Obter o portfólio de um investidor:

curl http://localhost:3000/portfolio/1

Resposta esperada:

json

[
  {
    "investorId": "1",
    "stockSymbol": "GOOGL",
    "quantity": 15,
    "price": 2800,
    "timestamp": "2023-10-01T12:00:00.000Z"
  },
  {
    "investorId": "1",
    "stockSymbol": "AAPL",
    "quantity": 42,
    "price": 212.34,
    "timestamp": "2023-10-01T14:23:45.678Z"
  }
  // ... outras entradas ...
]