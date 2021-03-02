const { Router } = require("express");

const { TodoController } = require("../controllers");
const { authorization } = require("../middlewares");

const router = Router();

router.post("/", TodoController.addTodo);
router.get("/", TodoController.findAll);

router.get("/:id", authorization, TodoController.findById);
router.put("/:id", authorization, TodoController.update);
router.patch("/:id", authorization, TodoController.updateStatus);
router.delete("/:id", authorization, TodoController.delete);

module.exports = router;
