const Router = require('express-promise-router')
const controller = require("./shareController");


module.exports = () => {
    const router = Router({ mergeParams: true });

    router.route(`/list`)
        .get(controller.listAllShares);
    
    router.route(`/user/list`)
        .get(controller.listUserShares);

    router.route(`/buy`)
        .post(controller.buyShare);

    return router;
};