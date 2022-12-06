const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  /* console.log('shop.js', adminData.products);
  res.sendFile(path.join(rootDir, 'views', 'shop.html')); */

  // using pug
  const products = adminData.products;
  res.render("shop", {
    prods: products,
    pageTitle: "shop",
    hasProducts: products.length > 0,
    path: "/",
    // layout: false,
    activeShop: true,
    productCSS: true,
  });
});

module.exports = router;
