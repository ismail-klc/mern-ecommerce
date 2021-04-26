const slugify = require('slugify')
const Category = require('../models/category')
const shortid = require('shortid')

exports.addCategory = async (req, res) => {
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

exports.getCategories = async (req, res) => {
    let categories = await Category.find()

    if (categories) {
        return res.status(200).json({ categories })
    }
    else {
        return res.status(204).json({ message: 'no category' })
    }
}

exports.updateCategory = async (req,res) => {
    
}