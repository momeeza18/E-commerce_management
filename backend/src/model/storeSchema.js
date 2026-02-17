const mongoose = require("mongoose");
const Roles = require("./enums/enum");

const storeSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
