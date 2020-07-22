const Promise = require('bluebird');
const moment = require("moment");
const _ = require('lodash');


const { nativeClient } = global.stack;

const startJob = async () => {
    const Share = nativeClient.db("nucleus").collection("shares");

    const companyList = ["STACKFINANCE", "XSNTECH", "GOOGLE", "SHRAMM", "ICICIBANK", "EMFLUXMOTORS"];
    const shareTypes = ["equity", "cash", "promoter"];

    try {
        for await (const company of companyList) {
            const companyId = _.truncate(company, {length : 3, omission: ''});
            const noTotalShare = Math.floor(Math.random() * 10) + 5;
            const companyShareList = [];
            for (let idx = 0; idx <= noTotalShare; idx++) {
                companyShareList.push({
                    companyName: company,
                    shareType: _.sample(shareTypes),
                    shareId: _.toLower(`${companyId}${Math.random().toString(20).substr(2, 6)}`),
                    shareValue: _.round(_.random(10, 500, true), 2),
                    companyId,
                    isAvailable: true,
                    createdAt: new Date(),
                });
            }
            await Promise.map(companyShareList, async share => {
                const { shareId } = share;
                await Share.updateOne({ shareId }, {
                    $set: share
                }, { upsert: true });
            }, { concurrency: 25 });
        }
    } catch(error) {
        console.error(error);
    }
};

module.exports = {
    startJob
};
