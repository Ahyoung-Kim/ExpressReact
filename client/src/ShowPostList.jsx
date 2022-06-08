import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ShowPostList = ({apiUrl}) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async() => {
    const response = await axios.get(`${apiUrl}/posts`);
    console.log(response.data.posts)
    setPosts(response.data.posts);
  }

  useEffect(()=>{
    getPosts();
  }, []);

  const navigate = useNavigate();
  const showPost = (e) => {
    const post_id = e.target.id;
    navigate(`/post/${post_id}`);
  }
  const goWrite = () => {
    navigate('/write');
  }

  return (
    <>
      <div>
        <button type="button" onClick={goWrite}>글 작성</button>
      </div>
      <ul>
        {posts.map(post => (
          <li id={post.id} key={post.id} onClick={showPost}>
            {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ShowPostList;