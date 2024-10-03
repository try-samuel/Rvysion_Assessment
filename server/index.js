import express from "express";
import cors from "cors";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3001;

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to enable CORS
app.use(
  cors({
    origin: "*",
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Load product data from JSON file
async function loadProducts() {
  const filePath = path.join(__dirname, "products.json");
  const data = await readFile(filePath, "utf8");
  return JSON.parse(data);
}

// Product list endpoint
app.get("/api/products", async (req, res) => {
  const products = await loadProducts();
  res.json(products);
});

// Product search endpoint
app.get("/api/products/search", async (req, res) => {
  const { query } = req.query;
  const products = await loadProducts();

  if (typeof query !== "string") {
    return res.status(400).json({ error: "Invalid search query" });
  }

  const results = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  res.json(results);
});

// Single product view endpoint
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const products = await loadProducts();

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
