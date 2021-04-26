const slugify = require('slugify')
const Cart = require('../models/cart')
const shortid = require('shortid')

exports.addToCart = async (req, res) => {
    
}

exports.getCart = async (req, res) => {
    const userId = req.user._id
    let cart = await Cart.find({user: userId})

    if (cart) {
        return res.status(200).json({ cart })
    }
    else {
        return res.status(204).json({ message: 'no cart' })
    }
}