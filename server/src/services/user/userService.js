const { get } = require("lodash");

const UserRegistration = require("../../models/UserRegistration");
const { hash, compare } = require("../../utils/hashHelper");
const { generateToken } = require("./tokenService");

const checkUserRegistration = async (email) => {
    const userDetails = await UserRegistration.findOne({ email }).lean();
    if (userDetails) {
        return true;
    }
    return false;
};

const verifyPassword = async (email, password) => {
    const userDetails = await UserRegistration.findOne({ email });
    const hashedPassword = get(userDetails, "password");
    const isPasswordValid = await compare(password, hashedPassword);
    return isPasswordValid;
};

const registerUser = async registrationData => {
    try {
        const { email, password } = registrationData;
        const hashedPassword = await hash(password);
        const newRegistration = new UserRegistration({ email, password: hashedPassword });
        await newRegistration.save();
        return { status: 200, message: "User successfully registered. Please proceed to log-in" };
    } catch (error) {
        console.error(error);
    }
};

const userLogin = async userData => {
    const { email, password } = userData;
    const validPassword = await verifyPassword(email, password);
    if (!validPassword) {
        return {
            status: 403,
            message: "Username or password incorrect! Please check"
        };
    }
    const token = generateToken({ email });
    return {
        status: 200,
        message: token
    };
};

module.exports = {
    checkUserRegistration,
    registerUser,
    userLogin,
}