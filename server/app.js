if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const express = require("express");

const router = require("./routers");
const { errorHandler } = require("./middlewares");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
