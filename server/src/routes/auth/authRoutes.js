const Router = require('express-promise-router')
const controller = require("./authController");


module.exports = () => {
    const router = Router({ mergeParams: true })

    router.route(`/register`)
        .post(controller.registration);

    router.route(`/login`)
        .post(controller.login);

    return router;
};
