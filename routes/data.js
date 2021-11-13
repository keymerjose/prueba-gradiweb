const { Router } = require('express');
const router = Router();

const Shopify = require('../models/shopify');
const shopify = new Shopify();

router.get('/', async(req, res = Response) => {
    const a = await shopify.getData();
    res.send(a);
});

module.exports = router;