const express = require('express');
const connectDB = require('./db/connect');
const app = express();

require('express-async-errors');

require('./routes')(app);
require('./middlewares')(app);

const port = process.env.PORT || 3000;

(async () => {
  try
  {
    await connectDB();
    app.listen(port, console.log(`Server listening on port ${ port }`));
  }
  catch(error)
  {
    console.log(error);
  }
})();
