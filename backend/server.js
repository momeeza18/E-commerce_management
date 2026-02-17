const express = require("express");
const cors = require("cors");
const sendMail = require("./src/sendEmail");
const connectDb = require("./src/db");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", userRoutes);
app.get("/send", sendMail);

const startServer = async () => {
  try {
    await connectDb();
    console.log("DB Connected");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to startServer server:", error.message);
    process.exit(1);
  }
};
startServer();
