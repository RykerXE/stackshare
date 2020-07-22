require("dotenv").config();
const cron = require("node-cron");
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

const callAPI = async () => {
    try {
        const nativeClient = await MongoClient.connect(process.env.DB_URI, { useNewUrlParser: true , useUnifiedTopology: true });
        global.stack = { nativeClient };
        console.log('Job Started')
        const { startJob } = require("./src/worker.js");
        await startJob();

        console.log('Job done');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

//callAPI();
cron.schedule("*/10 * * * * *", async () => {
    console.log("Running Cron Job");
    await callAPI();
});

app.listen(8000, () => console.log("CRON to update share value started..."));