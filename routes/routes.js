import express from "express";
import Product from "../models/model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    console.log(req.body);

    if (!name || !price || !Number.isInteger(stock)) {
      return res
        .status(400)
        .json({ message: "Missing or invalid required fields" });
    }

    const product = new Product({ name, description, price, stock });
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    if (Number.isInteger(stock)) {
      req.body.stock = stock;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
});

export default router;
