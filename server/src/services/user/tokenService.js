const { signPayload, verifyAndDecodeToken } = require("../../utils/jwtHelper");

const secret = "0xwfdwiko9%$sds&*9^";

const generateToken = (object) => {
    const signOptions = {
        expiresIn: 60 * 60 * 12,//config.expireTokenIn,
        algorithm: "HS256"//config.signingAlgorithm,
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
        algorithms: "HS256"//[config.signingAlgorithm],
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
