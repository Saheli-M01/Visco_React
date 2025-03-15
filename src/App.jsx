import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
};

const PageWrapper = ({ children }) => {
  return (
    <div className="app-container">
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Background />
      <Routes>
        <Route path="/" element={<PageWrapper><Layout /></PageWrapper>} />
        <Route path="/topic/array" element={<PageWrapper><Array /></PageWrapper>} />
        <Route path="/topic/sort" element={<PageWrapper><Sort /></PageWrapper>} />
        <Route path="/topic/linkedlist" element={<PageWrapper><LinkedList /></PageWrapper>} />
        <Route path="/topic/tree" element={<PageWrapper><Tree /></PageWrapper>} />
        <Route path="/topic/graph" element={<PageWrapper><Graph /></PageWrapper>} />
      </Routes>
    </Router>
  );
}

export default App;
