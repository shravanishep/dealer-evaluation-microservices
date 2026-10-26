"""
Product Details Microservice (Python / Flask)
Serves product catalog and dealer lists for the Dealer Evaluation application.
"""

import os
import json
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask("Product Details Microservice")
CORS(app)

DATA_FILE = os.path.join(os.path.dirname(__file__), "products.json")


def load_products_data():
    with open(DATA_FILE, "r") as f:
        return json.load(f)


@app.route("/", methods=["GET"])
def home():
    """Root endpoint with service metadata."""
    return jsonify({
        "service": "Product Details Microservice",
        "version": "1.0.0",
        "status": "running",
        "endpoints": ["/products", "/getdealers/<product>", "/health"]
    }), 200


@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint for Code Engine probes."""
    return jsonify({"status": "ok"}), 200


@app.route("/products", methods=["GET"])
def get_products():
    """Returns list of product names formatted for the frontend dropdown."""
    try:
        data = load_products_data()
        product_names = [p["product"] for p in data.get("products", [])]
        return jsonify({"products": product_names}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/getdealers/<product>", methods=["GET"])
def get_dealers(product):
    """Returns the list of dealers supplying the given product."""
    try:
        data = load_products_data()
        for item in data.get("products", []):
            if item["product"].strip().lower() == product.strip().lower():
                return jsonify({"dealers": item["Dealers"]}), 200
        return jsonify({"message": "Could not find dealers for this product"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
