import React, { useState, useEffect } from "react";
import "../styles/Topics/_treeVisualizer.scss";

const TreeVisualizer = ({ operation, onClose }) => {
  const [input, setInput] = useState('');
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [history, setHistory] = useState([]);
  const ANIMATION_SPEED = 1000;

  class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  const createBinaryTree = (values) => {
    if (!values.length) return null;
    const nodes = values.map(val => val === null ? null : new TreeNode(val));
    const root = nodes[0];
    
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i] !== null) {
        const leftIndex = 2 * i + 1;
        const rightIndex = 2 * i + 2;
        if (leftIndex < nodes.length) nodes[i].left = nodes[leftIndex];
        if (rightIndex < nodes.length) nodes[i].right = nodes[rightIndex];
      }
    }
    
    return root;
  };

  const bfs = (root) => {
    if (!root) return [];
    const steps = [];
    const queue = [root];
    const visited = new Set();
    
    while (queue.length > 0) {
      const node = queue.shift();
      if (visited.has(node)) continue;
      
      visited.add(node);
      steps.push({
        visited: new Set(visited),
        current: node,
        queue: [...queue],
        description: `Visiting node ${node.value}`
      });
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    return steps;
  };

  const dfs = (root) => {
    const steps = [];
    const visited = new Set();
    
    const traverse = (node) => {
      if (!node) return;
      
      visited.add(node);
      steps.push({
        visited: new Set(visited),
        current: node,
        description: `Visiting node ${node.value}`
      });
      
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    
    traverse(root);
    return steps;
  };

  const startVisualization = () => {
    const values = input.split(',').map(val => {
      const num = val.trim();
      return num === 'null' ? null : parseInt(num);
    });

    const root = createBinaryTree(values);
    const visualizationSteps = operation.id === 'bfs' ? bfs(root) : dfs(root);
    
    setSteps(visualizationSteps);
    setCurrentStep(0);
    setHistory([]);
    setIsPlaying(false);
  };

  useEffect(() => {
    let timer;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setHistory(prev => [...prev, steps[currentStep].description]);
      }, ANIMATION_SPEED);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps]);

  const togglePlay = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
      setHistory([]);
    }
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setCurrentStep(0);
    setHistory([]);
    setIsPlaying(false);
  };

  const renderTree = () => {
    if (!steps.length) return null;
    
    const currentNode = steps[currentStep]?.current;
    const visitedNodes = steps[currentStep]?.visited || new Set();
    
    const renderNode = (node) => {
      if (!node) return null;
      
      const isVisited = visitedNodes.has(node);
      const isCurrent = node === currentNode;
      
      return (
        <div className={`tree-node ${isVisited ? 'visited' : ''} 
          ${isCurrent ? 'current' : ''} 
          ${node.left ? 'has-left' : ''} 
          ${node.right ? 'has-right' : ''}`}>
          {node.value}
        </div>
      );
    };
    
    return renderNode(steps[0]?.current);
  };

  return (
    <div className="tree-visualizer">
      <div className="visualizer-overlay" onClick={onClose}></div>
      <div className="visualizer-content">
        <div className="left-section">
          <h2>Tree Visualization</h2>
          <div className="input-section">
            <label>Enter values (comma-separated):</label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 1,2,3,null,4"
            />
            <button onClick={startVisualization}>
              Start Visualization
            </button>
          </div>
          <div className="tree-display">
            {renderTree()}
          </div>
          <div className="controls">
            <button onClick={togglePlay}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button onClick={reset}>Reset</button>
          </div>
          <div className="history">
            <h3>Steps History</h3>
            {history.map((step, index) => (
              <div
                key={index}
                className={`step ${index === currentStep ? 'current' : ''}`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>
        <div className="right-section">
          <h2>Code Implementation</h2>
          <div className="language-selector">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="c++">C++</option>
              <option value="java">Java</option>
            </select>
          </div>
          <pre>
            <code>{operation.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default TreeVisualizer; 