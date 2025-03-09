import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Array from './Topics/array'; // Import Array page
import Sort from "./Topics/sort"; // Import Sort page
import LinkedList from "./Topics/linkedList";
import Tree from "./Topics/tree";
import Graph from "./Topics/graph";
import Background from './components/BackgroundAnimation';


function App() {
  return (
    <Router>
      <Navbar />
      <Background />
    
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/topic/array" element={<Array />} />
        <Route path="/topic/sort" element={<Sort />} />
        <Route path="/topic/linkedlist" element={<LinkedList />} />
        <Route path="/topic/tree" element={<Tree />} />
        <Route path="/topic/graph" element={<Graph />} />
      </Routes>
      
    </Router>

  );
}

export default App;
