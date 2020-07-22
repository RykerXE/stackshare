const express  = require("express");
const apiRouter = express.Router();

const authRoutes = require("./routes/auth/authRoutes");
const shareRoutes = require("./routes/shares/shareRoutes");
const userRoutes = require("./routes/user/userRoutes");
const { authMiddleware } = require("./middlewares/authMiddleware");

apiRouter
    .use("/auth", authRoutes())
    .use("/shares", authMiddleware, shareRoutes())
    .use(`/user`, authMiddleware, userRoutes());

module.exports = apiRouter;