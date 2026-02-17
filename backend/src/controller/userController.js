const bcrypt = require("bcrypt");
const User = require("../model/userSchema");
const Roles = require("../model/enums/enum");
const sendMail = require("../sendEmail");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, city, role, store } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password,
      city,
      role,
      store
    });
    await newUser.save();

    if (newUser.role === Roles.MANAGER || !existingUser) {
      await sendMail({
        to: email,
        html: `<h3>Hi! Your Store Manager Account Details:</h3>
        <p>Your login Email is: ${email}</p><p>Your login password is: <b>${password}</b></p>`,
      });
    }
    return res
      .status(201)
      .json({ message: "User created Successfully", newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating user" + " " + error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}).populate("store");
    res
      .status(200)
      .json({ message: "All users fetched successfully", users: allUsers });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error Fetching Users", error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate("store");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "user fetched successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error Fetching User", error: error.message });
  }
};
