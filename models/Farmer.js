const mongoose = require("mongoose")

const farmerSchema = new mongoose.Schema({
    farmerName: {
        type: String,
        required: true
    },
    farmerPhone: {
        type: String, 
        required: true
    },
    farmerEmail: {
        type: String
    },
    farmerAddress: {
        type: String,
        required: true
    },
    comments: {
        type: Array
    }

})

const Farmer = mongoose.model('Farmer', farmerSchema)

module.exports = Farmer