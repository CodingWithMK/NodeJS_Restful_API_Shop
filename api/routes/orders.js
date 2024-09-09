const express = require('express');
const router = express.Router();

// Handling incoming GET requests to /orders
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched'
    });
});

router.post('/', (req, res, next) => {
    // Create a new order
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Orders were created'
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order details',
        id: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted order',
        id: req.params.orderId
    });
});

module.exports = router;