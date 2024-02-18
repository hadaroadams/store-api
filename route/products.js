const express = require("express");
const router = express.Router();
const {
  getallProducts,
  getAllStaticProduts,
} = require("./../controllers/productsController");

router.get("/", getallProducts).get("/static", getAllStaticProduts);

module.exports = router;
