import React, { useState } from 'react';

const SortingVisualizer = ({ onClose }) => {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [history, setHistory] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');

  const algorithms = {
    bubble: {
      name: 'Bubble Sort',
      python: `def bubbleSort(arr):
    n = len(arr)
    for i in range(n-1):
        for j in range(n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`,
      'c++': `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
}`,
      java: `void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}`
    },
    selection: {
      name: 'Selection Sort',
      python: `def selectionSort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
      'c++': `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        int min_idx = i;
        for (int j = i+1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        swap(arr[min_idx], arr[i]);
    }
}`,
      java: `void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n-1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}`
    },
    insertion: {
      name: 'Insertion Sort',
      python: `def insertionSort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i-1
        while j >= 0 and arr[j] > key:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = key
    return arr`,
      'c++': `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
      java: `void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`
    }
  };

  const generateSteps = (inputArray) => {
    const steps = [];
    const arr = [...inputArray];
    const n = arr.length;
    const history = [];

    // Different sorting algorithms implementation
    if (selectedAlgorithm === 'bubble') {
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          steps.push({ 
            array: [...arr], 
            i, 
            j, 
            highlightLine: 4,
            action: `Comparing elements at positions ${j} and ${j + 1}`
          });
          history.push(`Step ${steps.length}: Comparing ${arr[j]} and ${arr[j + 1]}`);

          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            steps.push({ 
              array: [...arr], 
              i, 
              j, 
              highlightLine: 5,
              action: `Swapped elements ${arr[j]} and ${arr[j + 1]}`
            });
            history.push(`Step ${steps.length}: Swapped ${arr[j + 1]} and ${arr[j]}`);
          }
        }
        steps.push({ 
          array: [...arr], 
          i, 
          j: null, 
          highlightLine: 3,
          action: `Completed pass ${i + 1}`
        });
        history.push(`Step ${steps.length}: Completed pass ${i + 1}`);
      }
    } else if (selectedAlgorithm === 'selection') {
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        steps.push({
          array: [...arr],
          i,
          j: null,
          highlightLine: 3,
          action: `Starting new pass from index ${i}`
        });
        history.push(`Step ${steps.length}: Starting new pass from index ${i}`);

        for (let j = i + 1; j < n; j++) {
          steps.push({
            array: [...arr],
            i,
            j,
            highlightLine: 4,
            action: `Comparing ${arr[j]} with current minimum ${arr[minIdx]}`
          });
          history.push(`Step ${steps.length}: Comparing ${arr[j]} with ${arr[minIdx]}`);

          if (arr[j] < arr[minIdx]) {
            minIdx = j;
            steps.push({
              array: [...arr],
              i,
              j,
              highlightLine: 5,
              action: `Found new minimum ${arr[minIdx]} at index ${minIdx}`
            });
            history.push(`Step ${steps.length}: New minimum is ${arr[minIdx]}`);
          }
        }

        if (minIdx !== i) {
          [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
          steps.push({
            array: [...arr],
            i,
            j: minIdx,
            highlightLine: 6,
            action: `Swapped ${arr[i]} to position ${i}`
          });
          history.push(`Step ${steps.length}: Swapped ${arr[i]} to position ${i}`);
        }
      }
    } else if (selectedAlgorithm === 'insertion') {
      for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        
        steps.push({
          array: [...arr],
          i,
          j: i,
          highlightLine: 2,
          action: `Selected ${key} as key`
        });
        history.push(`Step ${steps.length}: Selected ${key} as key`);

        while (j >= 0 && arr[j] > key) {
          steps.push({
            array: [...arr],
            i,
            j,
            highlightLine: 4,
            action: `Comparing ${arr[j]} with key ${key}`
          });
          history.push(`Step ${steps.length}: Comparing ${arr[j]} with key ${key}`);

          arr[j + 1] = arr[j];
          steps.push({
            array: [...arr],
            i,
            j,
            highlightLine: 5,
            action: `Moved ${arr[j]} one position ahead`
          });
          history.push(`Step ${steps.length}: Moved ${arr[j]} one position ahead`);
          j--;
        }

        arr[j + 1] = key;
        steps.push({
          array: [...arr],
          i,
          j: j + 1,
          highlightLine: 7,
          action: `Inserted ${key} at position ${j + 1}`
        });
        history.push(`Step ${steps.length}: Inserted ${key} at position ${j + 1}`);
      }
    }

    steps.push({ 
      array: [...arr], 
      i: null, 
      j: null, 
      highlightLine: null,
      action: "Sorting completed"
    });
    history.push(`Step ${steps.length}: Sorting completed`);

    return { steps, history };
  };

  const startVisualization = (input) => {
    const newArray = input.split(",").map(Number);
    if (newArray.some(isNaN)) {
      alert("Please enter valid numbers separated by commas");
      return;
    }
    const { steps: newSteps, history: newHistory } = generateSteps(newArray);
    setSteps(newSteps);
    setHistory(newHistory);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const lastStep = () => {
    setCurrentStep(steps.length - 1);
  };

  return (
    <div className="sorting-visualizer">
      <div className="visualizer-overlay" onClick={onClose}></div>
      <div className="visualizer-content">
        <div className="left-section">
          <h2>Sorting Visualization</h2>
          <div className="input-section">
            <div className="select-container">
              <label htmlFor="algorithmSelect">Select Algorithm: </label>
              <select 
                id="algorithmSelect"
                value={selectedAlgorithm}
                onChange={(e) => setSelectedAlgorithm(e.target.value)}
                className="algorithm-select"
              >
                <option value="bubble">Bubble Sort</option>
                <option value="selection">Selection Sort</option>
                <option value="insertion">Insertion Sort</option>
              </select>
            </div>
            <label htmlFor="arrayInput">Enter Array (comma-separated): </label>
            <input 
              type="text" 
              id="arrayInput" 
              placeholder="e.g., 64,34,25,12,22,11,90"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  startVisualization(e.target.value);
                }
              }}
            />
            <button onClick={(e) => startVisualization(e.target.previousElementSibling.value)}>
              Start
            </button>
          </div>
          
          <div className="array-display">
            {steps[currentStep]?.array.map((value, index) => (
              <div 
                key={index}
                className={`array-element ${
                  index === steps[currentStep]?.j || 
                  index === steps[currentStep]?.j + 1 ? 'highlight' : ''
                }`}
              >
                {value}
              </div>
            ))}
          </div>

          <div className="controls">
            <button onClick={prevStep}>Prev</button>
            <button onClick={nextStep}>Next</button>
            <button onClick={lastStep}>Last Step</button>
          </div>

          <div className="variable-display">
            <h3>Current Variables:</h3>
            <p>i: {steps[currentStep]?.i ?? 'N/A'}</p>
            <p>j: {steps[currentStep]?.j ?? 'N/A'}</p>
            <p>Current Action: {steps[currentStep]?.action ?? 'N/A'}</p>
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
        </div>

        <div className="right-section">
          <h2>Code Display</h2>
          <div className="select-container">
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="language-select"
            >
              <option value="python">Python</option>
              <option value="c++">C++</option>
              <option value="java">Java</option>
            </select>
          </div>
          <div className="code-box">
            {algorithms[selectedAlgorithm][selectedLanguage].split('\n').map((line, index) => (
              <div 
                key={index}
                className={`code-line ${
                  steps[currentStep]?.highlightLine === index + 1 ? 'highlight' : ''
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

export default SortingVisualizer; 