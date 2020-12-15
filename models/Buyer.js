const mongoose = require("mongoose")

const buyerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String, 
        required: true
    },
    email: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    currentBids: {
        type: Array
    },
    previousPurchases: {
        type: Array
    },
    notifications: {
        type: Array
    }

})

const Buyer = mongoose.model('Buyer', buyerSchema)

module.exports = Buyer