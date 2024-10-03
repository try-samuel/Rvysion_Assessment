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
    origin: [
      "http://localhost:3000", // Local development frontend
      "https://rvysion-assessment-frontend.vercel.app", // Deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Specify allowed methods
    credentials: true, // Allow credentials if needed
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Load product data from JSON file
async function loadProducts() {
  try {
    const filePath = path.join(__dirname, "products.json");
    const data = await readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Error loading product data");
  }
}

// Product list endpoint
app.get("/api/products", async (_, res) => {
  try {
    const products = await loadProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Product search endpoint
app.get("/api/products/search", async (req, res) => {
  const { query } = req.query;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Invalid search query" });
  }

  try {
    const products = await loadProducts();
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Single product view endpoint
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const products = await loadProducts();
    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Handle preflight requests for CORS
app.options("*", cors({ origin: true, credentials: true })); // Handle all OPTIONS preflight requests

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
