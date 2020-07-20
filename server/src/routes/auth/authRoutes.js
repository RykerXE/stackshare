const Router = require('express-promise-router')
const controller = require("./authController");


module.exports = () => {
    const router = Router({ mergeParams: true })

    router.route(`/register`)
        .post(controller.registration);

    return router;
};
