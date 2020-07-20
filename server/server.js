const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const pino = require("pino");
require("dotenv").config();

const apiRoutes = require("./src/routes");

const { PORT, DB_URI, NODE_ENV } = process.env;

//Initialize logger
const logger = NODE_ENV === "development" ? pino({
    prettyPrint: {
        colorize: true,
        translateTime: true,
        crlf: true,
    },
}) : pino();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};
mongoose.connect(DB_URI, mongooseOptions);
const db = mongoose.connection;

db.on("error", (error) => {
    logger.error("Connection to database failed", error);
});
db.once("open", async () => {
    logger.info("Connected to database successfully");
});

app.get(`/healthcheck`, (req, res) => {
    res.status(200).send("Server up and running...");
});
app.use(`/api`, apiRoutes);

app.listen(PORT, () => logger.info(`Application Server started and running on port ${PORT}`));