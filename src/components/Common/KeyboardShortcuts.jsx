import React, { useState, useEffect } from 'react';
import '../../styles/CommonStyle/_keyboardShortcuts.scss';

const KeyboardShortcuts = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === '?') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="keyboard-shortcuts-overlay">
      <div className="keyboard-shortcuts-content">
        <div className="shortcuts-header">
          <h2>Keyboard Shortcuts</h2>
          <button onClick={() => setIsVisible(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="shortcuts-list">
          <div className="shortcut-item">
            <span className="key">h</span>
            <span className="description">Go to Home</span>
          </div>
          <div className="shortcut-item">
            <span className="key">a</span>
            <span className="description">Go to Arrays</span>
          </div>
          <div className="shortcut-item">
            <span className="key">s</span>
            <span className="description">Go to Sorting</span>
          </div>
          <div className="shortcut-item">
            <span className="key">l</span>
            <span className="description">Go to Linked List</span>
          </div>
          <div className="shortcut-item">
            <span className="key">t</span>
            <span className="description">Go to Trees</span>
          </div>
          <div className="shortcut-item">
            <span className="key">g</span>
            <span className="description">Go to Graphs</span>
          </div>
          <div className="shortcut-item">
            <span className="key">?</span>
            <span className="description">Show/Hide this menu</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcuts; 