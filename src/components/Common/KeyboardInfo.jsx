import React from 'react';
import '../../styles/CommonStyle/_keyboardInfo.scss';

const KeyboardInfo = () => {
  return (
    <div className="keyboard-info">
      <div className="keyboard-info-content">
        <i className="fa-solid fa-keyboard"></i>
        <span>Press <kbd>?</kbd></span>
      </div>
    </div>
  );
};

export default KeyboardInfo; 