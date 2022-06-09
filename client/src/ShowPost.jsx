import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ShowPost = ({apiUrl}) => {
  const params = useParams();
  const [post, setPost] = useState({});

  useEffect(()=>{
    console.log('params: ', params)
    axios.get(`${apiUrl}/post/${params.post_id}`)
      .then(res => res.data.post)
      .then(data => {
        console.log(data[0])
        setPost(data[0])
      })
  }, []);


  if(!params.post_id){
    return (
      <div>잘못된 접근입니다.</div>
    )
  }
  return (
    <>
      <h1>제목: {post.title}</h1>
      <hr />
      <p>
        {post.contents}
      </p>
    </>
  );
};

export default ShowPost;