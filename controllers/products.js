const Product = require('../models/Product');

module.exports = {
  getAllProducts: async (req, res) => {
    res.json({ msg: 'products route' });
  },
  
  getAllProductsStatic: async ({ query }, res) => {
    const { name, featured, company, sort, fields, numericFilters } = query;
    const queryObj = {};
    if(name) queryObj.name = { $regex: name, $options: 'i' };
    if(featured) queryObj.featured = featured == 'true';
    if(company) queryObj.company = company;
    if(numericFilters)
    {
      const operators = {
        '>': '$gt',
        '>=': '$gte',
        '=': '$eq',
        '<': '$lt',
        '<=': '$lte',
      };
      const options = [ 'price', 'rating' ];
      numericFilters.replace(/\b(<|>|>=|=|<|<=)\b/g, match => `-${operators[match]}-`)
        .split(',')
        .forEach(item => {
          const [ field, operator, value ] = item.split('-');
          if(options.includes(field)) queryObj[field] = { [operator]: Number(value) };
        });
    }

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find(queryObj)
      .sort((sort ?? '').replace(',', ' '))
      .select((fields ?? '').replace(',', ' '))
      .skip(skip)
      .limit(limit);
    return res.json(products);
  },
};
