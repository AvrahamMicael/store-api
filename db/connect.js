require('dotenv').config();
const { connect } = require('mongoose')

module.exports = () => connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
