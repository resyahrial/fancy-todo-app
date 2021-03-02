const { Router } = require("express");

const todoRouter = require("./todoRouter");
const userRouter = require("./userRouter");
const { authentication } = require("../middlewares");

const router = Router();

router.use("/", userRouter);

router.use(authentication);
router.get("/", (req, res) => {
  res.redirect("/todos");
});
router.use("/todos", todoRouter);

module.exports = router;
