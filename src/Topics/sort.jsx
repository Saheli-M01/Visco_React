import React, { useState } from "react";
import "../styles/Topics/_sort.scss";
import SortingVisualizer from "../components/SortingVisualizer";

const sortingAlgorithms = [
  { 
    name: "Bubble Sort", 
    timeComplexity: { worst: "O(n²)", average: "O(n²)", best: "O(n)" }, 
    spaceComplexity: "O(1)",
    description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    code: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`
  },
  { 
    name: "Selection Sort", 
    timeComplexity: { worst: "O(n²)", average: "O(n²)", best: "O(n²)" }, 
    spaceComplexity: "O(1)",
    description: "Divides the input list into a sorted and an unsorted region, and repeatedly selects the smallest element from the unsorted region to add to the sorted region.",
    code: `function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`
  },
  { 
    name: "Insertion Sort", 
    timeComplexity: { worst: "O(n²)", average: "O(n²)", best: "O(n)" }, 
    spaceComplexity: "O(1)",
    description: "Builds the final sorted array one item at a time, by repeatedly inserting a new element into the sorted portion of the array.",
    code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}`
  },
  { 
    name: "Merge Sort", 
    timeComplexity: { worst: "O(n log n)", average: "O(n log n)", best: "O(n log n)" }, 
    spaceComplexity: "O(n)",
    description: "A divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.",
    code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return [...result, ...left.slice(i), ...right.slice(j)];
}`
  },
  { 
    name: "Quick Sort", 
    timeComplexity: { worst: "O(n²)", average: "O(n log n)", best: "O(n log n)" }, 
    spaceComplexity: "O(log n)",
    description: "A divide-and-conquer algorithm that picks an element as pivot and partitions the array around it, such that smaller elements move to the left and larger to the right.",
    code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`
  },
  { 
    name: "Heap Sort", 
    timeComplexity: { worst: "O(n log n)", average: "O(n log n)", best: "O(n log n)" }, 
    spaceComplexity: "O(1)", 
    route: "/sorting/heap-sort" 
  },
  { 
    name: "Shell Sort", 
    timeComplexity: { worst: "O(n²)", average: "O(n log n)", best: "O(n log n)" }, 
    spaceComplexity: "O(1)", 
    route: "/sorting/shell-sort" 
  },
  { 
    name: "Counting Sort", 
    timeComplexity: { worst: "O(n+k)", average: "O(n+k)", best: "O(n+k)" }, 
    spaceComplexity: "O(k)", 
    route: "/sorting/counting-sort" 
  },
  { 
    name: "Radix Sort", 
    timeComplexity: { worst: "O(d(n+k))", average: "O(d(n+k))", best: "O(d(n+k))" }, 
    spaceComplexity: "O(n+k)", 
    route: "/sorting/radix-sort" 
  },
  { 
    name: "Bucket Sort", 
    timeComplexity: { worst: "O(n²)", average: "O(n+k)", best: "O(n+k)" }, 
    spaceComplexity: "O(n+k)", 
    route: "/sorting/bucket-sort" 
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
