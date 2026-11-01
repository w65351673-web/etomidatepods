import "dotenv/config";
import mongoose from "mongoose";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI || MONGODB_URI.includes("username:password")) {
  console.error("Set a real MONGODB_URI in .env first.");
  process.exit(1);
}

const SizeSchema = new mongoose.Schema({ label: String, price: Number }, { _id: false });
const ProductSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true },
    name: String,
    price: Number,
    category: String,
    shortDescription: String,
    description: String,
    specifications: [String],
    sizes: [SizeSchema],
    inStock: { type: Boolean, default: true },
    image: String,
  },
  { timestamps: true }
);
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

const { products } = JSON.parse(readFileSync(join(__dirname, "data", "products.json"), "utf8"));

await mongoose.connect(MONGODB_URI);
console.log("Connected.");

for (const p of products) {
  const doc = {
    name: p.name,
    slug: p.slug,
    category: p.category,
    price: p.sizes?.[0]?.price ?? p.price,
    shortDescription: (p.shortDescription || "").trim(),
    description: p.description || "",
    specifications: p.specifications || [],
    sizes: (p.sizes || []).map(({ label, price }) => ({ label, price })),
    inStock: p.inStock ?? true,
    image: p.image || "",
  };
  const res = await Product.updateOne({ slug: p.slug }, { $set: doc }, { upsert: true });
  console.log(res.upsertedCount ? "inserted" : "updated", p.slug);
}

await mongoose.disconnect();
console.log(`Done — ${products.length} products synced.`);
