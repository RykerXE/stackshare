
const Shares = require("../../models/Shares");

const listAllShares = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const data = await Shares.aggregate().skip((page - 1) * limit).limit(limit);
        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send(error.stack);
    }
};

module.exports = {
    listAllShares,
};
