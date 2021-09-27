const express = require("express"); // Our routes
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Welcome to main route!");
});

module.exports = router;
