const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const { get, json } = require('express/lib/response');
const app = express();
const PORT = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());


// ================ GET ==============================
// 호스트 - path: localhost:4000/api
app.get('/api', (req, res) => {
  res.json({host: 'ahyoung'})
})

const users = [
  {id: 1, name: 'kim'},
  {id: 2, name: 'lee'},
  {id: 3, name: 'park'}
]

// 유저 전체 - path: localhost:4000/api/users
app.get('/api/users', (req, res) => {
  res.json({users: users});
})

// 유저 - path: localhost:4000/api/users/:user_id
// path variable  - req.params.user_id
// 쿼리 스트링(?user_id=1) - req.query.user_id
// app.get('/api/users/:user_id', (req, res) => {
//   const user_id = req.params.user_id;
//   const user = users.filter(data => data.id == user_id)
//   res.json({user: user});
// })
app.get('/api/users/user', (req, res) => {
  const user_id = req.query.user_id;
  const user = users.filter(data => data.id == user_id)
  res.json({user: user});
})

// ======================= POST =========================
// app.post('/api/users/post', (req, res) => {
//   const {id, name} = req.body;
//   const newUsers = users.concat({id, name});
//   users = newUsers;
//   res.json({users: newUsers});
// })

// // ======================= DELETE ========================
// app.delete("/api/delete/:user_id", (req, res) => {
//   const user_id = req.params.user_id;
//   const newUsers = users.filter(data => data.id != user_id);
//   users = newUsers;
//   res.json({users: newUsers});
// })


// ====================== 게시글 =============================
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


app.post('/api/write', (req, res) => {
  const {id, title, contents} = req.body;
  posts = posts.concat({id, title, contents});
  res.json({posts: posts});
})

// =============================================================

app.listen(PORT, function(){
  console.log(`Server on ${PORT}`);
})