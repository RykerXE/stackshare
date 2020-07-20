
const jwt = require("jsonwebtoken");

const verifyAndDecodeToken = (
    token,
    secretOrKey,
    options,
) => jwt.verify(
    token,
    secretOrKey,
    options,
);

const signPayload = (
    payload,
    secretOrKey,
    options,
) => jwt.sign(
    payload,
    secretOrKey,
    options,
);

module.exports = {
    verifyAndDecodeToken,
    signPayload,
};