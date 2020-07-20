const UserRegistration = require("../../models/UserRegistration");


const checkUserRegistration = async (email) => {
    const userDetails = await UserRegistration.findOne({ email }).lean();
    if (userDetails) {
        return true;
    }
    return false;
};


const registerUser = async registrationData => {
    try {
        const { email, password } = registrationData;
        const newRegistration = new UserRegistration({ email, password });
        await newRegistration.save();
        return { status: 200, message: "User successfully registered. Please proceed to log-in" };
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    checkUserRegistration,
    registerUser,
}