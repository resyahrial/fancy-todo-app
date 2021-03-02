module.exports = (err, req, res, next) => {
  if (!err.data) {
    next();
  }

  const { data } = err;
  let errMessage = {
    status: 500,
    message: "Internal Server Error",
  };

  if (data.name) {
    switch (data.name) {
      case "SequelizeDatabaseError":
        errMessage = {
          ...errMessage,
          message: `${data.parent.column} attribute is not provided`,
        };
        break;
      case "SequelizeUniqueConstraintError":
      case "SequelizeValidationError":
        errMessage = {
          ...errMessage,
          status: 400,
          message: data.errors[0].message,
        };
        break;
      case "Data Not Found":
        errMessage = {
          ...errMessage,
          status: 404,
          message: data.name,
        };
        break;
      case "Invalid username / password":
        errMessage = {
          ...errMessage,
          status: 401,
          message: data.name,
        };
        break;
      case "Invalid Token":
      case "You're not authorize":
      case "Please Login First":
        errMessage = {
          ...errMessage,
          status: 401,
          message: data.name,
        };
        break;
      default:
        break;
    }
  }

  res.status(errMessage.status).json({ message: errMessage.message });
};
