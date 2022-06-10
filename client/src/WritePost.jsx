import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitComp = React.memo(({onSubmit}) => (
  <div>
    <button type="button" onClick={onSubmit}>작성완료</button>
  </div>
))

const WritePost = ({ newId, setNewId, posts, setPosts, apiUrl }) => {
  const [inputs, setInputs] = useState({
    title: '',
    contents: ''
  })
  const titleInput = useRef();
  const contentsInput = useRef();

  const {title, contents} = inputs;

  useEffect(()=>{
    titleInput.current.focus();
  }, []);

  const onChange = (e) => {
    const {value, name} = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  const onKeyUp = (e) => {
    if(e.key === 'Enter'){
      contentsInput.current.focus();
    }
  }

  const getID = async() => {
    const res = await axios.get(`${apiUrl}/get/postid`)
    console.log('id: ', res.data.id);
    setNewId(res.data.id);
  }

  const newPost = async() => {
    const body = {
      title: title,
      contents: contents
    }

    console.log(body);

    const res = await axios.post(`${apiUrl}/post`, body);
    console.log('res.data: ', res.data);

    setPosts(posts.concat(res.data));
    //setNewId(newId + 1);
  }

  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  }
  const onSubmit = () => {
    newPost();
    goHome();
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder='제목을 입력해주세요...'
          value={title}
          name="title"
          onChange={onChange}
          ref={titleInput}
          onKeyUp={onKeyUp}
         />
      </div>
      <div>
        <textarea
          cols="30"
          rows="10"
          value={contents}
          name="contents"
          onChange={onChange}
          ref={contentsInput}
        />
      </div>

      <SubmitComp onSubmit={onSubmit} />
    </>
  );
};

export default WritePost;