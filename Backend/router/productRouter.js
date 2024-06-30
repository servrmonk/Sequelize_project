const productController = require('../controllers/productControllers')
const reviewController = require('../controllers/reviewControllers')
const router = require('express').Router();

/* Product Routes */
// router.get('/allReviews',reviewController.getAllReviews);

router.post('/addProduct',productController.upload, productController.addProduct);
router.get('/allProducts',productController.getAllProducts);
router.get('/published',productController.getPublishedProduct);


/* Review Router */
router.get('/allReviews',reviewController.getAllReviews);
router.post('/addReview/:id',reviewController.addReview);

/* Get product review*/
router.get('/getProductReviews/:id',productController.getProductReviews)

/* PARAMS ROUTES */
router.get('/:id',productController.getOneProduct);
router.put('/:id',productController.updateProduct);
router.delete('/:id',productController.deleteProduct);

module.exports = router