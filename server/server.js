const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 4000;
const postModel = require('./model/post');

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

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: false }));
app.use(cors());


app.use(express.static(path.join(__dirname, '../client/build')));

// ======================= Server API URL ====================
// http://localhost:4000/api


// ======================== GET =============================
app.get('/api', (req, res) => {
  res.send({host: 'ahyoung'});
})


// ======================== MongoDB ==========================

// ========================== GET ===========================
app.get('/api/list', (req, res) => {
  db.collection('post').find().toArray((err, rslt) => {
    //res.render('list.ejs', {posts: rslt});
    res.send({posts: rslt});
  })
})

app.get('/api/list/:post_id', (req, res) => {
  const post_id = req.params.post_id;

  db.collection('post').findOne({ _id: post_id }, (err, post) => {
    console.log(post_id, '읽기...')
    if(err){
      console.log(err);
    } else {
      console.log('post: ', post);
    }
  })
})

app.get('/api/input', (req, res) => {
  res.sendFile(__dirname + '/input.html');
})


// ========================= POST ===============================
app.post('/api/post', (req, res) => {
  console.log(req.body);
  const {title, contents} = req.body;

  var post = new postModel();
  post.title = title;
  post.contents = contents;
  console.log(post)
  db.collection('post').insertOne(post, () => {
    console.log('저장완료')
  })
  res.send('post test 성공')
})


// ====================== DELETE ===============================
app.delete('/api/delete/:post_id', (req, res) => {
  const post_id = req.params.post_id;
  console.log(post_id);
  res.send('post delete')
})
// app.delete('/api/delete/:post_id', (req, res) => {
//   const post_id = req.params.post_id;
  
//   postModel.deleteOne({ _id: post_id })
//     .then(output => {
//       if(output.n == 0){
//         return res.status(404).json({message: 'post not found'});
//       }
//       console.log('delete 완료')
//       return res.status(200).json({
//         message: 'delete success'
//       })
//     })
//     .catch(err => {
//       return res.status(500).json({
//         message: err
//       })
//     })
// })

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
})


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})