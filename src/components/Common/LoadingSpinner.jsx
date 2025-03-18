import React from 'react';
import '../../styles/CommonStyle/_loading.scss';

const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => {
  return (
    <div className={`loading-spinner ${size} ${color}`}>
      <div className="spinner-ring"></div>
      <div className="spinner-text">Loading...</div>
    </div>
  );
};

export default LoadingSpinner; 