const { Router } = require("express");

const { HomeController } = require("../controllers");
const todoRouter = require("./todoRouter");
const userRouter = require("./userRouter");
const { authentication } = require("../middlewares");

const router = Router();

router.get("/", HomeController.home);
router.use("/", userRouter);

router.use(authentication);
router.use("/todos", todoRouter);

module.exports = router;
