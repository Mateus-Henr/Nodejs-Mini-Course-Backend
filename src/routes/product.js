const express = require("express");
const router = express.Router();
const controller = require("../controllers/product");

router.post("/", controller.post);

router.get("/", controller.get);
router.get("/:id", controller.getById);
router.get("/products/:product", controller.get);

router.put("/:id", controller.put);

router.delete("/:id", controller.delete);

module.exports = router;
