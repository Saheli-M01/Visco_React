import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaPlay, FaPause, FaStepForward, FaRedo, FaTimes } from 'react-icons/fa';

const LinkedListVisualizer = ({ operation, onClose, isVisible }) => {
    const [inputValue, setInputValue] = useState('');
    const [speed, setSpeed] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(-1);
    const [steps, setSteps] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const createSteps = (values) => {
        const newSteps = values.map((value, index) => ({
            nodes: values.slice(0, index + 1).map((v, i) => ({
                value: v,
                prev: i > 0 ? values[i - 1] : null,
                next: i < index ? values[i + 1] : null,
                isHighlighted: i === index
            }))
        }));
        // Add final step with no highlighting
        newSteps.push({
            nodes: values.map((v, i) => ({
                value: v,
                prev: i > 0 ? values[i - 1] : null,
                next: i < values.length - 1 ? values[i + 1] : null,
                isHighlighted: false
            }))
        });
        return newSteps;
    };

    const handleStart = () => {
        if (!inputValue.trim()) return;
        
        const values = inputValue.split(',')
            .map(v => v.trim())
            .filter(v => v !== '')
            .map(v => parseInt(v))
            .filter(v => !isNaN(v));

        if (values.length === 0) return;

        const newSteps = createSteps(values);
        setSteps(newSteps);
        setCurrentStep(0);
        setIsPlaying(true);
    };

    const handleSpeedChange = (e) => {
        setSpeed(parseFloat(e.target.value));
    };

    const handlePlayPause = () => {
        if (currentStep === -1) {
            handleStart();
        } else {
            setIsPlaying(!isPlaying);
        }
    };

    const handleReset = () => {
        setCurrentStep(-1);
        setIsPlaying(false);
        setSteps([]);
    };

    const handleStepForward = () => {
        if (currentStep === -1) {
            handleStart();
        } else if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
            setIsPlaying(false);
        }
    };

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

    const renderNodes = () => {
        if (!steps[currentStep]) return null;
        
        return (
            <div className="list-display">
                {steps[currentStep].nodes.map((node, index) => (
                    <div key={index} className="node-container">
                        <div className={`node ${node.isHighlighted ? 'highlight' : ''}`}>
                            <div className="node-content">
                                <div className="prev-part">
                                    <div className="prev-label">Prev</div>
                                    <div className="prev-box">
                                        <span className="prev-value">{node.prev !== null ? node.prev : 'null'}</span>
                                    </div>
                                </div>
                                <div className="data-part">
                                    <div className="data-label">Data</div>
                                    <div className="data-box">
                                        <span className="data-value">{node.value}</span>
                                    </div>
                                </div>
                                <div className="next-part">
                                    <div className="next-label">Next</div>
                                    <div className="next-box">
                                        <span className="next-value">{node.next !== null ? node.next : 'null'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {index < steps[currentStep].nodes.length - 1 && (
                            <div className="node-pointer">
                                <div className="pointer-line"></div>
                                <span className="pointer-arrow">▶</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
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
                    <div className="input-group">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Enter comma-separated numbers (e.g., 1,2,3,4)"
                            className="number-input"
                        />
                        <button onClick={handleStart} className="action-button">
                            Start
                        </button>
                    </div>

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
                    {renderNodes()}
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

LinkedListVisualizer.propTypes = {
    operation: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
};

export default LinkedListVisualizer; 