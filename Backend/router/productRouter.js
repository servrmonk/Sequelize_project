const productController = require('../controllers/productControllers')
const reviewController = require('../controllers/reviewControllers')
const router = require('express').Router();

/* Product Routes */
// router.get('/allReviews',reviewController.getAllReviews);

router.post('/addProduct',productController.addProduct);
router.get('/allProducts',productController.getAllProducts);
router.get('/published',productController.getPublishedProduct);


/* Review Router */
router.post('/addReview',reviewController.addReview);
router.get('/allReviews',reviewController.getAllReviews);

/* Get product review*/
router.get('/getProductReviews',productController.getProductReviews)

/* PARAMS ROUTES */
router.get('/:id',productController.getOneProduct);
router.put('/:id',productController.updateProduct);
router.delete('/:id',productController.deleteProduct);

module.exports = router