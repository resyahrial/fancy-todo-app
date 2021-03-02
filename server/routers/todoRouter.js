const { Router } = require("express");

const { TodoController } = require("../controllers");

const router = Router();

router.post("/", TodoController.addTodo);
router.get("/", TodoController.findAll);
router.get("/:id", TodoController.findById);
router.put("/:id", TodoController.update);
router.patch("/:id", TodoController.updateStatus);
router.delete("/:id", TodoController.delete);

module.exports = router;
