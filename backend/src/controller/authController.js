const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const dotenv = require("dotenv");
const Roles = require("../model/enums/enum");
const sendMail = require("../sendEmail");
dotenv.config();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please Enter Email and Password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" },
    );
    res.status(200).json({
      message: "Login Successful",
      data: user,
      token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error during login" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;

    const user = await User.findById(req.user.userId);
    // (console.log(user));
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (user.role === Roles.SUPER_ADMIN) {
      return res.status(401).json({ message: "Not Allowed" });
    }
    const passwordMatch = await bcrypt.compare(newPassword, user.password);
    if (passwordMatch) {
      return res.status(401).json({ message: "Password must be change" });
    }
    user.password = newPassword;
    user.forceResetPassword = true;
    await user.save();
    await sendMail({
      to: user.email,
      html: `<h3>Successfully Update Password :</h3>
        <p>Congrats! ${user.email}</p><p>You Just Successfully Update your password!</p>
        <p>Continue Your services!</p>`,
    });
    res.status(200).json({ message: "Password change successfully", user });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Error updating password" });
  }
};
