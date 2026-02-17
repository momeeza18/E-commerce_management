const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
} = require("../controller/userController");
const { createStore, getAllStores } = require("../controller/storeController");
const { verifyToken } = require("../middleware/verifyToken");
const isAuthorize = require("../middleware/authorization");
const Roles = require("../model/enums/enum");

const router = express.Router();

router.post("/user", verifyToken, isAuthorize(Roles.SUPER_ADMIN), createUser);
router.get("/users", verifyToken, isAuthorize(Roles.SUPER_ADMIN), getAllUsers);
router.get("/user/:id", verifyToken, getUserById);

router.post("/store", verifyToken, isAuthorize(Roles.SUPER_ADMIN), createStore);
router.get(
  "/stores",
  verifyToken,
  isAuthorize(Roles.SUPER_ADMIN),
  getAllStores,
);

module.exports = router;
