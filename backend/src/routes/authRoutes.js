const express = require("express");
const { login, changePassword } = require("../controller/authController");
const isAuthorize = require("../middleware/authorization");
const Roles = require("../model/enums/enum");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

router.post("/login", login);
router.post(
  "/changePassword",
  verifyToken,
  isAuthorize(Roles.MANAGER),
  changePassword,
);

module.exports = router;
