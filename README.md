# Dealer Evaluation Microservices

A three-microservice application for evaluating dealer pricing across products, built for deployment on **IBM Cloud Code Engine**.

## Architecture

```
┌──────────────────────┐      ┌───────────────────────┐
│  Product Details     │      │  Dealer Pricing       │
│  (Python / Flask)    │      │  (Node.js / Express)  │
│  GET /products       │      │  GET /dealers          │
│  GET /products/<id>  │      │  GET /dealer-price     │
│                      │      │  GET /all-dealer-prices│
└──────────┬───────────┘      └───────────┬────────────┘
           │                              │
           └──────────┐    ┌──────────────┘
                      ▼    ▼
            ┌─────────────────────┐
            │ Dealer Evaluation   │
            │ Frontend (HTML/JS)  │
            │ Dropdown → Dealers  │
            │ → Pricing Display   │
            └─────────────────────┘
```

## Directory Structure

| Directory              | Description                                    |
|------------------------|------------------------------------------------|
| `product-details/`    | Python Flask API – product catalog             |
| `dealer-pricing/`     | Node.js Express API – dealers & pricing        |
| `dealer-evaluation/`  | Frontend microservice (cloned from course repo)|
| `submission-evidence/`| Checklist & screenshot filenames for grading   |

## Quick Start (Local)

### 1. Product Details (Python)

```bash
cd product-details
pip install -r requirements.txt
python app.py                    # → http://localhost:5000
pytest test_app.py -v            # run tests
```

### 2. Dealer Pricing (Node.js)

```bash
cd dealer-pricing
npm install
npm start                        # → http://localhost:3000
npm test                         # run tests
```

### 3. Frontend

The frontend will be cloned from the official Coursera repository (see Phase D).

## API Endpoints

### Product Details Service

| Method | Path              | Response                              |
|--------|-------------------|---------------------------------------|
| GET    | `/products`       | `[{id, name, category}, …]`          |
| GET    | `/products/<id>`  | `{id, name, category}`               |
| GET    | `/health`         | `{"status": "ok"}`                   |

### Dealer Pricing Service

| Method | Path                                            | Response                                       |
|--------|--------------------------------------------------|-------------------------------------------------|
| GET    | `/dealers?productId=<id>`                        | `[{id, name}, …]`                              |
| GET    | `/dealer-price?productId=<id>&dealerId=<id>`     | `{productId, dealerId, dealerName, price}`      |
| GET    | `/all-dealer-prices?productId=<id>`              | `{productId, dealers: [{dealerId, dealerName, price}, …]}` |
| GET    | `/health`                                        | `{"status": "ok"}`                              |

## Shared Product IDs

Both services use matching product IDs (1–5) so the frontend can chain requests:

| ID | Product   |
|----|-----------|
| 1  | Widget A  |
| 2  | Widget B  |
| 3  | Gadget X  |
| 4  | Gadget Y  |
| 5  | Gizmo Z   |

## IBM Cloud Code Engine Deployment

See the [Deployment Guide](submission-evidence/README.md) for step-by-step instructions.

**Deployment order:**
1. Product Details → get deployed URL
2. Dealer Pricing → get deployed URL
3. Update frontend `index.html` with both URLs
4. Deploy frontend → verify all interactions work

## Environment Variables

| Service          | Variable | Default | Description                |
|------------------|----------|---------|----------------------------|
| product-details  | `PORT`   | `5000`  | Server port                |
| dealer-pricing   | `PORT`   | `3000`  | Server port                |
| Frontend         | —        | —       | URLs configured in HTML    |

## CORS

Both backend services enable CORS by default so the frontend (served from a different Code Engine domain) can make cross-origin requests.
