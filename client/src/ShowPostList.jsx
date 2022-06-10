import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ShowPostList = ({ allPost, apiUrl }) => {
  const [posts, setPosts] = useState([]);

  const getDBPosts = async() => {
    const res = await axios.get(`${apiUrl}/list`);
    console.log('db get: ', res.data.posts);
    setPosts(res.data.posts)
  }

  useEffect(()=>{
    getDBPosts();
  }, []);

  const navigate = useNavigate();
  const showPost = (e) => {
    const post_id = e.target.id;
    navigate(`/post/${post_id}`);
  }
  const goWrite = () => {
    navigate('/write');
  }

  const onDelete = (e) => {
    const post_id = e.target.id;

    axios.delete(`${apiUrl}/delete/${post_id}`)
      .then(res => {console.log(res)});
  }

  return (
    <>
      <div>
        <button type="button" onClick={goWrite}>글 작성</button>
      </div>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <span id={post._id} onClick={showPost}>{post.title}</span>
            <button id={post._id} type='button' onClick={onDelete}>삭제</button>
          </li>
        ))}
      </ul>
      {/* <p>======================================</p>
      <ul>
        {allPost.map(post => (
          <li id={post.id} key={post.id} onClick={showPost}>
            {post.title}
          </li>
        ))}
      </ul> */}
    </>
  );
};

export default ShowPostList;