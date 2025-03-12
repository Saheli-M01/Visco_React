import React, { useState } from "react";
import "../../../../styles/ElementStyle/TopicStyle/SortStyle/_sort.scss";
import SortingVisualizer from "./SortingVisualizer";

const sortingAlgorithms = [
  { 
    name: "Bubble Sort", 
    timeComplexity: { worst: "O(n²)", average: "O(n²)", best: "O(n)" }, 
    spaceComplexity: "O(1)",
  },
  { 
    name: "Selection Sort", 
    timeComplexity: { worst: "O(n²)", average: "O(n²)", best: "O(n²)" }, 
    spaceComplexity: "O(1)",
  },
  { 
    name: "Insertion Sort", 
    timeComplexity: { worst: "O(n²)", average: "O(n²)", best: "O(n)" }, 
    spaceComplexity: "O(1)",
  },
  { 
    name: "Merge Sort", 
    timeComplexity: { worst: "O(n log n)", average: "O(n log n)", best: "O(n log n)" }, 
    spaceComplexity: "O(n)",
  },
  { 
    name: "Quick Sort", 
    timeComplexity: { worst: "O(n²)", average: "O(n log n)", best: "O(n log n)" }, 
    spaceComplexity: "O(log n)",
  },
  { 
    name: "Heap Sort", 
    timeComplexity: { worst: "O(n log n)", average: "O(n log n)", best: "O(n log n)" }, 
    spaceComplexity: "O(1)", 
  },
  { 
    name: "Shell Sort", 
    timeComplexity: { worst: "O(n²)", average: "O(n log n)", best: "O(n log n)" }, 
    spaceComplexity: "O(1)", 
  },
  { 
    name: "Counting Sort", 
    timeComplexity: { worst: "O(n+k)", average: "O(n+k)", best: "O(n+k)" }, 
    spaceComplexity: "O(k)", 
  },
  { 
    name: "Radix Sort", 
    timeComplexity: { worst: "O(d(n+k))", average: "O(d(n+k))", best: "O(d(n+k))" }, 
    spaceComplexity: "O(n+k)", 
  },
  { 
    name: "Bucket Sort", 
    timeComplexity: { worst: "O(n²)", average: "O(n+k)", best: "O(n+k)" }, 
    spaceComplexity: "O(n+k)", 
  }
];

const SortingSection = () => {
  const [selectedAlgo, setSelectedAlgo] = useState(null);

  const closeVisualizer = () => {
    setSelectedAlgo(null);
  };

  return (
    <section id="sorting">
      <div className="container">
        <h1 className="text-center">Sorting Algorithms</h1>
        <div className="row">
          {sortingAlgorithms.map((algo, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-12 topic-card mt-2">
              <div className="card-content">
                <p className="card-name">{algo.name}</p>
                <div className="complexity">
                  <p><strong>Time Complexity:</strong></p>
                  <p>Worst: {algo.timeComplexity.worst}</p>
                  <p>Average: {algo.timeComplexity.average}</p>
                  <p>Best: {algo.timeComplexity.best}</p>
                  <p><strong>Space Complexity:</strong> {algo.spaceComplexity}</p>
                </div>
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => setSelectedAlgo(algo)}
                >
                  Explore <i className="fa-solid fa-play"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedAlgo && (
        <SortingVisualizer 
          algorithm={selectedAlgo}
          onClose={closeVisualizer}
        />
      )}
    </section>
  );
};

export default SortingSection;
