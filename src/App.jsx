import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Array from "./components/Elements/Topics/Array/array";
import Sort from "./components/Elements/Topics/Sort/sort";
import LinkedList from "./components/Elements/Topics/LinkedList/linkedList";
import Tree from "./components/Elements/Topics/Tree/tree";
import Graph from "./components/Elements/Topics/Graph/graph";
import Background from './components/Common/BackgroundAnimation';

const ScrollToTop = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Background />
      <div className="app-container">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/topic/array" element={<Array />} />
            <Route path="/topic/sort" element={<Sort />} />
            <Route path="/topic/linkedlist" element={<LinkedList />} />
            <Route path="/topic/tree" element={<Tree />} />
            <Route path="/topic/graph" element={<Graph />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
