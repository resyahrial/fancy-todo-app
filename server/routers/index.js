const { Router } = require("express");

const todoRouter = require("./todoRouter");

const router = Router();

router.get("/", (req, res) => {
  res.redirect("/todos");
});
router.use("/todos", todoRouter);

module.exports = router;
