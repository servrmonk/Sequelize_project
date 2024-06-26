const db = require("../models");

// create main model
const Product = db.products;
const Review = db.reviews;

//Main Word

//1. Create product
const addProduct = async (req, res) => {
  let info = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };
  try {
    const product = await Product.create(info);
    res.status(200).send(product);
    console.log("Product created ", product);
  } catch (err) {
    res.status(500).send({ message: "Unable to create the product" });
    console.log("Error in creating the product");
  }
};

//2. get all products
const getAllProducts = async (req, res) => {
  let products = await Product.findAll({
    // attributes: ["title", "price"], comment if u want all the info
  });
  res.status(200).send(products);
};

//3. get single product

const getOneProduct = async (req, res) => {
  let urlId = req.params.id;
  let product = await Product.findOne({ where: { id: urlId } });
  res.status(200).send(product);
};

// 4. update the product
const updateProduct = async (req, res) => {
  let urlId = req.params.id;
  const product = await Product.update(req.body, { where: { id: urlId } });
  res.status(200).send(product);
};

// 5. delete product by id
const deleteProduct = async (req, res) => {
  let id = req.params.id;
  await Product.destroy({ where: { id: id } });
  res.status(200).send({ message: "Product is deleted" });
};

// 6. get published product

const getPublishedProduct = async(req,res)=>{
    const products = await Product.findAll({where:{published:true}})
    res.status(200).send(products)
}


module.exports = { addProduct, getAllProducts, getOneProduct, updateProduct ,deleteProduct,getPublishedProduct};
