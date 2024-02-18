require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const connectDB = require("./config/dbconn");
const products = require("./route/products");
const errorHandler = require("./middlewares/ErrorHandling");
const notFound = require("./middlewares/notFound");

connectDB();
const PORT = process.env.PORT || 3400;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is my initial page");
});

app.use("/api/product", products);

// erro middleware

app.use(errorHandler);
app.use(notFound);

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
});
