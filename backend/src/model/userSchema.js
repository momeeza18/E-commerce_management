const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Roles = require("./enums/enum");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    city: String,
    role: {
      type: String,
      enum: Object.values(Roles),
      default: Roles.CUSTOMER,
    },
    store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
    forceResetPassword: {type: Boolean, default: false}
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
