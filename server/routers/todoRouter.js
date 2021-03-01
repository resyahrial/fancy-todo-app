const { Router } = require("express");

const { TodoController } = require("../controllers");

const router = Router();

router.post("/", TodoController.addTodo);

module.exports = router;
