const { decodedToken } = require("../helpers");

const authentication = (req, res, next) => {
  if (!req.headers.access_token) {
    res.status(401).json({
      message: "Please login first",
    });
    return;
  }

  const { id, email } = decodedToken(req.headers.access_token);
  req.currUser = {
    id,
    email,
  };
  next();
};

module.exports = {
  authentication,
};
