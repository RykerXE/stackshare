require("dotenv").config();
const { MongoClient } = require("mongodb");

(async () => {
    try {
        const nativeClient = await MongoClient.connect(process.env.DB_URI, { useNewUrlParser: true , useUnifiedTopology: true });
        global.stack = { nativeClient };
        console.log('Job Started')
        const { startJob } = require("./src/job");
        await startJob();

        console.log('Job done');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();