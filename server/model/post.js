const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    _id: String,
    title: String,
    contents: String,
    data: { type: Date, default: Date.now }
  },
  { versionKey: "_somethingElse" }
)

module.exports = mongoose.model('post', postSchema);