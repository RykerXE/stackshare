const express  = require("express");
const apiRouter = express.Router();

const authRoutes = require("./routes/auth/authRoutes");
const shareRoutes = require("./routes/shares/shareRoutes");
const { authMiddleware } = require("./middlewares/authMiddleware");

apiRouter
    .use("/auth", authRoutes())
    .use("/shares", authMiddleware, shareRoutes());

module.exports = apiRouter;