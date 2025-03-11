import React, { useState, useEffect } from "react";
import "../styles/Topics/_arrayVisualizer.scss";

const ArrayVisualizer = ({ operation, onClose }) => {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [history, setHistory] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [inputValue, setInputValue] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  
  // New state variables for 1D array inputs
  const [sizeInput, setSizeInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  
  // New state variables for 2D array inputs
  const [rowsInput, setRowsInput] = useState('');
  const [colsInput, setColsInput] = useState('');
  const [elementsInput, setElementsInput] = useState('');

  // Add new state for preview
  const [previewGrid, setPreviewGrid] = useState(null);

  // New state variables for matrix multiplication
  const [matrix1Rows, setMatrix1Rows] = useState('');
  const [matrix1Cols, setMatrix1Cols] = useState('');
  const [matrix2Rows, setMatrix2Rows] = useState('');
  const [matrix2Cols, setMatrix2Cols] = useState('');
  const [matrix1Elements, setMatrix1Elements] = useState('');
  const [matrix2Elements, setMatrix2Elements] = useState('');

  const algorithms = {
    create1d: {
      name: 'Create 1D Array',
      javascript: operation.code,
      python: `def create_1d_array(size, value=0):
    # Create new array of given size
    arr = [None] * size
    # Fill array with specified value
    for i in range(size):
        arr[i] = value
    return arr`,
      'c++': `void create1DArray(int size, int value = 0) {
    // Create new array of given size
    int* arr = new int[size];
    // Fill array with specified value
    for(int i = 0; i < size; i++) {
        arr[i] = value;
    }
    return arr;
}`
    },
    create2d: {
      name: 'Create 2D Array',
      javascript: operation.code,
      python: `def create_2d_array(rows, cols, value=0):
    # Create array of rows
    arr = [[None] * cols for _ in range(rows)]
    # Fill each position with value
    for i in range(rows):
        for j in range(cols):
            arr[i][j] = value
    return arr`,
      'c++': `int** create2DArray(int rows, int cols, int value = 0) {
    // Create array of rows
    int** arr = new int*[rows];
    // Create columns for each row
    for(int i = 0; i < rows; i++) {
        arr[i] = new int[cols];
        // Fill each column with value
        for(int j = 0; j < cols; j++) {
            arr[i][j] = value;
        }
    }
    return arr;
}`
    },
    multiply: {
      name: 'Multiply Arrays',
      javascript: operation.code,
      python: `def multiply_arrays(arr1, arr2):
    # Check if arrays have same length
    if len(arr1) != len(arr2):
        return None  # Arrays must be same length
    # Multiply corresponding elements
    result = [0] * len(arr1)
    for i in range(len(arr1)):
        result[i] = arr1[i] * arr2[i]
    return result`,
      'c++': `vector<int> multiplyArrays(vector<int>& arr1, vector<int>& arr2) {
    // Check if arrays have same length
    if(arr1.size() != arr2.size()) {
        return vector<int>();  // Arrays must be same length
    }
    // Multiply corresponding elements
    vector<int> result(arr1.size());
    for(int i = 0; i < arr1.size(); i++) {
        result[i] = arr1[i] * arr2[i];
    }
    return result;
}`
    },
    insert: {
      name: 'Insert Element',
      javascript: operation.code,
      python: `def insert_element(arr, value, index):
    # Check if index is valid
    if index < 0 or index > len(arr):
        return arr  # Invalid index
    # Insert element at specified index
    arr.insert(index, value)
    return arr`,
      'c++': `void insertElement(vector<int>& arr, int value, int index) {
    // Check if index is valid
    if(index < 0 || index > arr.size()) {
        return;  // Invalid index
    }
    // Insert element at specified index
    arr.insert(arr.begin() + index, value);
}`
    },
    delete: {
      name: 'Delete Element',
      javascript: operation.code,
      python: `def delete_element(arr, index):
    # Check if index is valid
    if index < 0 or index >= len(arr):
        return arr  # Invalid index
    # Delete element at specified index
    del arr[index]
    return arr`,
      'c++': `void deleteElement(vector<int>& arr, int index) {
    // Check if index is valid
    if(index < 0 || index >= arr.size()) {
        return;  // Invalid index
    }
    // Delete element at specified index
    arr.erase(arr.begin() + index);
}`
    },
    search: {
      name: 'Search Element',
      javascript: operation.code,
      python: `def search_element(arr, target):
    # Search for target in array
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Found at index i
    return -1  # Not found`,
      'c++': `int searchElement(vector<int>& arr, int target) {
    // Search for target in array
    for(int i = 0; i < arr.size(); i++) {
        if(arr[i] == target) {
            return i;  // Found at index i
        }
    }
    return -1;  // Not found
}`
    },
    update: {
      name: 'Update Element',
      javascript: operation.code,
      python: `def update_element(arr, index, value):
    # Check if index is valid
    if index < 0 or index >= len(arr):
        return arr  # Invalid index
    # Update element at specified index
    arr[index] = value
    return arr`,
      'c++': `void updateElement(vector<int>& arr, int index, int value) {
    // Check if index is valid
    if(index < 0 || index >= arr.size()) {
        return;  // Invalid index
    }
    // Update element at specified index
    arr[index] = value;
}`
    }
  };

  useEffect(() => {
    let timer;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);

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

  const firstStep = () => {
    setCurrentStep(0);
  };

  const togglePlay = () => {
    if (steps.length <= 1) return;
    setIsPlaying(!isPlaying);
  };

  const startVisualization = (input) => {
    if (operation.id === 'create1d') {
      const size = parseInt(sizeInput);
      const values = valueInput.split(',').map(Number);
      if (isNaN(size)) {
        alert('Please enter a valid size');
        return;
      }
      if (values.length !== size || values.some(isNaN)) {
        alert(`Please enter ${size} valid numbers separated by commas`);
        return;
      }
      const result = generateSteps1D(size, values);
      setSteps(result.steps);
      setHistory(result.history);
      setCurrentStep(0);
      setSizeInput('');
      setValueInput('');
    } else if (operation.id === 'create2d') {
      const rows = parseInt(rowsInput);
      const cols = parseInt(colsInput);
      const values = elementsInput.split(',').map(Number);
      if (isNaN(rows) || isNaN(cols)) {
        alert('Please enter valid numbers for rows and columns');
        return;
      }
      if (values.length !== rows * cols || values.some(isNaN)) {
        alert(`Please enter ${rows * cols} valid numbers for the array elements`);
        return;
      }
      const result = generateSteps2D(rows, cols, values);
      setSteps(result.steps);
      setHistory(result.history);
      setCurrentStep(0);
      setElementsInput('');
    } else if (operation.id === 'multiply') {
      const result = generateStepsMultiply(matrix1Elements.split(',').map(Number), matrix2Elements.split(',').map(Number));
      setSteps(result.steps);
      setHistory(result.history);
      setCurrentStep(0);
      setInputValue('');
    } else {
      const values = input.split(',').map(Number);
      if (values.some(isNaN)) {
        alert('Please enter valid numbers separated by commas');
        return;
      }

      let result;
      if (operation.id === 'multiply') {
        const secondInput = prompt('Enter the second array (comma-separated numbers):');
        if (!secondInput) return;
        const arr2 = secondInput.split(',').map(Number);
        if (arr2.some(isNaN)) {
          alert('Please enter valid numbers for the second array');
          return;
        }
        result = generateStepsMultiply(values, arr2);
      } else {
        result = generateStepsOperation(values, operation.id);
      }

      setSteps(result.steps);
      setHistory(result.history);
      setCurrentStep(0);
      setInputValue('');
    }
  };

  const generateSteps1D = (size, values) => {
    const steps = [];
    const history = [];
    let finalArray = [];

    steps.push({
      array: [],
      highlightIndices: [],
      action: 'Starting array creation',
      lineNumber: 1,
      variables: { size }
    });
    history.push('Starting array creation');

    finalArray = new Array(size).fill(undefined);
    steps.push({
      array: [...finalArray],
      highlightIndices: [],
      action: `Created array of size ${size}`,
      lineNumber: 2,
      variables: { size, i: 'N/A' }
    });
    history.push(`Created array of size ${size}`);

    for (let i = 0; i < size; i++) {
      finalArray[i] = values[i];
      steps.push({
        array: [...finalArray],
        highlightIndices: [i],
        action: `Setting index ${i} to ${values[i]}`,
        lineNumber: 4,
        variables: { size, i, value: values[i] },
        comparing: false,
        copying: true
      });
      history.push(`Setting index ${i} to ${values[i]}`);
    }

    steps.push({
      array: [...finalArray],
      highlightIndices: [],
      action: 'Array creation completed',
      lineNumber: 6,
      variables: { size, i: size }
    });
    history.push('Array creation completed');

    return { steps, history, finalArray };
  };

  const generateSteps2D = (rows, cols, values) => {
    const steps = [];
    const history = [];
    let finalArray = [];

    steps.push({
      array: [],
      highlightIndices: [],
      action: 'Starting 2D array creation',
      lineNumber: 1,
      variables: { rows, cols }
    });
    history.push('Starting 2D array creation');

    finalArray = Array(rows * cols).fill(undefined);
    steps.push({
      array: [...finalArray],
      highlightIndices: [],
      action: `Created array of size ${rows}×${cols}`,
      lineNumber: 2,
      variables: { rows, cols, i: 'N/A', j: 'N/A' }
    });
    history.push(`Created array of size ${rows}×${cols}`);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const index = i * cols + j;
        finalArray[index] = values[index];
        steps.push({
          array: [...finalArray],
          highlightIndices: [index],
          action: `Setting position (${i},${j}) to ${values[index]}`,
          lineNumber: 7,
          variables: { rows, cols, i, j, value: values[index] },
          comparing: false,
          copying: true
        });
        history.push(`Setting position (${i},${j}) to ${values[index]}`);
      }
    }

    steps.push({
      array: [...finalArray],
      highlightIndices: [],
      action: 'Array creation completed',
      lineNumber: 8,
      variables: { rows, cols, i: rows, j: cols }
    });
    history.push('Array creation completed');

    return { steps, history, finalArray };
  };

  const generateStepsMultiply = (matrix1Values, matrix2Values) => {
    const steps = [];
    const history = [];
    
    const r1 = parseInt(matrix1Rows);
    const c1 = parseInt(matrix1Cols);
    const r2 = parseInt(matrix2Rows);
    const c2 = parseInt(matrix2Cols);

    // Convert flat arrays to 2D matrices
    const matrix1 = Array(r1).fill().map((_, i) => 
      matrix1Values.slice(i * c1, (i + 1) * c1)
    );
    const matrix2 = Array(r2).fill().map((_, i) => 
      matrix2Values.slice(i * c2, (i + 1) * c2)
    );

    steps.push({
      array: [],
      highlightIndices: [],
      action: 'Starting matrix multiplication',
      lineNumber: 1,
      variables: { matrix1: 'Matrix 1', matrix2: 'Matrix 2' }
    });
    history.push('Starting matrix multiplication');

    // Initialize result matrix with zeros
    const result = Array(r1 * c2).fill(0);
    steps.push({
      array: [...result],
      highlightIndices: [],
      action: `Created result matrix of size ${r1}×${c2}`,
      lineNumber: 2,
      variables: { rows: r1, cols: c2 }
    });
    history.push(`Created result matrix of size ${r1}×${c2}`);

    // Perform matrix multiplication
    for (let i = 0; i < r1; i++) {
      for (let j = 0; j < c2; j++) {
        let sum = 0;
        for (let k = 0; k < c1; k++) {
          steps.push({
            array: [...result],
            highlightIndices: [i * c2 + j],
            action: `Multiplying M1[${i}][${k}] = ${matrix1[i][k]} with M2[${k}][${j}] = ${matrix2[k][j]}`,
            lineNumber: 3,
            variables: { 
              i, j, k,
              value1: matrix1[i][k],
              value2: matrix2[k][j],
              currentSum: sum
            },
            comparing: true
          });
          history.push(`Multiplying M1[${i}][${k}] = ${matrix1[i][k]} with M2[${k}][${j}] = ${matrix2[k][j]}`);

          sum += matrix1[i][k] * matrix2[k][j];
          
          steps.push({
            array: [...result],
            highlightIndices: [i * c2 + j],
            action: `Added product ${matrix1[i][k]} × ${matrix2[k][j]} = ${matrix1[i][k] * matrix2[k][j]} to sum`,
            lineNumber: 4,
            variables: { 
              i, j, k,
              product: matrix1[i][k] * matrix2[k][j],
              newSum: sum
            },
            copying: true
          });
          history.push(`Added product ${matrix1[i][k]} × ${matrix2[k][j]} = ${matrix1[i][k] * matrix2[k][j]} to sum`);
        }
        
        result[i * c2 + j] = sum;
        steps.push({
          array: [...result],
          highlightIndices: [i * c2 + j],
          action: `Set result[${i}][${j}] = ${sum}`,
          lineNumber: 5,
          variables: { i, j, finalSum: sum },
          copying: true
        });
        history.push(`Set result[${i}][${j}] = ${sum}`);
      }
    }

    steps.push({
      array: [...result],
      highlightIndices: [],
      action: 'Matrix multiplication completed',
      lineNumber: 6,
      variables: { result: 'Final matrix' }
    });
    history.push('Matrix multiplication completed');

    return { steps, history, finalArray: result };
  };

  const generateStepsOperation = (inputArray, operationType) => {
    const steps = [];
    const history = [];
    let finalArray = [...inputArray];

    steps.push({
      array: [...finalArray],
      highlightIndices: [],
      action: `Starting ${operationType} operation`,
      lineNumber: 1,
      variables: { array: finalArray.join(', ') }
    });
    history.push(`Starting ${operationType} operation`);

    switch (operationType) {
      case 'insert': {
        const value = finalArray.pop();
        const index = finalArray.pop();
        steps.push({
          array: [...finalArray],
          highlightIndices: [],
          action: `Preparing to insert ${value} at index ${index}`,
          lineNumber: 2,
          variables: { value, index },
          comparing: true
        });
        history.push(`Preparing to insert ${value} at index ${index}`);

        if (index < 0 || index > finalArray.length) {
          steps.push({
            array: [...finalArray],
            highlightIndices: [],
            action: 'Invalid index',
            lineNumber: 3,
            variables: { value, index },
            comparing: true
          });
          history.push('Invalid index');
          return { steps, history, finalArray };
        }

        finalArray.splice(index, 0, value);
        steps.push({
          array: [...finalArray],
          highlightIndices: [index],
          action: `Inserted ${value} at index ${index}`,
          lineNumber: 5,
          variables: { value, index },
          copying: true
        });
        history.push(`Inserted ${value} at index ${index}`);
        break;
      }
      case 'delete': {
        const index = finalArray.pop();
        steps.push({
          array: [...finalArray],
          highlightIndices: [index],
          action: `Preparing to delete element at index ${index}`,
          lineNumber: 2,
          variables: { index },
          comparing: true
        });
        history.push(`Preparing to delete element at index ${index}`);

        if (index < 0 || index >= finalArray.length) {
          steps.push({
            array: [...finalArray],
            highlightIndices: [],
            action: 'Invalid index',
            lineNumber: 3,
            variables: { index },
            comparing: true
          });
          history.push('Invalid index');
          return { steps, history, finalArray };
        }

        const deletedValue = finalArray[index];
        finalArray.splice(index, 1);
        steps.push({
          array: [...finalArray],
          highlightIndices: [],
          action: `Deleted element ${deletedValue} from index ${index}`,
          lineNumber: 5,
          variables: { index, deletedValue },
          copying: true
        });
        history.push(`Deleted element ${deletedValue} from index ${index}`);
        break;
      }
      case 'search': {
        const target = finalArray.pop();
        steps.push({
          array: [...finalArray],
          highlightIndices: [],
          action: `Searching for ${target}`,
          lineNumber: 2,
          variables: { target, i: 'N/A' }
        });
        history.push(`Searching for ${target}`);

        let found = false;
        for (let i = 0; i < finalArray.length; i++) {
          steps.push({
            array: [...finalArray],
            highlightIndices: [i],
            action: `Checking index ${i}: ${finalArray[i]}`,
            lineNumber: 3,
            variables: { target, i, current: finalArray[i] },
            comparing: true
          });
          history.push(`Checking index ${i}: ${finalArray[i]}`);

          if (finalArray[i] === target) {
            found = true;
            steps.push({
              array: [...finalArray],
              highlightIndices: [i],
              action: `Found ${target} at index ${i}`,
              lineNumber: 4,
              variables: { target, i, found: true }
            });
            history.push(`Found ${target} at index ${i}`);
            break;
          }
        }

        if (!found) {
          steps.push({
            array: [...finalArray],
            highlightIndices: [],
            action: `${target} not found in array`,
            lineNumber: 7,
            variables: { target, found: false }
          });
          history.push(`${target} not found in array`);
        }
        break;
      }
      case 'update': {
        const value = finalArray.pop();
        const index = finalArray.pop();
        steps.push({
          array: [...finalArray],
          highlightIndices: [index],
          action: `Preparing to update index ${index} to ${value}`,
          lineNumber: 2,
          variables: { index, value },
          comparing: true
        });
        history.push(`Preparing to update index ${index} to ${value}`);

        if (index < 0 || index >= finalArray.length) {
          steps.push({
            array: [...finalArray],
            highlightIndices: [],
            action: 'Invalid index',
            lineNumber: 3,
            variables: { index, value },
            comparing: true
          });
          history.push('Invalid index');
          return { steps, history, finalArray };
        }

        const oldValue = finalArray[index];
        finalArray[index] = value;
        steps.push({
          array: [...finalArray],
          highlightIndices: [index],
          action: `Updated index ${index} from ${oldValue} to ${value}`,
          lineNumber: 5,
          variables: { index, oldValue, newValue: value },
          copying: true
        });
        history.push(`Updated index ${index} from ${oldValue} to ${value}`);
        break;
      }
    }

    steps.push({
      array: [...finalArray],
      highlightIndices: [],
      action: `${operationType} operation completed`,
      lineNumber: 6,
      variables: {}
    });
    history.push(`${operationType} operation completed`);

    return { steps, history, finalArray };
  };

  const updatePreviewGrid = (rows, cols) => {
    if (!isNaN(rows) && !isNaN(cols) && rows > 0 && cols > 0) {
      setPreviewGrid(Array(rows * cols).fill(undefined));
    } else {
      setPreviewGrid(null);
    }
  };

  return (
    <div className="array-visualizer">
      <div className="visualizer-overlay" onClick={onClose}></div>
      <div className="visualizer-content">
        <div className="left-section">
          <h2>Array Visualization</h2>
          <div className="input-section">
            <div className="select-container">
              <label htmlFor="languageSelect">Select Language: </label>
              <select
                id="languageSelect"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="language-select"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="c++">C++</option>
              </select>
            </div>
            <div className="input-controls">
              {operation.id === 'create1d' ? (
                <>
                  <div>
                    <label htmlFor="sizeInput">Size: </label>
                    <input
                      type="number"
                      id="sizeInput"
                      placeholder="Enter array size"
                      value={sizeInput}
                      onChange={(e) => setSizeInput(e.target.value)}
                      min="1"
                    />
                  </div>
                  <div>
                    <label htmlFor="valueInput">Values: </label>
                    <input
                      type="text"
                      id="valueInput"
                      placeholder="Enter comma-separated values"
                      value={valueInput}
                      onChange={(e) => setValueInput(e.target.value)}
                    />
                  </div>
                </>
              ) : operation.id === 'create2d' ? (
                <>
                  <div>
                    <label htmlFor="rowsInput">Rows: </label>
                    <input
                      type="number"
                      id="rowsInput"
                      placeholder="Enter number of rows"
                      value={rowsInput}
                      onChange={(e) => {
                        const value = e.target.value;
                        setRowsInput(value);
                        setElementsInput('');
                        updatePreviewGrid(parseInt(value), parseInt(colsInput));
                      }}
                      min="1"
                      style={{ width: '80px' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="colsInput">Columns: </label>
                    <input
                      type="number"
                      id="colsInput"
                      placeholder="Enter number of columns"
                      value={colsInput}
                      onChange={(e) => {
                        const value = e.target.value;
                        setColsInput(value);
                        setElementsInput('');
                        updatePreviewGrid(parseInt(rowsInput), parseInt(value));
                      }}
                      min="1"
                      style={{ width: '80px' }}
                    />
                  </div>
                  {rowsInput && colsInput && !isNaN(parseInt(rowsInput)) && !isNaN(parseInt(colsInput)) && parseInt(rowsInput) > 0 && parseInt(colsInput) > 0 && (
                    <div>
                      <label htmlFor="elementsInput">Elements: </label>
                      <input
                        type="text"
                        id="elementsInput"
                        placeholder={`Enter ${parseInt(rowsInput) * parseInt(colsInput)} comma-separated values`}
                        value={elementsInput}
                        onChange={(e) => setElementsInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            startVisualization(e.target.value);
                          }
                        }}
                      />
                    </div>
                  )}
                </>
              ) : operation.id === 'multiply' ? (
                <>
                  <div>
                    <label htmlFor="matrix1Rows">Matrix 1 Rows: </label>
                    <input
                      type="number"
                      id="matrix1Rows"
                      placeholder="Rows"
                      value={matrix1Rows}
                      onChange={(e) => {
                        const value = e.target.value;
                        setMatrix1Rows(value);
                        setMatrix1Elements('');
                      }}
                      min="1"
                      style={{ width: '80px' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="matrix1Cols">Matrix 1 Columns: </label>
                    <input
                      type="number"
                      id="matrix1Cols"
                      placeholder="Columns"
                      value={matrix1Cols}
                      onChange={(e) => {
                        const value = e.target.value;
                        setMatrix1Cols(value);
                        setMatrix1Elements('');
                      }}
                      min="1"
                      style={{ width: '80px' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="matrix2Rows">Matrix 2 Rows: </label>
                    <input
                      type="number"
                      id="matrix2Rows"
                      placeholder="Rows"
                      value={matrix2Rows}
                      onChange={(e) => {
                        const value = e.target.value;
                        setMatrix2Rows(value);
                        setMatrix2Elements('');
                      }}
                      min="1"
                      style={{ width: '80px' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="matrix2Cols">Matrix 2 Columns: </label>
                    <input
                      type="number"
                      id="matrix2Cols"
                      placeholder="Columns"
                      value={matrix2Cols}
                      onChange={(e) => {
                        const value = e.target.value;
                        setMatrix2Cols(value);
                        setMatrix2Elements('');
                      }}
                      min="1"
                      style={{ width: '80px' }}
                    />
                  </div>
                  {matrix1Rows && matrix1Cols && matrix2Rows && matrix2Cols && (
                    parseInt(matrix1Cols) === parseInt(matrix2Rows) ? (
                      <>
                        <div>
                          <label htmlFor="matrix1Elements">Matrix 1 Elements: </label>
                          <input
                            type="text"
                            id="matrix1Elements"
                            placeholder={`Enter ${parseInt(matrix1Rows) * parseInt(matrix1Cols)} comma-separated values`}
                            value={matrix1Elements}
                            onChange={(e) => setMatrix1Elements(e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor="matrix2Elements">Matrix 2 Elements: </label>
                          <input
                            type="text"
                            id="matrix2Elements"
                            placeholder={`Enter ${parseInt(matrix2Rows) * parseInt(matrix2Cols)} comma-separated values`}
                            value={matrix2Elements}
                            onChange={(e) => setMatrix2Elements(e.target.value)}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="error-message">
                        Matrix multiplication not possible: Number of columns in Matrix 1 must equal number of rows in Matrix 2
                      </div>
                    )
                  )}
                </>
              ) : (
                <div>
                  <label htmlFor="arrayInput">Enter Values: </label>
                  <input
                    type="text"
                    id="arrayInput"
                    placeholder={getInputPlaceholder(operation.id)}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        startVisualization(e.target.value);
                      }
                    }}
                  />
                </div>
              )}
              <button 
                onClick={() => {
                  if (operation.id === 'create1d') {
                    startVisualization(valueInput);
                  } else if (operation.id === 'create2d') {
                    if (rowsInput && colsInput && elementsInput) {
                      startVisualization(elementsInput);
                    }
                  } else if (operation.id === 'multiply') {
                    if (matrix1Rows && matrix1Cols && matrix2Rows && matrix2Cols && matrix1Elements && matrix2Elements) {
                      startVisualization(matrix1Elements + ',' + matrix2Elements);
                    }
                  } else {
                    startVisualization(inputValue);
                  }
                }}
              >
                Start
              </button>
              <button className="play-pause-btn" onClick={togglePlay}>
                {isPlaying ? '⏸' : '▶'}
              </button>
            </div>
          </div>

          <div className="array-display">
            <div className="main-array">
              {operation.id === 'multiply' && matrix1Elements && matrix2Elements ? (
                <>
                  <div className="matrix-section">
                    <div className="phase-label">Matrix 1</div>
                    <div className="array-content">
                      <div className="array-2d-container">
                        <div className="array-2d-grid" style={{ 
                          display: 'grid',
                          gridTemplateColumns: `auto repeat(${parseInt(matrix1Cols)}, 1fr)`,
                          gap: '8px'
                        }}>
                          <div className="grid-header"></div>
                          {[...Array(parseInt(matrix1Cols))].map((_, i) => (
                            <div key={`col-${i}`} className="grid-header">Col {i}</div>
                          ))}
                          
                          {[...Array(parseInt(matrix1Rows))].map((_, row) => (
                            <React.Fragment key={`row-${row}`}>
                              <div className="grid-header">Row {row}</div>
                              {[...Array(parseInt(matrix1Cols))].map((_, col) => {
                                const index = row * parseInt(matrix1Cols) + col;
                                const value = matrix1Elements.split(',')[index];
                                return (
                                  <div key={`${row}-${col}`} className="array-element">
                                    {value}
                                  </div>
                                );
                              })}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="matrix-section">
                    <div className="phase-label">Matrix 2</div>
                    <div className="array-content">
                      <div className="array-2d-container">
                        <div className="array-2d-grid" style={{ 
                          display: 'grid',
                          gridTemplateColumns: `auto repeat(${parseInt(matrix2Cols)}, 1fr)`,
                          gap: '8px'
                        }}>
                          <div className="grid-header"></div>
                          {[...Array(parseInt(matrix2Cols))].map((_, i) => (
                            <div key={`col-${i}`} className="grid-header">Col {i}</div>
                          ))}
                          
                          {[...Array(parseInt(matrix2Rows))].map((_, row) => (
                            <React.Fragment key={`row-${row}`}>
                              <div className="grid-header">Row {row}</div>
                              {[...Array(parseInt(matrix2Cols))].map((_, col) => {
                                const index = row * parseInt(matrix2Cols) + col;
                                const value = matrix2Elements.split(',')[index];
                                return (
                                  <div key={`${row}-${col}`} className="array-element">
                                    {value}
                                  </div>
                                );
                              })}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="matrix-section">
                    <div className="phase-label">Result Matrix</div>
                    <div className="array-content">
                      <div className="array-2d-container">
                        <div className="array-2d-grid" style={{ 
                          display: 'grid',
                          gridTemplateColumns: `auto repeat(${parseInt(matrix2Cols)}, 1fr)`,
                          gap: '8px'
                        }}>
                          <div className="grid-header"></div>
                          {[...Array(parseInt(matrix2Cols))].map((_, i) => (
                            <div key={`col-${i}`} className="grid-header">Col {i}</div>
                          ))}
                          
                          {[...Array(parseInt(matrix1Rows))].map((_, row) => (
                            <React.Fragment key={`row-${row}`}>
                              <div className="grid-header">Row {row}</div>
                              {[...Array(parseInt(matrix2Cols))].map((_, col) => {
                                const index = row * parseInt(matrix2Cols) + col;
                                return (
                                  <div
                                    key={`${row}-${col}`}
                                    className={`array-element ${
                                      steps[currentStep]?.array ? (
                                        `${steps[currentStep]?.highlightIndices.includes(index) ? 'highlight' : ''} 
                                        ${steps[currentStep]?.comparing ? 'comparing' : ''} 
                                        ${steps[currentStep]?.copying ? 'copying' : ''}`
                                      ) : ''
                                    }`}
                                  >
                                    {steps[currentStep]?.array ? 
                                      (steps[currentStep].array[index] !== undefined ? steps[currentStep].array[index] : '') :
                                      (previewGrid ? '' : '')}
                                  </div>
                                );
                              })}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="phase-label">Main Array</div>
              )}
              <div className="array-content">
                {operation.id === 'create2d' || (operation.id === 'multiply' && steps.length > 0) ? (
                  <div className="array-2d-container">
                    <div className="array-2d-grid" style={{ 
                      display: 'grid',
                      gridTemplateColumns: operation.id === 'multiply' 
                        ? `auto repeat(${parseInt(matrix2Cols)}, 1fr)`
                        : `auto repeat(${parseInt(colsInput) || 1}, 1fr)`,
                      gap: '8px'
                    }}>
                      {/* Column headers */}
                      <div className="grid-header"></div>
                      {[...Array(operation.id === 'multiply' ? parseInt(matrix2Cols) : parseInt(colsInput) || 0)].map((_, i) => (
                        <div key={`col-${i}`} className="grid-header">Col {i}</div>
                      ))}
                      
                      {/* Grid with row headers and values */}
                      {[...Array(operation.id === 'multiply' ? parseInt(matrix1Rows) : parseInt(rowsInput) || 0)].map((_, row) => (
                        <React.Fragment key={`row-${row}`}>
                          <div className="grid-header">Row {row}</div>
                          {[...Array(operation.id === 'multiply' ? parseInt(matrix2Cols) : parseInt(colsInput) || 0)].map((_, col) => {
                            const index = row * (operation.id === 'multiply' ? parseInt(matrix2Cols) : parseInt(colsInput) || 1) + col;
                            return (
                              <div
                                key={`${row}-${col}`}
                                className={`array-element ${
                                  steps[currentStep]?.array ? (
                                    `${steps[currentStep]?.highlightIndices.includes(index) ? 'highlight' : ''} 
                                    ${steps[currentStep]?.comparing ? 'comparing' : ''} 
                                    ${steps[currentStep]?.copying ? 'copying' : ''}`
                                  ) : ''
                                }`}
                              >
                                {steps[currentStep]?.array ? 
                                  (steps[currentStep].array[index] !== undefined ? steps[currentStep].array[index] : '') :
                                  (previewGrid ? '' : '')}
                              </div>
                            );
                          })}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Regular 1D array display
                  steps[currentStep]?.array.map((value, index) => (
                    <div
                      key={index}
                      className={`array-element ${
                        steps[currentStep]?.highlightIndices.includes(index) ? 'highlight' : ''
                      } ${
                        steps[currentStep]?.comparing ? 'comparing' : ''
                      } ${
                        steps[currentStep]?.copying ? 'copying' : ''
                      }`}
                    >
                      {value !== undefined ? value : ''}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="controls">
            <button onClick={firstStep}>⏮️ First</button>
            <button onClick={prevStep}>⏪ Prev</button>
            <button onClick={nextStep}>Next ⏩</button>
            <button onClick={lastStep}>Last ⏭️</button>
          </div>

          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${steps.length > 1 ? (currentStep / (steps.length - 1)) * 100 : 0}%`
              }}
            />
          </div>

          <div className="speed-control">
            <span>Speed:</span>
            <input
              type="range"
              min="50"
              max="1000"
              value={1050 - speed}
              onChange={(e) => setSpeed(1050 - parseInt(e.target.value))}
              className="speed-slider"
            />
            <span>{Math.round(10000 / speed) / 10}x</span>
          </div>

          <div className="variable-display">
            <h3>Current Variables:</h3>
            {Object.entries(steps[currentStep]?.variables || {}).map(([key, value]) => (
              <p key={key}>{key}: {value}</p>
            ))}
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
          <h2>Code Implementation</h2>
          <div className="code-box">
            {algorithms[operation.id][selectedLanguage].split('\n').map((line, index) => (
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

const getInputPlaceholder = (operationId) => {
  switch (operationId) {
    case 'create1d':
      return 'Enter values separated by commas';
    case 'create2d':
      return 'Enter rows,cols,value (e.g., 3,3,0)';
    case 'multiply':
      return 'Enter first array (e.g., 1,2,3)';
    case 'insert':
      return 'Enter array,value,index (e.g., 1,2,3,4,5,99,2)';
    case 'delete':
      return 'Enter array,index (e.g., 1,2,3,4,5,2)';
    case 'search':
      return 'Enter array,target (e.g., 1,2,3,4,5,3)';
    case 'update':
      return 'Enter array,index,value (e.g., 1,2,3,4,5,2,99)';
    default:
      return 'Enter comma-separated numbers';
  }
};

export default ArrayVisualizer;
