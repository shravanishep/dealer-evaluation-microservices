/**
 * Dealer Pricing Microservice (Node.js / Express)
 * Serves dealer pricing for specific products or all dealers.
 */

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const dealersData = require(path.join(__dirname, "dealers.json"));

/** Root endpoint */
app.get("/", (_req, res) => {
  res.json({
    service: "Dealer Pricing Microservice",
    version: "1.0.0",
    status: "running",
    endpoints: ["/price/:dealer/:product", "/allprice/:product", "/health"]
  });
});

/** Health check */
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

/**
 * GET /price/:dealer/:product
 * Returns specific dealer's price for a product.
 * Example response: { "message": "Headphones costs $30 at Binglee" }
 */
app.get("/price/:dealer/:product", (req, res) => {
  const req_dealer = req.params.dealer.trim().toLowerCase();
  const req_product = req.params.product.trim().toLowerCase();

  const dealers = dealersData.dealers || [];
  let foundDealer = null;

  for (const d of dealers) {
    if (d.Dealer.trim().toLowerCase() === req_dealer) {
      foundDealer = d;
      break;
    }
  }

  if (!foundDealer) {
    return res.status(404).json({ message: "The product is not available with this dealer" });
  }

  // Find product key case-insensitively
  const productKey = Object.keys(foundDealer.products).find(
    (k) => k.trim().toLowerCase() === req_product
  );

  if (productKey) {
    const price = foundDealer.products[productKey];
    return res.json({
      message: `${req.params.product} costs ${price} at ${foundDealer.Dealer}`
    });
  } else {
    return res.json({
      message: `${req.params.product} is not available with ${foundDealer.Dealer}`
    });
  }
});

/**
 * GET /allprice/:product
 * Returns all dealers and their price for a product.
 * Example response: { "prices": [{ "key": "Binglee", "value": "$30" }] }
 */
app.get("/allprice/:product", (req, res) => {
  const req_product = req.params.product.trim().toLowerCase();
  const dealers = dealersData.dealers || [];
  const priceslist = [];

  dealers.forEach((dealer) => {
    const productKey = Object.keys(dealer.products).find(
      (k) => k.trim().toLowerCase() === req_product
    );
    if (productKey) {
      priceslist.push({
        key: dealer.Dealer,
        value: dealer.products[productKey]
      });
    }
  });

  if (priceslist.length > 0) {
    res.json({ prices: priceslist });
  } else {
    res.status(404).json({ message: "The product is not available with this dealer" });
  }
});

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`Dealer Pricing service running on port ${port}`);
  });
}
