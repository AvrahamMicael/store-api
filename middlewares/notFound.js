module.exports = app => {
  app.use((req, res) => res.status(404).send('Route does not exist'));
};
