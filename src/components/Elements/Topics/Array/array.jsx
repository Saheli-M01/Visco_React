import React, { useState } from "react";
import '../../../../styles/ElementStyle/TopicStyle/ArrayStyle/_array.scss';
import ArrayVisualizer from "./ArrayVisualizer";

const arrayOperations = [
    {
        id: "create1d",
        name: "Create1D",
        description: "Create a 1D array with specified size and values",
        timeComplexity: { worst: "O(n)", average: "O(n)", best: "O(n)" },
        spaceComplexity: "O(n)",
        code: `function create1DArray(size, value = 0) {
  // Create new array of given size
  let arr = new Array(size);
  // Fill array with specified value
  for(let i = 0; i < size; i++) {
    arr[i] = value;
  }
  return arr;
}`
    },
    {
        id: "create2d",
        name: "Create2D",
        description: "Create a 2D array with specified rows and columns",
        timeComplexity: { worst: "O(n×m)", average: "O(n×m)", best: "O(n×m)" },
        spaceComplexity: "O(n×m)",
        code: `function create2DArray(rows, cols, value = 0) {
  // Create array of rows
  let arr = new Array(rows);
  // Create columns for each row
  for(let i = 0; i < rows; i++) {
    arr[i] = new Array(cols);
    // Fill each column with value
    for(let j = 0; j < cols; j++) {
      arr[i][j] = value;
    }
  }
  return arr;
}`
    },
    {
        id: "multiply",
        name: "Multiply",
        description: "Multiply two arrays element by element",
        timeComplexity: { worst: "O(n)", average: "O(n)", best: "O(n)" },
        spaceComplexity: "O(n)",
        code: `function multiplyArrays(arr1, arr2) {
  // Check if arrays have same length
  if(arr1.length !== arr2.length) {
    return null;  // Arrays must be same length
  }
  // Multiply corresponding elements
  let result = new Array(arr1.length);
  for(let i = 0; i < arr1.length; i++) {
    result[i] = arr1[i] * arr2[i];
  }
  return result;
}`
    },
    {
        id: "insert",
        name: "Insert",
        description: "Add elements to specific positions in the array",
        timeComplexity: { worst: "O(n)", average: "O(n)", best: "O(1)" },
        spaceComplexity: "O(1)",
        code: `function insertElement(arr, value, index) {
  // Shift elements to make space
  for(let i = arr.length; i > index; i--) {
    arr[i] = arr[i-1];
  }
  // Insert new element
  arr[index] = value;
  return arr;
}`
    },
    {
        id: "delete",
        name: "Delete",
        description: "Remove elements from specific positions",
        timeComplexity: { worst: "O(n)", average: "O(n)", best: "O(1)" },
        spaceComplexity: "O(1)",
        code: `function deleteElement(arr, index) {
  // Shift elements to fill gap
  for(let i = index; i < arr.length - 1; i++) {
    arr[i] = arr[i+1];
  }
  // Remove last element
  arr.length--;
  return arr;
}`
    },
    {
        id: "search",
        name: "Search",
        description: "Find elements in the array",
        timeComplexity: { worst: "O(n)", average: "O(n)", best: "O(1)" },
        spaceComplexity: "O(1)",
        code: `function searchElement(arr, value) {
  // Linear search
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] === value) {
      return i;  // Found at index i
    }
  }
  return -1;  // Not found
}`
    },
    {
        id: "update",
        name: "Update",
        description: "Modify elements at specific positions",
        timeComplexity: { worst: "O(1)", average: "O(1)", best: "O(1)" },
        spaceComplexity: "O(1)",
        code: `function updateElement(arr, value, index) {
  // Direct update at index
  arr[index] = value;
  return arr;
}`
    }
];

const ArrayComponent = () => {
    const [selectedOperation, setSelectedOperation] = useState(null);

    const closeVisualizer = () => {
        setSelectedOperation(null);
    };

    return (
        <section id="array">
            <div className="container">
                <h1 className="text-center">Array Operations</h1>
                <div className="row">
                    {arrayOperations.map((op, index) => (
                        <div key={index} className="topic-card">
                            <div className="card-content">
                                <p className="card-name">{op.name}</p>
                                <p className="card-description">{op.description}</p>
                                <div className="complexity">
                                    <p><strong>Time Complexity:</strong></p>
                                    <p>Worst: {op.timeComplexity.worst}</p>
                                    <p>Average: {op.timeComplexity.average}</p>
                                    <p>Best: {op.timeComplexity.best}</p>
                                    <p><strong>Space Complexity:</strong> {op.spaceComplexity}</p>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={() => setSelectedOperation(op)}
                                >
                                    Explore <i className="fa-solid fa-play"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedOperation && (
                <ArrayVisualizer
                    onClose={closeVisualizer}
                    operation={selectedOperation}
                    isVisible={true}
                />
            )}
        </section>
    );
};

export default ArrayComponent;