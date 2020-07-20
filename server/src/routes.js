const express  = require("express");
const apiRouter = express.Router();

const authRoutes = require("./routes/auth/authRoutes");


apiRouter
    .use("/auth", authRoutes());

module.exports = apiRouter;