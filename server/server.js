const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 4000;

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

const posts = [
  {
    id: 1,
    title: "제목1",
    contents: "본문1"
  },
  {
    id: 2,
    title: "제목2",
    contents: "본문2"
  }
]

app.get('/api/posts', (req, res) => {
  res.json({posts: posts});
})

app.get('/api/post/:post_id', (req, res) => {
  const post_id = req.params.post_id;
  const post = posts.filter(data => data.id == post_id);
  res.json({post: post});
})

let id = 3;

app.get('/api/get/postid', (req, res) => {
  const post_id = id;
  res.json({id: post_id});
})

// ======================= POST ============================
app.post('/api/post', (req, res) => {
  console.log('서버에서 post 성공! : ', req.body);
  res.json(req.body);
})

app.post('/api/newpost', (req, res) => {
  console.log('서버에서 포스팅: ', req.body);
  id += 1;
  res.json(req.body);
})

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
})


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})