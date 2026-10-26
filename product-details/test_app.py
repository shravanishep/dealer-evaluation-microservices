"""
Tests for the Product Details microservice.
Run with: pytest test_app.py -v
"""

import pytest
from app import app


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_home(client):
    res = client.get("/")
    assert res.status_code == 200
    assert res.get_json()["status"] == "running"


def test_health(client):
    res = client.get("/health")
    assert res.status_code == 200
    assert res.get_json()["status"] == "ok"


def test_get_products(client):
    res = client.get("/products")
    assert res.status_code == 200
    data = res.get_json()
    assert "products" in data
    assert isinstance(data["products"], list)
    assert "Headphones" in data["products"]
    assert "Laptop" in data["products"]
    assert "Mouse" in data["products"]
    assert "Printer" in data["products"]


def test_get_dealers_valid(client):
    res = client.get("/getdealers/Headphones")
    assert res.status_code == 200
    data = res.get_json()
    assert "dealers" in data
    assert "Binglee" in data["dealers"]


def test_get_dealers_case_insensitive(client):
    res = client.get("/getdealers/headphones")
    assert res.status_code == 200
    assert "Binglee" in res.get_json()["dealers"]


def test_get_dealers_not_found(client):
    res = client.get("/getdealers/UnknownProduct")
    assert res.status_code == 404
    assert "message" in res.get_json()
