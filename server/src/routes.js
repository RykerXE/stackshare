const express  = require("express");
const apiRouter = express.Router();

const authRoutes = require("./routes/auth/authRoutes");
const shareRoutes = require("./routes/shares/shareRoutes");

apiRouter
    .use("/auth", authRoutes())
    .use("/shares", shareRoutes());

module.exports = apiRouter;