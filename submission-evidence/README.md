# Submission Evidence Checklist

Use this checklist to track the nine graded screenshots for the Coursera final project submission.

## Evidence Files

Save each screenshot with the filename below. Each image must clearly show the described proof.

| # | Filename | What It Must Show | Status |
|---|----------|-------------------|--------|
| 1 | `01-product-details-code-engine.png` | Code Engine dashboard showing the **Product Details** application successfully deployed (status: Ready, green indicator). | ☐ |
| 2 | `02-dealer-pricing-code-engine.png` | Code Engine dashboard showing the **Dealer Pricing** application successfully deployed (status: Ready, green indicator). | ☐ |
| 3 | `03-frontend-repository-cloned.png` | Terminal or file explorer showing the cloned **dealer-evaluation** frontend repository with its files visible. | ☐ |
| 4 | `04-index-html-api-urls.png` | The `index.html` file open in an editor, with the **actual deployed backend URLs** replacing the placeholder URLs. | ☐ |
| 5 | `05-frontend-code-engine.png` | Code Engine dashboard showing the **Dealer Evaluation frontend** application successfully deployed. | ☐ |
| 6 | `06-products-dropdown.png` | The live frontend page open in a browser, with the **product dropdown populated** with the list of products. | ☐ |
| 7 | `07-dealers-for-selected-product.png` | A product selected in the dropdown, and the **list of dealers** for that product displayed on the page. | ☐ |
| 8 | `08-selected-dealer-price.png` | A specific dealer selected, and that **dealer's price** for the chosen product displayed on the page. | ☐ |
| 9 | `09-all-dealer-prices.png` | The "All Dealers" option selected, showing **all dealer prices** for the chosen product displayed on the page. | ☐ |

## Deployment Sequence

1. **Deploy Product Details** (Python) → capture screenshot 1
2. **Deploy Dealer Pricing** (Node.js) → capture screenshot 2
3. **Clone frontend repository** → capture screenshot 3
4. **Update `index.html`** with deployed URLs → capture screenshot 4
5. **Deploy frontend** → capture screenshot 5
6. **Open frontend URL** → capture screenshots 6–9

## IBM Cloud Code Engine – Deployment Guide

### Prerequisites

- IBM Cloud account (free tier is sufficient)
- IBM Cloud CLI installed: https://cloud.ibm.com/docs/cli
- Code Engine plugin installed:
  ```bash
  ibmcloud plugin install code-engine
  ```

### Step 1: Authenticate

```bash
ibmcloud login
# If using a federated ID:
ibmcloud login --sso
```

### Step 2: Target a resource group

```bash
ibmcloud target -g Default
```

### Step 3: Create a Code Engine project (once)

```bash
ibmcloud ce project create --name dealer-eval
ibmcloud ce project select --name dealer-eval
```

### Step 4: Deploy Product Details

```bash
ibmcloud ce application create \
  --name product-details \
  --build-source https://github.com/<YOUR-USERNAME>/dealer-evaluation-microservices \
  --build-context-dir product-details \
  --port 8080 \
  --min-scale 1
```

> **Copy the deployed URL** from the output (e.g., `https://product-details.xxxx.us-south.codeengine.appdomain.cloud`).

Verify:
```bash
curl https://<product-details-url>/products
```

📸 **Capture screenshot 1** from the Code Engine dashboard.

### Step 5: Deploy Dealer Pricing

```bash
ibmcloud ce application create \
  --name dealer-pricing \
  --build-source https://github.com/<YOUR-USERNAME>/dealer-evaluation-microservices \
  --build-context-dir dealer-pricing \
  --port 8080 \
  --min-scale 1
```

> **Copy the deployed URL** from the output.

Verify:
```bash
curl https://<dealer-pricing-url>/health
```

📸 **Capture screenshot 2** from the Code Engine dashboard.

### Step 6: Clone the frontend repository

```bash
git clone <OFFICIAL-FRONTEND-URL> dealer-evaluation
```

📸 **Capture screenshot 3** showing the cloned files.

### Step 7: Update frontend API URLs

Open `dealer-evaluation/index.html` and replace the placeholder URLs with the actual deployed URLs:

```
PRODUCT_DETAILS_URL → https://product-details.xxxx.codeengine.appdomain.cloud
DEALER_PRICING_URL  → https://dealer-pricing.xxxx.codeengine.appdomain.cloud
```

📸 **Capture screenshot 4** showing the updated `index.html`.

### Step 8: Deploy the frontend

```bash
ibmcloud ce application create \
  --name dealer-evaluation \
  --build-source https://github.com/<YOUR-USERNAME>/dealer-evaluation-microservices \
  --build-context-dir dealer-evaluation \
  --port 8080 \
  --min-scale 1
```

📸 **Capture screenshot 5** from the Code Engine dashboard.

### Step 9: Test the live application

Open the frontend URL in your browser and:

1. Verify products load in the dropdown → 📸 **screenshot 6**
2. Select a product → dealers appear → 📸 **screenshot 7**
3. Select one dealer → price shown → 📸 **screenshot 8**
4. Select "All Dealers" → all prices shown → 📸 **screenshot 9**

### Troubleshooting

- **View logs:**
  ```bash
  ibmcloud ce application logs --name <app-name>
  ```
- **Check status:**
  ```bash
  ibmcloud ce application get --name <app-name>
  ```
- **Rebuild after code changes:**
  ```bash
  ibmcloud ce application update --name <app-name> --build-source <repo-url> --build-context-dir <dir>
  ```
- **CORS errors:** Both backends include CORS middleware. If the frontend still cannot reach them, verify the URLs are correct and the services are running.
