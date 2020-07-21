const Router = require('express-promise-router')
const controller = require("./shareController");


module.exports = () => {
    const router = Router({ mergeParams: true });

    router.route(`/list`)
        .get(controller.listAllShares);

    return router;
};