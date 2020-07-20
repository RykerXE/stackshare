const { registerUser, checkUserRegistration, userLogin } = require("../../services/user/userService");

const registration = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isUserRegistered = await checkUserRegistration(email);
        if (isUserRegistered) {
            return res.status(200).send("User already registered!");
        }
        const { status, message } = await registerUser({ email, password });
        return res.status(status).send(message);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { status, message } = await userLogin({ email, password });
        return res.status(status).send(message);
    } catch (error) {
        return res.status(500).send("Some error occurred. Please try again");
    }
}

module.exports = {
    registration,
    login,
};
