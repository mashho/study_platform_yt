const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/you-clone')
  .then(() => console.log('DB connection successful!'));
