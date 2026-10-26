/**
 * Tests for the Dealer Pricing microservice.
 * Run with: npm test
 */

const request = require("supertest");
const app = require("./server");

describe("GET /", () => {
  it("returns service metadata", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.service).toBe("Dealer Pricing Microservice");
  });
});

describe("GET /health", () => {
  it("returns status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});

describe("GET /price/:dealer/:product", () => {
  it("returns price when dealer has the product", async () => {
    const res = await request(app).get("/price/Binglee/Headphones");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain("Headphones costs $30 at Binglee");
  });

  it("handles case-insensitive requests", async () => {
    const res = await request(app).get("/price/binglee/headphones");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain("$30");
  });

  it("returns unavailable message when dealer does not carry product", async () => {
    const res = await request(app).get("/price/Binglee/Laptop");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain("is not available with Binglee");
  });

  it("returns 404 for unknown dealer", async () => {
    const res = await request(app).get("/price/UnknownDealer/Headphones");
    expect(res.statusCode).toBe(404);
  });
});

describe("GET /allprice/:product", () => {
  it("returns all dealer prices for Headphones", async () => {
    const res = await request(app).get("/allprice/Headphones");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.prices)).toBe(true);
    expect(res.body.prices.length).toBeGreaterThanOrEqual(2);
    const binglee = res.body.prices.find((p) => p.key === "Binglee");
    expect(binglee).toBeDefined();
    expect(binglee.value).toBe("$30");
  });

  it("returns 404 for unknown product", async () => {
    const res = await request(app).get("/allprice/UnknownProduct");
    expect(res.statusCode).toBe(404);
  });
});
