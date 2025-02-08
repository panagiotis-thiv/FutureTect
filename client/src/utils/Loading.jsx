import React from 'react';
import '../assets/styles/Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <img src="/house1.gif" alt="Loading..." className="loading-gif" />
    </div>
  );
};

export default Loading;