const mongoose = require('mongoose')

const produceSchema = new mongoose.Schema({
    produceName: {
        type: String
    },
    askingPrice: {
        type: Number
    },
    currentPrice: {
        type: Number
    },
    currentBidder: {
        type: mongoose.Schema.Types.ObjectId
    },
    origin: {
        type: String
    },
    desc: {
        type: String
    },
    organic: {
        type: Boolean,
        default: false
    },
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
    }
})

const Produce = mongoose.model("Produce", produceSchema)

module.exports = Produce