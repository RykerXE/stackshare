const { decodeToken } = require("../services/user/tokenService");

const authMiddleware = (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        res.status(400).send("Token not supplied!");
    }
    const decoded = decodeToken(token);
    if (decoded) {
        req["email"] = decoded.email;
        next();
    } else {
        res.status(403).send("Unauthorized access! This event will be logged.")
    }
};

module.exports = {
    authMiddleware,
};
