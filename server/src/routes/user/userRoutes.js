const Router = require('express-promise-router')
const controller = require("./userController");


module.exports = () => {
    const router = Router({ mergeParams: true });

    router.route(`/getuser`)
        .post(controller.getUser);

    return router;
};
