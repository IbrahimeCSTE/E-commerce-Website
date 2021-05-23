import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import data from "./data.js";
import userRouter from "./Router/UserRouter.js";
import ProductRouter from "./Router/ProductRouter.js";
import orderRouter from "./Router/OrderRouter.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 5000;

mongoose.connect(process.env.MONGOOSE_URL || "mongodb://localhost/AmazonDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
try {
  console.log("database is connected");
} catch (error) {
  console.log("database is not connected", error);
}

app.get("/", (req, res) => {
  res.send("WELLCOME");
});

app.use("/api/products", ProductRouter);

app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.listen(process.env.PORT || port, () => {
  console.log("server is running");
});
