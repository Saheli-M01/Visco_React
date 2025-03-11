import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaPlay, FaPause, FaStepForward, FaRedo, FaTimes } from 'react-icons/fa';

const GraphVisualizer = ({ operation, onClose, isVisible }) => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [visitedNodes, setVisitedNodes] = useState(new Set());
    const [currentNode, setCurrentNode] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(-1);

    const canvasRef = useRef(null);
    const nodeRadius = 20;
    const colors = {
        node: '#6b46c1',
        edge: '#4a5568',
        visited: '#48bb78',
        current: '#ed64a6',
        text: '#ffffff'
    };

    const createGraph = () => {
        // Create a sample graph with 6 nodes in a circular layout
        const newNodes = [];
        const newEdges = [];
        const nodeCount = 6;
        const centerX = canvasRef.current.width / 2;
        const centerY = canvasRef.current.height / 2;
        const radius = Math.min(centerX, centerY) - nodeRadius - 20;

        // Create nodes
        for (let i = 0; i < nodeCount; i++) {
            const angle = (i * 2 * Math.PI) / nodeCount;
            newNodes.push({
                id: i,
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle)
            });
        }

        // Create edges (sample connections)
        const connections = [
            [0, 1], [0, 2], [1, 3], [2, 3],
            [2, 4], [3, 5], [4, 5]
        ];

        connections.forEach(([from, to]) => {
            newEdges.push({ from, to });
        });

        setNodes(newNodes);
        setEdges(newEdges);
        return { nodes: newNodes, edges: newEdges };
    };

    const generateSteps = () => {
        const newSteps = [];
        const visited = new Set();
        
        if (operation.id === 'dfs') {
            const dfs = (nodeId) => {
                visited.add(nodeId);
                newSteps.push({
                    visited: new Set(visited),
                    current: nodeId
                });

                const neighbors = edges
                    .filter(edge => edge.from === nodeId)
                    .map(edge => edge.to);

                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        dfs(neighbor);
                    }
                }
            };

            dfs(0);
        } else if (operation.id === 'bfs') {
            const queue = [0];
            visited.add(0);
            newSteps.push({
                visited: new Set(visited),
                current: 0
            });

            while (queue.length > 0) {
                const nodeId = queue.shift();

                const neighbors = edges
                    .filter(edge => edge.from === nodeId)
                    .map(edge => edge.to);

                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push(neighbor);
                        newSteps.push({
                            visited: new Set(visited),
                            current: neighbor
                        });
                    }
                }
            }
        }

        setSteps(newSteps);
        setCurrentStep(0);
        setIsPlaying(true);
    };

    const drawGraph = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // Draw edges
        edges.forEach(({ from, to }) => {
            const fromNode = nodes[from];
            const toNode = nodes[to];
            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            ctx.lineTo(toNode.x, toNode.y);
            ctx.strokeStyle = colors.edge;
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        // Draw nodes
        nodes.forEach((node, index) => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
            
            if (currentNode === index) {
                ctx.fillStyle = colors.current;
            } else if (visitedNodes.has(index)) {
                ctx.fillStyle = colors.visited;
            } else {
                ctx.fillStyle = colors.node;
            }
            
            ctx.fill();
            ctx.stroke();

            // Draw node number
            ctx.fillStyle = colors.text;
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(index.toString(), node.x, node.y);
        });
    };

    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.width = 600;
            canvasRef.current.height = 400;
            createGraph();
            drawGraph();
        }
    }, []);

    useEffect(() => {
        if (canvasRef.current) {
            drawGraph();
        }
    }, [nodes, edges, visitedNodes, currentNode]);

    useEffect(() => {
        let timer;
        if (isPlaying && currentStep < steps.length - 1) {
            timer = setTimeout(() => {
                setCurrentStep(prev => prev + 1);
            }, 1000 / speed);
        } else if (currentStep >= steps.length - 1) {
            setIsPlaying(false);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, currentStep, steps, speed]);

    useEffect(() => {
        if (currentStep >= 0 && steps[currentStep]) {
            setVisitedNodes(steps[currentStep].visited);
            setCurrentNode(steps[currentStep].current);
        }
    }, [currentStep]);

    const handleStart = () => {
        setVisitedNodes(new Set());
        setCurrentNode(null);
        setCurrentStep(-1);
        generateSteps();
    };

    const handlePlayPause = () => {
        if (currentStep === -1) {
            handleStart();
        } else {
            setIsPlaying(!isPlaying);
        }
    };

    const handleStepForward = () => {
        if (currentStep === -1) {
            handleStart();
        } else if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
            setIsPlaying(false);
        }
    };

    const handleReset = () => {
        setVisitedNodes(new Set());
        setCurrentNode(null);
        setCurrentStep(-1);
        setIsPlaying(false);
    };

    const handleSpeedChange = (e) => {
        setSpeed(parseFloat(e.target.value));
    };

    return (
        <div className={`visualizer-container ${isVisible ? 'visible' : ''}`}>
            <div className="visualizer-header">
                <h2>{operation.name}</h2>
                <button className="close-btn" onClick={onClose}>
                    <FaTimes />
                </button>
            </div>
            
            <div className="visualizer-content">
                <div className="controls-section">
                    <div className="speed-control">
                        <label>Speed:</label>
                        <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={speed}
                            onChange={handleSpeedChange}
                            className="speed-slider"
                        />
                    </div>

                    <div className="visualization-controls">
                        <button onClick={handlePlayPause} className="control-button">
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                        <button onClick={handleStepForward} className="control-button">
                            <FaStepForward />
                        </button>
                        <button onClick={handleReset} className="control-button">
                            <FaRedo />
                        </button>
                    </div>
                </div>

                <div className="visualization-area">
                    <canvas ref={canvasRef} />
                </div>

                <div className="code-section">
                    <div className="code-container">
                        <pre>
                            <code>{operation.code}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

GraphVisualizer.propTypes = {
    operation: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
};

export default GraphVisualizer; 