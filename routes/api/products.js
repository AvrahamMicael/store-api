const { getAllProducts, getAllProductsStatic } = require('../../controllers/products');

module.exports = app => {
  const router = require('express').Router();

  router.route('/')
    .get(getAllProducts);

  router.get('/static', getAllProductsStatic);

  app.use('/api/v1/products', router);
};
