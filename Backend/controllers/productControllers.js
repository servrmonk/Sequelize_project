const db = require("../models");

// create main model
const Product = db.products;
const Review = db.reviews;

const multer = require("multer");
const path = require("path");

//Main Work

//1. Create product
const addProduct = async (req, res) => {
  let info = {
    image:req.file.path,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };
  try {
    const product = await Product.create(info);
    res.status(201).send(product);
    console.log("Product created ", product);
  } catch (err) {
    res.status(500).send({ message: "Unable to create the product" });
    console.log("Error in creating the product");
  }
};

//2. get all products
const getAllProducts = async (req, res) => {
  console.log("Inside getAllProducts");
  let products = await Product.findAll({});
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

const getPublishedProduct = async (req, res) => {
  const products = await Product.findAll({ where: { published: true } });
  res.status(200).send(products);
};

// 7. Connect one to many relations Product and Reviews

const getProductReviews = async (req, res) => {
  const id = req.params.id; //for dynamic
  try {
    const data = await Product.findOne({
      include: [
        {
          model: Review,
          as: "review",
        },
      ],
      where: { id: id },
    });

    console.log("Data ===========> ", data);
    res.status(201).send(data);
  } catch (err) {
    console.log("Error is ", err);
    res.status(500).send({ error: "error in getting productreviews" });
  }
};

// 8. Upload image , using image controller
const storage = multer.diskStorage({
  //diskstorage need 2 thing one is destination where image will go req,file and callback fun  in callback null means no error filename is unique date.now() + path.extname(file.originalname) like 21/2/2022.png and 2nd arg of callback is Images (foldername where all image will be there ) here i put all the image where we put and give whichever updload a .  and 2nd thing  means 2nd arg of diskStorage is filename
  destination: (req, file, cb) => {
    cb(null, "Image");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" }, //limits file size in kb that is 1mb u can put 5,10 anything
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimType = fileTypes.test(file.mimetype); //checking the format
    const extname = fileTypes.test(path.extname(file.originalname)); //if both are matched

    if (mimType && extname) {
      return cb(null, true);
    }
    cb("Give proper files format to upload");
  },
  }).single('image') //for api to call this is same as model image means single image u can also pass multiple image like 
// }).array('images',3)

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getPublishedProduct,
  getProductReviews,upload
};
