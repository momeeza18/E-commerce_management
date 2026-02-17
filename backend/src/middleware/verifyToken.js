const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization;
    if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Token missing",
      });
    }

    const token = authHeaders.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      throw new Error();
    }
    req.user = decoded;
    // console.log(decoded)
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Error Validating Token, expried" });
  }
};
