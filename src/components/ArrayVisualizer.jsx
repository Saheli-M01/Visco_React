import React, { useEffect } from 'react';
import '../styles/Components/_arrayVisualizer.scss';

const ArrayVisualizer = ({
  array,
  steps,
  history,
  currentStep,
  setCurrentStep,
  isPlaying,
  setIsPlaying,
  speed,
  setSpeed,
  code,
  onClose
}) => {
  useEffect(() => {
    let intervalId;
    if (isPlaying && currentStep < steps.length - 1) {
      intervalId = setInterval(() => {
        setCurrentStep(prev => {
          if (prev === steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, currentStep, steps.length, speed, setCurrentStep, setIsPlaying]);

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="array-visualizer">
      <div className="visualizer-overlay" onClick={onClose}></div>
      <div className="visualizer-content">
        <div className="left-section">
          <div className="array-display">
            <div className="array-container">
              {Array.isArray(array[0]) ? (
                // 2D array display
                array.map((row, i) => (
                  <div key={i} className="array-row">
                    {row.map((value, j) => (
                      <div
                        key={j}
                        className={`array-element ${
                          steps[currentStep]?.highlightIndices.includes(i * row.length + j)
                            ? 'highlight'
                            : ''
                        }`}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                // 1D array display
                <div className="array-row">
                  {array.map((value, index) => (
                    <div
                      key={index}
                      className={`array-element ${
                        steps[currentStep]?.highlightIndices.includes(index) ? 'highlight' : ''
                      }`}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="control-section">
            <div className="control-buttons">
              <button onClick={prevStep} disabled={currentStep === 0}>Previous</button>
              <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
              <button onClick={nextStep} disabled={currentStep === steps.length - 1}>Next</button>
            </div>

            <div className="speed-control">
              <label>Speed: </label>
              <input
                type="range"
                min="100"
                max="1000"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
              />
            </div>

            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100 || 0}%` }}
              ></div>
            </div>
          </div>

          <div className="step-history">
            <h4>Step History:</h4>
            <div className="history-list">
              {history.slice(0, currentStep + 1).map((step, index) => (
                <div
                  key={index}
                  className={`history-item ${index === currentStep ? 'current' : ''}`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="right-section">
          <h2>Code Implementation</h2>
          <div className="code-box">
            {code.split('\n').map((line, index) => (
              <div
                key={index}
                className={`code-line ${
                  steps[currentStep]?.lineNumber === index + 1 ? 'highlight' : ''
                }`}
              >
                <span className="line-number">{index + 1}</span>
                <span className="line-content">{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualizer; 