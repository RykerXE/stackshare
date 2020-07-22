
const Shares = require("../../models/Shares");
const { buyShareService } = require("../../services/shares/shareService");

const listAllShares = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const options = {
            page: page || 1,
            limit: limit || 10,
        };
        const aggregate = Shares.aggregate();
        const data = await Shares.aggregatePaginate(aggregate, options);
        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send(error.stack);
    }
};

const listUserShares = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const email = "test123";
        const options = {
            page: page || 1,
            limit: limit || 10,
        };
        const aggregate = Shares.aggregate([
            {
                $match: {
                    currentHolder: email
                },
            },
        ]);
        const data = await Shares.aggregatePaginate(aggregate, options);
        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send(error.stack);
    }
};

const buyShare = async (req, res) => {
    try {
        const { shareId } = req.body;
        const email = "test123";
        const { status, message } = await buyShareService(shareId, email);
        return res.status(status).send(message);
    } catch (error) {
        return res.status(500).send(error.stack);
    }
}

module.exports = {
    listAllShares,
    listUserShares,
    buyShare,
};
