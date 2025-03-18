import React, { useState, useEffect } from 'react';
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
import { ToastProvider } from './components/Common/ToastContext';
import BackToTop from './components/Common/BackToTop';
import KeyboardNav from './components/Common/KeyboardNav';
import LoadingSpinner from './components/Common/LoadingSpinner';
import KeyboardShortcuts from './components/Common/KeyboardShortcuts';
import KeyboardInfo from './components/Common/KeyboardInfo';

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
      <BackToTop />
      <KeyboardInfo />
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner size="large" />;
  }

  return (
    <Router>
      <ToastProvider>
        <KeyboardNav />
        <KeyboardShortcuts />
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
      </ToastProvider>
    </Router>
  );
}

export default App;
