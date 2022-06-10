const mongoose = require('mongoose');

const pwd = 'zkscydusen314!';
const url = `mongodb+srv://ahyoung:${pwd}@post.stk6lf7.mongodb.net/?retryWrites=true&w=majority`;

let db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('MongoDB is connected');
})

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

module.exports = mongoose;