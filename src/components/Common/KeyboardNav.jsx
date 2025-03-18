import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext';

const KeyboardNav = () => {
  const navigate = useNavigate();
  const { showInfo } = useToast();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only trigger if not in an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key) {
        case 'h':
          navigate('/');
          showInfo('Navigated to Home', 2000);
          break;
        case 'a':
          navigate('/topic/array');
          showInfo('Navigated to Arrays', 2000);
          break;
        case 's':
          navigate('/topic/sort');
          showInfo('Navigated to Sorting', 2000);
          break;
        case 'l':
          navigate('/topic/linkedlist');
          showInfo('Navigated to Linked Lists', 2000);
          break;
        case 't':
          navigate('/topic/tree');
          showInfo('Navigated to Trees', 2000);
          break;
        case 'g':
          navigate('/topic/graph');
          showInfo('Navigated to Graphs', 2000);
          break;
        case '?':
          showInfo(
            'Keyboard Navigation: h (Home), a (Arrays), s (Sort), l (Linked List), t (Tree), g (Graph)',
            5000
          );
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate, showInfo]);

  return null;
};

export default KeyboardNav; 