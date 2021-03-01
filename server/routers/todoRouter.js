const { Router } = require("express");

const { TodoController } = require("../controllers");

const router = Router();

router.post("/", TodoController.addTodo);
router.get("/", TodoController.findAll);
router.get("/:id", TodoController.findById);

module.exports = router;
