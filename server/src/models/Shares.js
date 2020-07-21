const mongoose = require("mongoose");

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
    currentHolder: Object,
    createdAt: Date,
    lastSoldAt: Date,
    shareValueUpdatedAt: Date,
}, {
    timestamps: false,
});

const Shares = mongoose.model("shares", SharesSchema);
module.exports = Shares;
