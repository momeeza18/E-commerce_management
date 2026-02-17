const Roles = require("../model/enums/enum");

const isAuthorize = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        message:
          "Access denied: Your roles are not allowed to access this route",
      });
    }
    next();
  };
};
module.exports = isAuthorize;
