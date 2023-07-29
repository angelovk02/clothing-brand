const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { itemController } = require('../controllers');



router.get('/hoodies', itemController.findHoodies);
router.get('/pants', itemController.findPants);
router.get('/t-shirts', itemController.findTshirts);



router.post('/', auth(), itemController.addItem);
router.post('/cart', auth(), itemController.addToCart)

router.get('/cart', auth(), itemController.findUserItems)

router.delete('/cart/:itemId', auth(), itemController.removeFromCartHandler)
router.delete('/:itemId', auth(), itemController.deleteItem)

router.put('/cart/placeOrder', auth(), itemController.placeOrder)
router.put('/:itemId', auth(), itemController.updateItem)







module.exports = router