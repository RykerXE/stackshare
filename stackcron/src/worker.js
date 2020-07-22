const _ = require("lodash");
const Promise = require("bluebird");

const { nativeClient } = global.stack;
const Shares = nativeClient.db("nucleus").collection("shares");

const startJob = async () => {
    try {
        const sharesList = await Shares.find({}).toArray();
        await Promise.map(sharesList, async share => {
            const { shareId } = share;
            const shareValue = _.round(_.random(10, 500, true), 2);
            const response = await Shares.updateOne({ shareId }, {
                $set: {
                    shareValue,
                },
            });
            if (response.modifiedCount === 1) {
                console.log(`${shareId} updated for value ${shareValue}`);
            }
        }, { concurrency: 5 });

    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    startJob,
};
