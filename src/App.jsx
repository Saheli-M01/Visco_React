import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Array from './Topics/array';
import Sort from "./Topics/sort";
import LinkedList from "./Topics/linkedList";
import Tree from "./Topics/tree";
import Graph from "./Topics/graph";
import Background from './components/BackgroundAnimation';

const ScrollToTop = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [window.location.pathname]);

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
            <Route path="/" element={<Main />} />
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
