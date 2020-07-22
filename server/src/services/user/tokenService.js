const { signPayload, verifyAndDecodeToken } = require("../../utils/jwtHelper");

const { SECRET: secret, JWT_ALGORITHM: algorithm } = process.env;

const generateToken = (object) => {
    const signOptions = {
        expiresIn: 60 * 60 * 12,
        algorithm,
    };
    Object.freeze(signOptions);

    return signPayload(
        object,
        secret,
        signOptions,
    );
};

const decodeToken = (token) => {
    const decodeOptions = {
        algorithms: algorithm,
    };
    return verifyAndDecodeToken(
        token,
        secret,
        decodeOptions,
    );
};

module.exports = {
    generateToken,
    decodeToken,
};
