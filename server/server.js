const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const pino = require("pino");
const socketIo = require("socket.io");
require("dotenv").config();

const Shares = require("./src/models/Shares");
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

const server = http.createServer(app);
const io = socketIo(server);

let interval;

const emitSharesList = async socket => {
    const options = {
        page:  1,
        limit: 10,
    };
    const aggregate = Shares.aggregate();
    const data = await Shares.aggregatePaginate(aggregate, options);
    socket.emit("sharesList", data);
  }

io.on("connection", (socket) => {
    logger.info("New client connected" + socket.id);

    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => emitSharesList(socket), 3000);

    socket.on("disconnect", () => {
        logger.info("Client disconnected");
        clearInterval(interval);
    });
});

server.listen(PORT, () => logger.info(`Listening on PORT ${PORT}`));
//app.listen(PORT, () => logger.info(`Application Server started and running on port ${PORT}`));
