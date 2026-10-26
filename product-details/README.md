# Product Details Microservice (Python / Flask)

REST API that serves product information for the Dealer Evaluation application.

## Endpoints

| Method | Path              | Description                   |
|--------|-------------------|-------------------------------|
| GET    | `/`               | Service metadata              |
| GET    | `/health`         | Health check (`{"status":"ok"}`) |
| GET    | `/products`       | List all products             |
| GET    | `/products/<id>`  | Get a single product by ID    |

## Sample Response — `/products`

```json
[
  {"id": 1, "name": "Widget A", "category": "Electronics"},
  {"id": 2, "name": "Widget B", "category": "Electronics"},
  {"id": 3, "name": "Gadget X", "category": "Accessories"},
  {"id": 4, "name": "Gadget Y", "category": "Accessories"},
  {"id": 5, "name": "Gizmo Z", "category": "Hardware"}
]
```

## Local Setup

```bash
cd product-details
pip install -r requirements.txt
python app.py
# Service runs on http://localhost:5000
```

## Run Tests

```bash
pytest test_app.py -v
```

## Docker

```bash
docker build -t product-details .
docker run -p 8080:8080 product-details
```

## Environment Variables

| Variable | Default | Description                  |
|----------|---------|------------------------------|
| `PORT`   | `5000`  | Port the server listens on   |
