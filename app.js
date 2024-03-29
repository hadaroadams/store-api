require("dotenv").config();
require('express-async-errors')
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const connectDB = require("./config/dbconn");
const products = require("./route/products");
const errHandler = require("./middlewares/errHandler");
const notFound = require("./middlewares/notFound");

connectDB();
const PORT = process.env.PORT || 3400;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is my initial page");
});

app.use("/api/product", products);

// erro middleware

app.use(errHandler);
app.use(notFound);

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
});
