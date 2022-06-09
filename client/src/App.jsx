import React, { useState, useEffect } from 'react';
import Header from './Header';
import WritePost from './WritePost';
import ShowPostList from './ShowPostList';
import ShowPost from './ShowPost';
import Footer from './Footer';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

const apiUrl = 'http://localhost:4000/api'

const App = () => {
  const [newId, setNewId] = useState(3);
  const [posts, setPosts] = useState([]);

  const postRequest = async() => {
    const body = {
      age: 20,
      name: 'ahyoung'
    }
    const res = await axios.post('http://localhost:4000/api/post', body);
  }

  const sendRequest = async() => {
    const res = await axios.get('http://localhost:4000/api/');
  }

  useEffect(()=>{
    sendRequest();
    postRequest();
  }, []);

  return (
    <div>
      <Header />

      <section>
        <Routes>
          <Route path="/" element={<ShowPostList allPost={posts} apiUrl={apiUrl} />} />
          <Route path='/write' element={<WritePost newId={newId} setNewId={setNewId} posts={posts} setPosts={setPosts} apiUrl={apiUrl} />} />
          <Route path="/post/:post_id" element={<ShowPost apiUrl={apiUrl} />} />
        </Routes>
      </section>
      
      <Footer />
    </div>
  );
};

export default App;
