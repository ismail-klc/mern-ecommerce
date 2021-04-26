const slugify = require('slugify')
const Cart = require('../models/cart')
const shortid = require('shortid')

exports.addToCart = async (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: `${slugify(req.body.name)}-${shortid.generate()}`,
        createdBy: req.user._id,
    };

    if (req.file) {
        categoryObj.categoryImage = "/public/" + req.file.filename;
    }

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }

    const category = new Category(categoryObj);
    await category.save()
    
    if (category) {
        if (category.parentId) {
            const parent = await Category.findOne({ _id: req.body.parentId })
            parent.children.push(category._id)
            parent.save()
        }
        return res.status(201).json({ category });
    }
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