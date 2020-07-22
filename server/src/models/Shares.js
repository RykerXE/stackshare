const mongoose = require("mongoose");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const { Schema } = mongoose;

const SharesSchema = new Schema({
    companyName: {
        type: String,
        required: true,
    },
    companyId: {
        type: String,
        index: true,
        required: true,
    },
    shareType: {
        type: String,
    },
    shareId: {
        type: String,
        index: true,
        required: true,
    },
    shareValue: {
        type: Number,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true
    },
    currentHolder: String,
    createdAt: Date,
    lastSoldAt: Date,
    shareValueUpdatedAt: Date,
}, {
    timestamps: false,
});

SharesSchema.plugin(aggregatePaginate);

const Shares = mongoose.model("shares", SharesSchema);
module.exports = Shares;
