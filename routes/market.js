const {auth} = require('../middleware/auth')
const express = require('express')

const Farmer = require('../models/Farmer')
const Buyer = require('../models/Buyer')
const Produce = require('../models/Produce')
const router = express.Router()

router.post('/market/newProduce', auth, (req, res) => {
    try {
        const { produceName, askingPrice, origin, desc, organic } = req.body;
        const farmer = req.user._id

        const newProduce = new Produce({
            produceName, askingPrice, origin, desc, organic, farmer
        })

        await newProduce.save()

        res.status(200).send(newProduce)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/market/allProduce', async (req, res) => {
    const allProduce = await Produce.find()

    if(allProduce){
        res.status(200).send(allProduce)
    }else{
        res.status(404).send({"message": "No produce found"})
    }
})

router.post('/market/:id/newBid', async (req, res) => {
    const bidProduce = await Produce.findOne({ _id: req.params._id })
    const {bid} = req.body

    bidProduce.currentPrice = bid
    bidProduce.currentBidder = req.user._id

    await bidProduce.save()

    res.status(200).send(bidProduce)
})