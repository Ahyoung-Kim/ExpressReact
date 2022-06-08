import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';

const SubmitComp = React.memo(({onSubmit}) => (
  <div>
    <button type="button" onClick={onSubmit}>작성완료</button>
  </div>
))

const WritePost = ({apiUrl}) => {
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

  const onSubmit = () => {
    console.log('submit..')
    // axios.post(`${apiUrl}/write`, {
    //   id: 3,
    //   title: title,
    //   contents: contents
    // }).then(res => {console.log(res)})
    const options = {
      method: 'post',
      headers: {
        'Content-Type': "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        id: 3,
        title: title,
        contents: contents
      })
    }
    fetch(`${apiUrl}/write`, options)
      .then(res => {console.log(res)})
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