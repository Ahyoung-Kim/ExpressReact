import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  }

  return (
    <>
      <h1 onClick={goHome}>My Blog</h1>
    </>
  );
};

export default React.memo(Header);