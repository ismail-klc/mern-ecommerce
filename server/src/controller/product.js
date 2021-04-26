const Product = require("../models/product");
const shortid = require("shortid");
const slugify = require("slugify");
const Category = require("../models/category");

exports.addProduct = (req,res) => {

    const { name, price, description, category, quantity } = req.body;
    let productPictures = [];

    if (req.files.length > 0) {
        productPictures = req.files.map((file) => {
          return { img: file.filename };
        });
      }
    
      const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user._id,
      });
    
      product.save((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
          res.status(201).json({ product, files: req.files });
        }
      });
}

exports.getProducts = async (req,res) => {
  const products = await Product.find()

  return res.status(200).json({products})
}