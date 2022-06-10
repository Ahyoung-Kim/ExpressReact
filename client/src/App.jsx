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
  const [posts, setPosts] = useState([]);

  const sendRequest = async() => {
    const res = await axios.get('http://localhost:4000/api/');
  }

  useEffect(()=>{
    sendRequest();
  }, []);

  return (
    <div>
      <Header />

      <section>
        <Routes>
          <Route path="/" element={<ShowPostList allPost={posts} apiUrl={apiUrl} />} />
          <Route path='/write' element={<WritePost posts={posts} setPosts={setPosts} apiUrl={apiUrl} />} />
          <Route path="/post/:post_id" element={<ShowPost apiUrl={apiUrl} />} />
        </Routes>
      </section>
      
      <Footer />
    </div>
  );
};

export default App;
