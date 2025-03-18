import React, { useEffect } from 'react';
import '../../styles/CommonStyle/_toast.scss';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast ${type}`}>
      <div className="toast-content">
        <i className={`toast-icon ${getIconClass(type)}`}></i>
        <span className="toast-message">{message}</span>
      </div>
      <button className="toast-close" onClick={onClose}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

const getIconClass = (type) => {
  switch (type) {
    case 'success':
      return 'fa-solid fa-circle-check';
    case 'error':
      return 'fa-solid fa-circle-exclamation';
    case 'warning':
      return 'fa-solid fa-triangle-exclamation';
    case 'info':
    default:
      return 'fa-solid fa-circle-info';
  }
};

export default Toast; 