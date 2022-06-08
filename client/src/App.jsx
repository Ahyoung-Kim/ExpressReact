import React, { useState, useEffect } from 'react';
import Header from './Header';
import WritePost from './WritePost';
import ShowPostList from './ShowPostList';
import ShowPost from './ShowPost';
import Footer from './Footer';
import { Routes, Route } from 'react-router-dom';

const apiUrl = 'http://localhost:4000/api'

const App = () => {

  return (
    <div>
      <Header />

      <section>
        <Routes>
          <Route path="/" element={<ShowPostList apiUrl={apiUrl} />} />
          <Route path='/write' element={<WritePost apiUrl={apiUrl} />} />
          <Route path="/post/:post_id" element={<ShowPost apiUrl={apiUrl} />} />
        </Routes>
      </section>
      
      <Footer />
    </div>
  );
};

export default App;
