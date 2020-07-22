const Users = require("../../models/Users");

const getUser = async (req, res) => {
    try {
        const { email } = req;
        const response = await Users.findOne({ email }).lean();
        res.status(200).send({
            email: response.email,
            name: response.name,
        })
    } catch (error) {
        res.status(500).send(error.stack);
    }
};

module.exports = {
    getUser,
};
