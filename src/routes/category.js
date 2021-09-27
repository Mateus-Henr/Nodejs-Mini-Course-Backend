const express = require("express");
const router = express.Router();
const controller = require("../controllers/category");

// Our kinda beautiful CRUD operations
// router.post("/", authService.authenticate.controller.post); This would be used if we had an user authentication system
router.post("/", controller.post);
router.get("/", controller.get);
router.put("/:id", controller.put);
router.delete("/:id", controller.delete);
// router.delete("/:label", controller.delete); This would be a conflict, since it wouldn't be be able to identify if it's an id or label

module.exports = router;
