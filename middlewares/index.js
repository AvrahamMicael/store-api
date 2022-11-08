module.exports = app => {
  require('./notFound')(app);
  require('./errorHandler')(app);
};
