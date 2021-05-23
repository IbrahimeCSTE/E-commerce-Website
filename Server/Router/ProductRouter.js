import express from "express";
import data from "../data.js";
import Product from "../Model/ProductModel.js";
const ProductRouter = express.Router();
import expressAsyncHandler from "express-async-handler";

ProductRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

ProductRouter.get("/seed", async (req, res) => {
  ///await Product.remove({})
  const createProduct = await Product.insertMany(data.products);
  res.send({ createProduct });
});
ProductRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send({ product });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);
export default ProductRouter;
