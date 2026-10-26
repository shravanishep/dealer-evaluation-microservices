# Dealer Pricing Microservice (Node.js / Express)

REST API that serves dealer information and per-product pricing for the Dealer Evaluation application.

## Endpoints

| Method | Path                                            | Description                             |
|--------|--------------------------------------------------|-----------------------------------------|
| GET    | `/`                                              | Service metadata                        |
| GET    | `/health`                                        | Health check (`{"status":"ok"}`)        |
| GET    | `/dealers?productId=<id>`                        | Dealers that supply a product           |
| GET    | `/dealer-price?productId=<id>&dealerId=<id>`     | Single dealer's price for a product     |
| GET    | `/all-dealer-prices?productId=<id>`              | All dealers' prices for a product       |

## Sample Responses

### `/dealers?productId=1`
```json
[
  {"id": 101, "name": "Alpha Auto Parts"},
  {"id": 102, "name": "Beta Wholesale"},
  {"id": 105, "name": "Epsilon Electronics"}
]
```

### `/dealer-price?productId=1&dealerId=101`
```json
{"productId": 1, "dealerId": 101, "dealerName": "Alpha Auto Parts", "price": 24.99}
```

### `/all-dealer-prices?productId=1`
```json
{
  "productId": 1,
  "dealers": [
    {"dealerId": 101, "dealerName": "Alpha Auto Parts", "price": 24.99},
    {"dealerId": 102, "dealerName": "Beta Wholesale", "price": 22.50},
    {"dealerId": 105, "dealerName": "Epsilon Electronics", "price": 26.00}
  ]
}
```

## Local Setup

```bash
cd dealer-pricing
npm install
npm start
# Service runs on http://localhost:3000
```

## Run Tests

```bash
npm test
```

## Docker

```bash
docker build -t dealer-pricing .
docker run -p 8080:8080 dealer-pricing
```

## Environment Variables

| Variable | Default | Description                |
|----------|---------|----------------------------|
| `PORT`   | `3000`  | Port the server listens on |
