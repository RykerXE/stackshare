const { get } = require("lodash");

const Shares = require("../../models/Shares");

const buyShareService = async (shareId, user) => {
    try {
        const isShareAvailable = checkShareAvailabilityStatus(shareId);
        if (isShareAvailable) {
            await Shares.updateOne({ shareId },{
                $set: {
                    isAvailable: false,
                    currentHolder: user,
                    lastSoldAt: new Date(),
                },
            });
            return {
                status: 200,
                message: `${shareId} brought successfully`,
            }
        }
        return {
            status: 200,
            message: `${shareId} is already sold`,
        }
    } catch (error) {
        return {
            status: 500,
            message: error,
        }
    }
}

const checkShareAvailabilityStatus = async shareId => {
    try {
        const shareDetails = await Shares.findOne({ shareId });
        const isAvailable = get(shareDetails, "isAvailable", false);
        return isAvailable;
    } catch (error) {
        return error;
    }
}

module.exports = {
    buyShareService,
};
