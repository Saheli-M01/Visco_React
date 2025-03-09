import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Array from './Topics/array'; // Import Array page
import Sort from "./components/sort";
import LinkedList from "./components/linkedList";
import Tree from "./components/tree";
import Graph from "./components/graph";
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
