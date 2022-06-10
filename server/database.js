require('dotenv').config();
const { DBURL } = process.env;

const mongoose = require('mongoose');

let db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('MongoDB is connected');
})

mongoose.connect(DBURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

module.exports = mongoose;