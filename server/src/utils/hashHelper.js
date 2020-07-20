const bcrypt = require("bcrypt");

const hash = async (data, saltRounds = 10) => {
    const hashedData = await bcrypt.hash(data, saltRounds);
    return hashedData;
};

const compare = async (data, hashedData) => {
    const areEqual = await bcrypt.compare(data, hashedData);
    return areEqual;
};

module.exports = {
    hash,
    compare,
};
