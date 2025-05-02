const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
dotenv.config();
const port = process.env.PORT || 5000;
const { connectDB } = require("./config/dbConnect");

// Routes Imports
const authRoutes = require("./routes/authRoutes");
const linkRoutes = require("./routes/linkRoutes");

// App Initilization
const app = express();

// DB Connection
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello, this is express.js backend for devLinks",
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/link", linkRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`.blue.underline);
});
