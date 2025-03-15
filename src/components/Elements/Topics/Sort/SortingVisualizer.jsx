import React, { useState, useEffect, useRef } from "react";

const SortingVisualizer = ({ onClose, algorithm }) => {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [history, setHistory] = useState([]);
  const [warning, setWarning] = useState("");
  const historyListRef = useRef(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(
    algorithm?.name?.toLowerCase().split(" ")[0] || "bubble"
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500); // Default speed: 500ms
  const [inputValue, setInputValue] = useState("");
  const [pivotIndex, setPivotIndex] = useState(0);

  const algorithms = {
    bubble: {
      name: "Bubble Sort",
      python: `def bubbleSort(arr):
    n = len(arr)
    for i in range(n-1):
        for j in range(n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`,
      "c++": `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
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
}`,
      javaScript: `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
          }
      }
  }
  return arr;
}`,
      c: `void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n-1; i++) {
      for (int j = 0; j < n-i-1; j++) {
          if (arr[j] > arr[j+1]) {
              int temp = arr[j];
              arr[j] = arr[j+1];
              arr[j+1] = temp;
          }
      }
  }
}`,
    },
    selection: {
      name: "Selection Sort",
      python: `def selectionSort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
      "c++": `void selectionSort(int arr[], int n) {
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
}`,
      javaScript: `function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
      let min_idx = i;
      for (let j = i + 1; j < n; j++) {
          if (arr[j] < arr[min_idx]) {
              min_idx = j;
          }
      }
      // Swap the found minimum element with the first element
      if (min_idx !== i) {
          [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
      }
  }
  return arr;
}`,
      c: `void selectionSort(int arr[], int n) {
  int i, j, min_idx, temp;
  for (i = 0; i < n-1; i++) {
      min_idx = i;
      for (j = i+1; j < n; j++) {
          if (arr[j] < arr[min_idx])
              min_idx = j;
      }
      // Swap the found minimum element with the first element
      temp = arr[min_idx];
      arr[min_idx] = arr[i];
      arr[i] = temp;
  }
}`,
    },
    insertion: {
      name: "Insertion Sort",
      python: `def insertionSort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i-1
        while j >= 0 and arr[j] > key:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = key
    return arr`,
      "c++": `void insertionSort(int arr[], int n) {
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
}`,

      c: `void insertionSort(int arr[], int n) {
    int i, key, j;
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;

        // Move elements of arr[0..i-1] that are greater than key
        // to one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
      javaScript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      // Move elements of arr[0..i-1] that are greater than key
      // to one position ahead of their current position
      while (j >= 0 && arr[j] > key) {
          arr[j + 1] = arr[j];
          j--;
      }
      arr[j + 1] = key;
  }
  return arr;
}`,
    },
    merge: {
      name: "Merge Sort",
      python: `def merge(arr, start, end):
    middle = (start + end) // 2
    
    # Calculate sizes of subarrays
    left_size = middle - start + 1
    right_size = end - middle
    
    # Create temporary arrays
    left_array = [0] * left_size
    right_array = [0] * right_size
    
    # Copy data to temporary arrays
    current = start
    for i in range(left_size):
        left_array[i] = arr[current]
        current += 1
        
    current = middle + 1
    for i in range(right_size):
        right_array[i] = arr[current]
        current += 1
    
    # Merge the temp arrays back
    left_index = 0
    right_index = 0
    current = start
    
    while left_index < left_size and right_index < right_size:
        if left_array[left_index] < right_array[right_index]:
            arr[current] = left_array[left_index]
            left_index += 1
        else:
            arr[current] = right_array[right_index]
            right_index += 1
        current += 1
    
    # Copy remaining elements of left array if any
    while left_index < left_size:
        arr[current] = left_array[left_index]
        left_index += 1
        current += 1
    
    # Copy remaining elements of right array if any
    while right_index < right_size:
        arr[current] = right_array[right_index]
        right_index += 1
        current += 1

def mergeSort(arr, start, end):
    if start >= end:
        return
        
    middle = (start + end) // 2
    
    # Sort first and second halves
    mergeSort(arr, start, middle)
    mergeSort(arr, middle + 1, end)
    
    # Merge the sorted halves
    merge(arr, start, end)`,
      "c++": `void merge(int *array, int start, int end) {
    int middle = (start + end) / 2;

    int leftSize = middle - start + 1;
    int rightSize = end - middle;

    int *leftArray = new int[leftSize];
    int *rightArray = new int[rightSize];

    // Copy values to the left subarray
    int currentIndex = start;
    for(int i = 0; i < leftSize; i++) {
        leftArray[i] = array[currentIndex++];
    }

    // Copy values to the right subarray
    currentIndex = middle + 1;
    for(int i = 0; i < rightSize; i++) {
        rightArray[i] = array[currentIndex++];
    }

    // Merge the two sorted subarrays
    int leftIndex = 0;
    int rightIndex = 0;
    currentIndex = start;

    while(leftIndex < leftSize && rightIndex < rightSize) {
        if(leftArray[leftIndex] < rightArray[rightIndex]) {
            array[currentIndex++] = leftArray[leftIndex++];
        } else {
            array[currentIndex++] = rightArray[rightIndex++];
        }
    }

    // Copy remaining elements from the left subarray
    while(leftIndex < leftSize) {
        array[currentIndex++] = leftArray[leftIndex++];
    }

    // Copy remaining elements from the right subarray
    while(rightIndex < rightSize) {
        array[currentIndex++] = rightArray[rightIndex++];
    }

    // Clean up dynamically allocated memory
    delete[] leftArray;
    delete[] rightArray;
}

void mergeSort(int *array, int start, int end) {
    // Base case: If the segment contains 0 or 1 element
    if(start >= end) {
        return;
    }

    int middle = (start + end) / 2;

    // Sort the left part
    mergeSort(array, start, middle);

    // Sort the right part
    mergeSort(array, middle + 1, end);

    // Merge the two sorted parts
    merge(array, start, end);
}`,
      java: `void merge(int[] array, int start, int end) {
    int middle = (start + end) / 2;
    
    int leftSize = middle - start + 1;
    int rightSize = end - middle;
    
    // Create temporary arrays
    int[] leftArray = new int[leftSize];
    int[] rightArray = new int[rightSize];
    
    // Copy data to temporary arrays
    int currentIndex = start;
    for(int i = 0; i < leftSize; i++) {
        leftArray[i] = array[currentIndex++];
    }
    
    currentIndex = middle + 1;
    for(int i = 0; i < rightSize; i++) {
        rightArray[i] = array[currentIndex++];
    }
    
    // Merge the temp arrays back
    int leftIndex = 0;
    int rightIndex = 0;
    currentIndex = start;
    
    while(leftIndex < leftSize && rightIndex < rightSize) {
        if(leftArray[leftIndex] < rightArray[rightIndex]) {
            array[currentIndex++] = leftArray[leftIndex++];
        } else {
            array[currentIndex++] = rightArray[rightIndex++];
        }
    }
    
    // Copy remaining elements of left array if any
    while(leftIndex < leftSize) {
        array[currentIndex++] = leftArray[leftIndex++];
    }
    
    // Copy remaining elements of right array if any
    while(rightIndex < rightSize) {
        array[currentIndex++] = rightArray[rightIndex++];
    }
}

void mergeSort(int[] array, int start, int end) {
    if(start >= end) {
        return;
    }
    
    int middle = (start + end) / 2;
    
    // Sort first and second halves
    mergeSort(array, start, middle);
    mergeSort(array, middle + 1, end);
    
    // Merge the sorted halves
    merge(array, start, end);
}`,
      c: `// Function to merge two subarrays
void merge(int arr[], int start, int middle, int end) {
    int leftSize = middle - start + 1;
    int rightSize = end - middle;
    
    int leftArray[leftSize], rightArray[rightSize];

    // Copy data to temp arrays
    for (int i = 0; i < leftSize; i++)
        leftArray[i] = arr[start + i];
    for (int i = 0; i < rightSize; i++)
        rightArray[i] = arr[middle + 1 + i];

    int i = 0, j = 0, k = start;

    // Merge the temporary arrays
    while (i < leftSize && j < rightSize) {
        if (leftArray[i] <= rightArray[j]) {
            arr[k] = leftArray[i];
            i++;
        } else {
            arr[k] = rightArray[j];
            j++;
        }
        k++;
    }

    // Copy remaining elements
    while (i < leftSize) {
        arr[k] = leftArray[i];
        i++;
        k++;
    }
    while (j < rightSize) {
        arr[k] = rightArray[j];
        j++;
        k++;
    }
}

// Function to implement Merge Sort
void mergeSort(int arr[], int start, int end) {
    if (start < end) {
        int middle = start + (end - start) / 2;

        mergeSort(arr, start, middle);
        mergeSort(arr, middle + 1, end);

        merge(arr, start, middle, end);
    }
}`,
      javaScript: `function merge(arr, start, middle, end) {
    let leftArray = arr.slice(start, middle + 1);
    let rightArray = arr.slice(middle + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
            arr[k] = leftArray[i];
            i++;
        } else {
            arr[k] = rightArray[j];
            j++;
        }
        k++;
    }

    while (i < leftArray.length) {
        arr[k] = leftArray[i];
        i++;
        k++;
    }

    while (j < rightArray.length) {
        arr[k] = rightArray[j];
        j++;
        k++;
    }
}

function mergeSort(arr, start = 0, end = arr.length - 1) {
    if (start < end) {
        let middle = Math.floor((start + end) / 2);

        mergeSort(arr, start, middle);
        mergeSort(arr, middle + 1, end);

        merge(arr, start, middle, end);
    }
    return arr;
}`,
    },
    name: "Quick Sort",
    quick: {
      python: `def quick_sort(arr, low, high):
    if low < high:
        pivot_index = partition(arr, low, high)
        quick_sort(arr, low, pivot_index - 1)  # Sort left part
        quick_sort(arr, pivot_index + 1, high) # Sort right part

def partition(arr, low, high):
    pivot = arr[high]  # Choosing the last element as pivot
    i = low - 1

    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]  # Swap elements

    arr[i + 1], arr[high] = arr[high], arr[i + 1]  # Place pivot correctly
    return i + 1
`,
      "c++": `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);  // Sort left part
        quickSort(arr, pivotIndex + 1, high); // Sort right part
    }
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high]; // Choosing the last element as pivot
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            std::swap(arr[i], arr[j]); // Swap elements
        }
    }
    std::swap(arr[i + 1], arr[high]); // Place pivot correctly
    return i + 1;
}`,
      java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);  // Sort left part
        quickSort(arr, pivotIndex + 1, high); // Sort right part
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high]; // Choosing the last element as pivot
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return i + 1;
}

private static void swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}`,
      javaScript: `function quickSort(arr, low, high) {
    if (low < high) {
        let pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);  // Sort left part
        quickSort(arr, pivotIndex + 1, high); // Sort right part
    }
}

function partition(arr, low, high) {
    let pivot = arr[high]; // Choosing the last element as pivot
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Place pivot correctly
    return i + 1;
}`,
      c: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);  // Sort left part
        quickSort(arr, pivotIndex + 1, high); // Sort right part
    }
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high]; // Choosing the last element as pivot
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];  // Swap elements
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];  // Place pivot correctly
    arr[i + 1] = arr[high];
    arr[high] = temp;

    return i + 1;
}`,
    },

    heap: {
      name: "Heap Sort",
      python: `def heap_sort(arr):
    def heapify(arr, n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n and arr[left] > arr[largest]:
            largest = left
        if right < n and arr[right] > arr[largest]:
            largest = right

        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(arr, n, largest)

    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
`,
      "c++": `void heapSort(int arr[], int n) {
    auto heapify = [&](int arr[], int n, int i) {
        int largest = i, left = 2 * i + 1, right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;

        if (largest != i) {
            swap(arr[i], arr[largest]);
            heapify(arr, n, largest);
        }
    };

    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
      java: `public static void heapSort(int arr[]) {
    int n = arr.length;

    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
}

private static void heapify(int arr[], int n, int i) {
    int largest = i, left = 2 * i + 1, right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
        largest = left;
    if (right < n && arr[right] > arr[largest])
        largest = right;

    if (largest != i) {
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        heapify(arr, n, largest);
    }
}`,
      javaScript: `function heapSort(arr) {
    function heapify(arr, n, i) {
        let largest = i, left = 2 * i + 1, right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            heapify(arr, n, largest);
        }
    }

    let n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        heapify(arr, n, i);

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
}`,
      c: `void heapSort(int arr[], int n) {
    void heapify(int arr[], int n, int i) {
        int largest = i, left = 2 * i + 1, right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest])
            largest = left;
        if (right < n && arr[right] > arr[largest])
            largest = right;

        if (largest != i) {
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            heapify(arr, n, largest);
        }
    }

    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
}`,
    },

    shell: {
      name: "Shell Sort",
      python: `def shellSort(arr):
    n = len(arr)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2
    return arr`,

      "c++": `void shellSort(int arr[], int n) {
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
}`,

      java: `void shellSort(int[] arr) {
    int n = arr.length;
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
}`,
      javaScript: `function shellSort(arr) {
    let n = arr.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
    return arr;
}`,

      c: `void shellSort(int arr[], int n) {
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
}`,
    },

    counting: {
      name: "Counting Sort",
      python: `def countingSort(arr):
  max_val = max(arr)
  count = [0] * (max_val + 1)
  output = [0] * len(arr)

  for num in arr:
      count[num] += 1

  for i in range(1, len(count)):
      count[i] += count[i - 1]

  for num in reversed(arr):
      output[count[num] - 1] = num
      count[num] -= 1

  return output`,

      "c++": `void countingSort(int arr[], int n) {
  int max_val = *max_element(arr, arr + n);
  vector<int> count(max_val + 1, 0);
  vector<int> output(n);

  for (int i = 0; i < n; i++)
      count[arr[i]]++;

  for (int i = 1; i <= max_val; i++)
      count[i] += count[i - 1];

  for (int i = n - 1; i >= 0; i--) {
      output[count[arr[i]] - 1] = arr[i];
      count[arr[i]]--;
  }

  for (int i = 0; i < n; i++)
      arr[i] = output[i];
}`,

      java: `void countingSort(int[] arr) {
  int max_val = Arrays.stream(arr).max().getAsInt();
  int[] count = new int[max_val + 1];
  int[] output = new int[arr.length];

  for (int num : arr)
      count[num]++;

  for (int i = 1; i < count.length; i++)
      count[i] += count[i - 1];

  for (int i = arr.length - 1; i >= 0; i--) {
      output[count[arr[i]] - 1] = arr[i];
      count[arr[i]]--;
  }

  System.arraycopy(output, 0, arr, 0, arr.length);
}`,

      javaScript: `function countingSort(arr) {
  let max_val = Math.max(...arr);
  let count = new Array(max_val + 1).fill(0);
  let output = new Array(arr.length);

  arr.forEach(num => count[num]++);
  
  for (let i = 1; i < count.length; i++)
      count[i] += count[i - 1];

  for (let i = arr.length - 1; i >= 0; i--) {
      output[count[arr[i]] - 1] = arr[i];
      count[arr[i]]--;
  }

  return output;
}`,

      c: `void countingSort(int arr[], int n) {
  int max_val = arr[0];
  for (int i = 1; i < n; i++)
      if (arr[i] > max_val)
          max_val = arr[i];

  int count[max_val + 1], output[n];
  memset(count, 0, sizeof(count));

  for (int i = 0; i < n; i++)
      count[arr[i]]++;

  for (int i = 1; i <= max_val; i++)
      count[i] += count[i - 1];

  for (int i = n - 1; i >= 0; i--) {
      output[count[arr[i]] - 1] = arr[i];
      count[arr[i]]--;
  }

  for (int i = 0; i < n; i++)
      arr[i] = output[i];
}`,
    },
    radix: {
      name: "Radix Sort",
      python: `def radixSort(arr):
  max_val = max(arr)
  exp = 1
  while max_val // exp > 0:
      n = len(arr)
      output = [0] * n
      count = [0] * 10

      for i in range(n):
          index = (arr[i] // exp) % 10
          count[index] += 1

      for i in range(1, 10):
          count[i] += count[i - 1]

      for i in range(n - 1, -1, -1):
          index = (arr[i] // exp) % 10
          output[count[index] - 1] = arr[i]
          count[index] -= 1

      for i in range(n):
          arr[i] = output[i]

      exp *= 10`,

      "c++": `void radixSort(int arr[], int n) {
  int max_val = *max_element(arr, arr + n);
  for (int exp = 1; max_val / exp > 0; exp *= 10) {
      int output[n], count[10] = {0};

      for (int i = 0; i < n; i++)
          count[(arr[i] / exp) % 10]++;

      for (int i = 1; i < 10; i++)
          count[i] += count[i - 1];

      for (int i = n - 1; i >= 0; i--) {
          output[count[(arr[i] / exp) % 10] - 1] = arr[i];
          count[(arr[i] / exp) % 10]--;
      }

      for (int i = 0; i < n; i++)
          arr[i] = output[i];
  }
}`,

      java: `void radixSort(int[] arr) {
  int max_val = Arrays.stream(arr).max().getAsInt();
  for (int exp = 1; max_val / exp > 0; exp *= 10) {
      int n = arr.length;
      int[] output = new int[n];
      int[] count = new int[10];

      for (int i = 0; i < n; i++)
          count[(arr[i] / exp) % 10]++;

      for (int i = 1; i < 10; i++)
          count[i] += count[i - 1];

      for (int i = n - 1; i >= 0; i--) {
          output[count[(arr[i] / exp) % 10] - 1] = arr[i];
          count[(arr[i] / exp) % 10]--;
      }

      System.arraycopy(output, 0, arr, 0, n);
  }
}`,

      javaScript: `function radixSort(arr) {
  let max_val = Math.max(...arr);
  for (let exp = 1; Math.floor(max_val / exp) > 0; exp *= 10) {
      let n = arr.length;
      let output = new Array(n).fill(0);
      let count = new Array(10).fill(0);

      for (let i = 0; i < n; i++)
          count[Math.floor(arr[i] / exp) % 10]++;

      for (let i = 1; i < 10; i++)
          count[i] += count[i - 1];

      for (let i = n - 1; i >= 0; i--) {
          let index = Math.floor(arr[i] / exp) % 10];
          output[count[index] - 1] = arr[i];
          count[index]--;
      }

      for (let i = 0; i < n; i++)
          arr[i] = output[i];
  }
}`,

      c: `void radixSort(int arr[], int n) {
  int max_val = arr[0];
  for (int i = 1; i < n; i++)
      if (arr[i] > max_val)
          max_val = arr[i];

  for (int exp = 1; max_val / exp > 0; exp *= 10) {
      int output[n], count[10] = {0};

      for (int i = 0; i < n; i++)
          count[(arr[i] / exp) % 10]++;

      for (int i = 1; i < 10; i++)
          count[i] += count[i - 1];

      for (int i = n - 1; i >= 0; i--) {
          output[count[(arr[i] / exp) % 10] - 1] = arr[i];
          count[(arr[i] / exp) % 10]--;
      }

      for (int i = 0; i < n; i++)
          arr[i] = output[i];
  }
}`,
    },
    bucket: {
      name: "Bucket Sort",
      python: `def bucketSort(arr):
if len(arr) == 0:
    return arr

bucket_count = len(arr)
max_val, min_val = max(arr), min(arr)
bucket_range = (max_val - min_val) / bucket_count
buckets = [[] for _ in range(bucket_count)]

for num in arr:
    index = int((num - min_val) / bucket_range)
    if index == bucket_count:
        index -= 1
    buckets[index].append(num)

for bucket in buckets:
    bucket.sort()

return [num for bucket in buckets for num in bucket]`,

      "c++": `void bucketSort(vector<float> &arr) {
int n = arr.size();
if (n == 0) return;

vector<vector<float>> buckets(n);
float max_val = *max_element(arr.begin(), arr.end());
float min_val = *min_element(arr.begin(), arr.end());
float range = (max_val - min_val) / n;

for (float num : arr) {
    int index = (num - min_val) / range;
    if (index == n) index--;
    buckets[index].push_back(num);
}

for (auto &bucket : buckets)
    sort(bucket.begin(), bucket.end());

int idx = 0;
for (auto &bucket : buckets)
    for (float num : bucket)
        arr[idx++] = num;
}`,

      java: `void bucketSort(float[] arr) {
if (arr.length == 0) return;

int n = arr.length;
List<List<Float>> buckets = new ArrayList<>(n);
for (int i = 0; i < n; i++) buckets.add(new ArrayList<>());

float max_val = Arrays.stream(arr).max().getAsFloat();
float min_val = Arrays.stream(arr).min().getAsFloat();
float range = (max_val - min_val) / n;

for (float num : arr) {
    int index = (int) ((num - min_val) / range);
    if (index == n) index--;
    buckets.get(index).add(num);
}

for (List<Float> bucket : buckets)
    Collections.sort(bucket);

int idx = 0;
for (List<Float> bucket : buckets)
    for (float num : bucket)
        arr[idx++] = num;
}`,

      javaScript: `function bucketSort(arr) {
if (arr.length === 0) return arr;

let n = arr.length;
let max_val = Math.max(...arr);
let min_val = Math.min(...arr);
let range = (max_val - min_val) / n;
let buckets = Array.from({ length: n }, () => []);

arr.forEach(num => {
    let index = Math.floor((num - min_val) / range);
    if (index === n) index--;
    buckets[index].push(num);
});

buckets.forEach(bucket => bucket.sort((a, b) => a - b));

return [].concat(...buckets);
}`,

      c: `int compare(const void* a, const void* b) {
    return (*(float*)a > *(float*)b) - (*(float*)a < *(float*)b);
}

void bucketSort(float arr[], int n) {
    if (n == 0) return;

    float min_val = arr[0], max_val = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < min_val) min_val = arr[i];
        if (arr[i] > max_val) max_val = arr[i];
    }

    float range = (max_val - min_val) / n;
    float buckets[n][n];  
    int bucket_sizes[n];  

    for (int i = 0; i < n; i++) bucket_sizes[i] = 0;

    for (int i = 0; i < n; i++) {
        int index = (arr[i] - min_val) / range;
        if (index == n) index--;
        buckets[index][bucket_sizes[index]++] = arr[i];
    }`,
    },
  };

  const generateSteps = (inputArray) => {
    const steps = [];
    const arr = [...inputArray];
    const n = arr.length;
    const history = [];

    if (selectedAlgorithm === "quick") {
      const quickSortWithSteps = (array, low, high) => {
        if (low < high) {
          // Show the current subarray being processed
          steps.push({
            array: [...array],
            i: low,
            j: high,
            highlightLine: 2,
            action: `Processing subarray [${array.slice(low, high + 1).join(", ")}]`,
            pivotIndex: pivotIndex,
          });
          history.push(
            `Step ${steps.length}: Processing subarray [${array.slice(low, high + 1).join(", ")}] - <span style="color: var(--light-yellow)">Array state: [${array.join(", ")}]</span>`
          );

          // Validate and adjust pivot index if needed
          let actualPivotIndex = Math.min(Math.max(low + pivotIndex, low), high);
          
          // Swap the selected pivot with the last element
          if (actualPivotIndex !== high) {
            [array[actualPivotIndex], array[high]] = [array[high], array[actualPivotIndex]];
            steps.push({
              array: [...array],
              i: actualPivotIndex,
              j: high,
              highlightLine: 3,
              action: `Swapped pivot ${array[high]} to the end`,
              pivotIndex: high,
            });
            history.push(
              `Step ${steps.length}: Swapped pivot ${array[high]} to the end - <span style="color: var(--light-yellow)">Array state: [${array.join(", ")}]</span>`
            );
          }

          let pivot = array[high];
          let i = low - 1;

          steps.push({
            array: [...array],
            i: high,
            j: null,
            highlightLine: 4,
            action: `Selected ${pivot} as pivot`,
            pivotIndex: high,
          });
          history.push(
            `Step ${steps.length}: Selected ${pivot} as pivot - <span style="color: var(--light-yellow)">Array state: [${array.join(", ")}]</span>`
          );

          for (let j = low; j < high; j++) {
            steps.push({
              array: [...array],
              i: i,
              j: j,
              highlightLine: 5,
              action: `Comparing ${array[j]} with pivot ${pivot}`,
              pivotIndex: high,
            });
            history.push(
              `Step ${steps.length}: Comparing ${array[j]} with pivot ${pivot} - <span style="color: var(--light-yellow)">Array state: [${array.join(", ")}]</span>`
            );

            if (array[j] < pivot) {
              i++;
              [array[i], array[j]] = [array[j], array[i]];
              steps.push({
                array: [...array],
                i: i,
                j: j,
                highlightLine: 6,
                action: `Swapped ${array[i]} and ${array[j]}`,
                pivotIndex: high,
              });
              history.push(
                `Step ${steps.length}: Swapped ${array[i]} and ${array[j]} - <span style="color: var(--light-yellow)">Array state: [${array.join(", ")}]</span>`
              );
            }
          }

          [array[i + 1], array[high]] = [array[high], array[i + 1]];
          steps.push({
            array: [...array],
            i: i + 1,
            j: high,
            highlightLine: 7,
            action: `Placed pivot ${pivot} in its correct position`,
            pivotIndex: i + 1,
          });
          history.push(
            `Step ${steps.length}: Placed pivot ${pivot} in its correct position - <span style="color: var(--light-yellow)">Array state: [${array.join(", ")}]</span>`
          );

          const partitionIndex = i + 1;
          quickSortWithSteps(array, low, partitionIndex - 1);
          quickSortWithSteps(array, partitionIndex + 1, high);
        }
      };

      quickSortWithSteps(arr, 0, n - 1);
    } else if (selectedAlgorithm === "merge") {
      const mergeSortWithSteps = (array, start, end) => {
        if (start >= end) {
          steps.push({
            array: [...array],
            i: start,
            j: null,
            highlightLine: 2,
            action: `Single element [${array[start]}]`,
            leftSubarray: [],
            rightSubarray: [],
            dividing: true,
          });
          history.push(
            `Step ${steps.length}: Single element [${array[start]}] - <span style="color: var(--light-yellow)">Array state: [${array.join(", ")}]</span>`
          );
          return;
        }

        const middle = Math.floor((start + end) / 2);

        // Show division step
        steps.push({
          array: [...array],
          i: start,
          j: end,
          highlightLine: 3,
          action: `Dividing array [${array.slice(start, end + 1).join(",")}] into left [${array.slice(start, middle + 1).join(",")}] and right [${array.slice(middle + 1, end + 1).join(",")}]`,
          leftSubarray: array.slice(start, middle + 1),
          rightSubarray: array.slice(middle + 1, end + 1),
          dividing: true,
        });
        history.push(
          `Step ${steps.length}: Dividing array [${array.slice(start, end + 1).join(",")}] into left [${array.slice(start, middle + 1).join(",")}] and right [${array.slice(middle + 1, end + 1).join(",")}] - <span style="color: var(--light-yellow)">Array state: [${array.join(", ")}]</span>`
        );

        // Recursively sort left and right halves
        mergeSortWithSteps(array, start, middle);
        mergeSortWithSteps(array, middle + 1, end);

        // Create temporary arrays for merging
        const leftSize = middle - start + 1;
        const rightSize = end - middle;
        const leftArray = new Array(leftSize);
        const rightArray = new Array(rightSize);

        // Copy to left array
        for (let i = 0; i < leftSize; i++) {
          leftArray[i] = array[start + i];
          steps.push({
            array: [...array],
            i: start + i,
            j: null,
            highlightLine: 10,
            action: `Creating temporary arrays: Copying ${array[start + i]} to left array at position ${i}`,
            leftSubarray: leftArray.slice(0, i + 1),
            rightSubarray: [],
            copying: true,
            merging: true,
          });
          history.push(
            `Step ${steps.length}: Creating temporary arrays - Copying ${array[start + i]} to left array at position ${i} - <span style="color: var(--light-yellow)">Array state: [${array.join(", ")}]</span>`
          );
        }

        // Copy to right array
        for (let i = 0; i < rightSize; i++) {
          rightArray[i] = array[middle + 1 + i];
          steps.push({
            array: [...array],
            i: middle + 1 + i,
            j: null,
            highlightLine: 15,
            action: `Creating temporary arrays: Copying ${array[middle + 1 + i]} to right array at position ${i}`,
            leftSubarray: leftArray,
            rightSubarray: rightArray.slice(0, i + 1),
            copying: true,
            merging: true,
          });
          history.push(
            `Step ${steps.length}: Creating temporary arrays - Copying ${array[middle + 1 + i]} to right array at position ${i} - <span style="color: var(--light-yellow)">Array state: [${array.join(", ")}]</span>`
          );
        }

        // Merge process
        let i = 0,
          j = 0,
          k = start;

        steps.push({
          array: [...array],
          i: start,
          j: end,
          highlightLine: 20,
          action: `Starting merge of left [${leftArray.join(",")}] and right [${rightArray.join(",")}]`,
          leftSubarray: leftArray,
          rightSubarray: rightArray,
          comparing: true,
          merging: true,
        });
        history.push(
          `Step ${steps.length}: Starting merge of left [${leftArray.join(",")}] and right [${rightArray.join(",")}] - <span style="color: var(--light-yellow)">Array state: [${array.join(", ")}]</span>`
        );

        while (i < leftSize && j < rightSize) {
          steps.push({
            array: [...array],
            i: start + i,
            j: middle + 1 + j,
            highlightLine: 25,
            action: `Comparing left[${i}]=${leftArray[i]} with right[${j}]=${rightArray[j]}`,
            leftSubarray: leftArray,
            rightSubarray: rightArray,
            comparing: true,
            merging: true,
          });
          history.push(
            `Step ${steps.length}: Comparing left[${i}]=${leftArray[i]} with right[${j}]=${rightArray[j]} - <span style="color: var(--light-yellow)">Array state: [${array.join(", ")}]</span>`
          );

          if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            steps.push({
              array: [...array],
              i: k,
              j: null,
              highlightLine: 26,
              action: `Copying ${leftArray[i]} from left array to position ${k}`,
              leftSubarray: leftArray,
              rightSubarray: rightArray,
              copying: true,
              merging: true,
            });
            history.push(
              `Step ${steps.length}: Copying ${leftArray[i]} from left array to position ${k} - <span style="color: var(--light-yellow)">Array state: [${array.join(", ")}]</span>`
            );
            i++;
          } else {
            array[k] = rightArray[j];
            steps.push({
              array: [...array],
              i: k,
              j: null,
              highlightLine: 29,
              action: `Copying ${rightArray[j]} from right array to position ${k}`,
              leftSubarray: leftArray,
              rightSubarray: rightArray,
              copying: true,
              merging: true,
            });
            history.push(
              `Step ${steps.length}: Copying ${rightArray[j]} from right array to position ${k} - <span style="color: var(--light-yellow)">Array state: [${array.join(", ")}]</span>`
            );
            j++;
          }
          k++;
        }

        // Copy remaining elements from left array
        while (i < leftSize) {
          array[k] = leftArray[i];
          steps.push({
            array: [...array],
            i: k,
            j: null,
            highlightLine: 35,
            action: `Copying remaining element ${leftArray[i]} from left array to position ${k}`,
            leftSubarray: leftArray,
            rightSubarray: rightArray,
            copying: true,
            merging: true,
          });
          history.push(
            `Step ${steps.length}: Copying remaining element ${leftArray[i]} from left array to position ${k} - <span style="color: var(--light-yellow)">Array state: [${array.join(", ")}]</span>`
          );
          i++;
          k++;
        }

        // Copy remaining elements from right array
        while (j < rightSize) {
          array[k] = rightArray[j];
          steps.push({
            array: [...array],
            i: k,
            j: null,
            highlightLine: 41,
            action: `Copying remaining element ${rightArray[j]} from right array to position ${k}`,
            leftSubarray: leftArray,
            rightSubarray: rightArray,
            copying: true,
            merging: true,
          });
          history.push(
            `Step ${steps.length}: Copying remaining element ${rightArray[j]} from right array to position ${k} - <span style="color: var(--light-yellow)">Array state: [${array.join(", ")}]</span>`
          );
          j++;
          k++;
        }
      };

      mergeSortWithSteps(arr, 0, n - 1);
    } else if (selectedAlgorithm === "bubble") {
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          steps.push({
            array: [...arr],
            i,
            j,
            highlightLine: 4,
            action: `Comparing elements at positions ${j} and ${j + 1}`,
          });
          history.push(
            `Step ${steps.length}: Comparing arr[${j}]=${arr[j]} and arr[${j + 1}]=${arr[j + 1]} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
          );

          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            steps.push({
              array: [...arr],
              i,
              j,
              highlightLine: 5,
              action: `Swapped elements ${arr[j]} and ${arr[j + 1]}`,
            });
            history.push(
              `Step ${steps.length}: Swapped arr[${j}]=${arr[j]} and arr[${j + 1}]=${arr[j + 1]} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
            );
          }
        }
        steps.push({
          array: [...arr],
          i,
          j: null,
          highlightLine: 3,
          action: `Completed pass ${i + 1}`,
        });
        history.push(
          `Step ${steps.length}: Completed pass ${i + 1} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
        );
      }
    } else if (selectedAlgorithm === "selection") {
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        steps.push({
          array: [...arr],
          i,
          j: null,
          highlightLine: 3,
          action: `Starting new pass from index ${i}`,
        });
        history.push(
          `Step ${steps.length}: Starting new pass from index i=${i}, arr[${i}]=${arr[i]} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
        );

        for (let j = i + 1; j < n; j++) {
          steps.push({
            array: [...arr],
            i: minIdx,
            j,
            highlightLine: 4,
            action: `Comparing ${arr[j]} with current minimum ${arr[minIdx]}`,
          });
          history.push(
            `Step ${steps.length}: Comparing arr[${j}]=${arr[j]} with current minimum arr[${minIdx}]=${arr[minIdx]} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
          );

          if (arr[j] < arr[minIdx]) {
            minIdx = j;
            steps.push({
              array: [...arr],
              i,
              j,
              highlightLine: 5,
              action: `Found new minimum ${arr[minIdx]} at index ${minIdx}`,
            });
            history.push(
              `Step ${steps.length}: Found new minimum arr[${minIdx}]=${arr[minIdx]} at index ${minIdx} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
            );
          }
        }

        if (minIdx !== i) {
          [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
          steps.push({
            array: [...arr],
            i,
            j: minIdx,
            highlightLine: 6,
            action: `Swapped ${arr[i]} to position ${i}`,
          });
          history.push(
            `Step ${steps.length}: Swapped arr[${i}]=${arr[i]} with arr[${minIdx}]=${arr[minIdx]} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
          );
        }
      }
    } else if (selectedAlgorithm === "insertion") {
      for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        steps.push({
          array: [...arr],
          i,
          j: i,
          highlightLine: 2,
          action: `Selected ${key} as key`,
        });
        history.push(
          `Step ${steps.length}: Selected arr[${i}]=${key} as key - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
        );

        while (j >= 0 && arr[j] > key) {
          steps.push({
            array: [...arr],
            i,
            j,
            highlightLine: 4,
            action: `Comparing ${arr[j]} with key ${key}`,
          });
          history.push(
            `Step ${steps.length}: Comparing arr[${j}]=${arr[j]} with key=${key} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
          );

          arr[j + 1] = arr[j];
          steps.push({
            array: [...arr],
            i,
            j,
            highlightLine: 5,
            action: `Moved ${arr[j]} one position ahead`,
          });
          history.push(
            `Step ${steps.length}: Moved arr[${j}]=${arr[j]} one position ahead to index ${j + 1} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
          );
          j--;
        }

        arr[j + 1] = key;
        steps.push({
          array: [...arr],
          i,
          j: j + 1,
          highlightLine: 7,
          action: `Inserted ${key} at position ${j + 1}`,
        });
        history.push(
          `Step ${steps.length}: Inserted key=${key} at position ${j + 1} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
        );
      }
    }

    steps.push({
      array: [...arr],
      i: null,
      j: null,
      highlightLine: null,
      action: "Sorting completed",
    });
    history.push(
      `Step ${steps.length}: Sorting completed - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
    );

    return { steps, history };
  };

  const startVisualization = (input) => {
    setWarning(""); // Clear any existing warnings
    if (!input) {
      setWarning("Please enter an array of numbers");
      return;
    }

    console.log("Input received:", input);
    setInputValue(input);

    const newArray = input.split(",").map((num) => parseInt(num.trim()));
    console.log("Parsed array:", newArray);

    if (newArray.some(isNaN)) {
      setWarning("Please enter valid numbers separated by commas");
      return;
    }

    if (newArray.length > 10) {
      setWarning("Maximum 10 elements are allowed for visualization");
      return;
    }

    if (selectedAlgorithm === "quick" && pivotIndex >= newArray.length) {
      setWarning(`Pivot index cannot be larger than array length - 1 (${newArray.length - 1})`);
      setPivotIndex(newArray.length - 1);
      return;
    }

    console.log("Selected algorithm:", selectedAlgorithm);
    const { steps: newSteps, history: newHistory } = generateSteps(newArray);
    console.log("Generated steps:", newSteps);

    setSteps(newSteps);
    setHistory(newHistory);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const lastStep = () => {
    setCurrentStep(steps.length - 1);
  };

  const togglePlay = () => {
    if (steps.length === 0) {
      // If no visualization is running, start a new one
      const inputValue = document.getElementById("arrayInput").value;
      if (!inputValue) {
        alert("Please enter an array of numbers");
        return;
      }
      startVisualization(inputValue);
      setIsPlaying(true);
    } else {
      // If visualization exists, toggle play/pause
      setIsPlaying(!isPlaying);
    }
  };

  const refreshVisualization = () => {
    setSteps([]);
    setHistory([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setInputValue("");
  };

  useEffect(() => {
    let timer;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);

  // Add useEffect for auto-scrolling
  useEffect(() => {
    if (historyListRef.current) {
      historyListRef.current.scrollTop = historyListRef.current.scrollHeight;
    }
  }, [currentStep]);

  return (
    <div className="sorting-visualizer">
      <div className="visualizer-overlay" onClick={onClose}></div>
      <div className="visualizer-content">
        {warning && (
          <div className="warning-message" style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#ff6b6b',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            zIndex: 1000,
            animation: 'fadeIn 0.3s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <i className="fa-solid fa-triangle-exclamation"></i>
            {warning}
            <button 
              onClick={() => setWarning("")}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                marginLeft: '10px',
                padding: '0 5px'
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        )}
        <button
          className="refresh-button"
          onClick={refreshVisualization}
          title="Reset Visualization"
        >
          <i class="fa-solid fa-rotate-right"></i>
        </button>
        <button className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
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
                <option value="merge">Merge Sort</option>
                <option value="quick">Quick Sort</option>
                <option value="heap">Heap Sort</option>
                <option value="shell">Shell Sort</option>
                <option value="counting">Counting Sort</option>
                <option value="radix">Radix Sort</option>
                <option value="bucket">Bucket Sort</option>
              </select>
            </div>
            <div className="input-controls">
              <div className="array-input-section">
                <label htmlFor="arrayInput">Enter Array: </label>
                <input
                  type="text"
                  id="arrayInput"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter up to 10 numbers (e.g., 64,34,25,12,22)"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      togglePlay();
                    }
                  }}
                />
                {selectedAlgorithm === "quick" && (
                  <div className="pivot-input-section">
                    <label htmlFor="pivotInput">Pivot Index: </label>
                    <input
                      type="number"
                      id="pivotInput"
                      min="0"
                      max={inputValue ? inputValue.split(",").length - 1 : 9}
                      value={pivotIndex}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value) || 0;
                        const maxIndex = inputValue ? inputValue.split(",").length - 1 : 9;
                        if (newValue > maxIndex) {
                          setWarning(`Pivot index cannot be larger than array length - 1 (${maxIndex})`);
                          setPivotIndex(maxIndex);
                        } else {
                          setPivotIndex(newValue);
                          setWarning(""); // Clear warning when valid input is provided
                        }
                      }}
                      style={{ width: '60px', marginLeft: '8px' }}
                    />
                    <span className="pivot-warning" style={{ fontSize: '0.8em', color: '#ff6b6b', marginLeft: '8px' }}>
                      Max index: {inputValue ? inputValue.split(",").length - 1 : 9}
                    </span>
                  </div>
                )}
              </div>
              <div className="playback-controls">
                <button className="play-pause" onClick={togglePlay}>
                  <i
                    className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play"}`}
                  ></i>
                </button>

                <div className="speed-control">
                  <label>Speed:</label>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="100"
                    value={speed}
                    onChange={(e) => setSpeed(parseInt(e.target.value))}
                  />
                  <span>{Math.round(10000 / speed) / 10}x</span>
                </div>
              </div>
            </div>
            <div className="navigation-buttons">
              <button
                onClick={() => {
                  const inputValue =
                    document.getElementById("arrayInput").value;
                  startVisualization(inputValue);
                }}
                disabled={isPlaying}
              >
                Start
              </button>
              <button
                onClick={() => setCurrentStep(0)}
                disabled={isPlaying || currentStep === 0}
              >
                <i className="fa-solid fa-backward"></i> First
              </button>
              <button
                onClick={prevStep}
                disabled={isPlaying || currentStep === 0}
              >
                <i className="fa-solid fa-caret-left"></i> Prev
              </button>
              <button
                onClick={nextStep}
                disabled={isPlaying || currentStep === steps.length - 1}
              >
                Next <i className="fa-solid fa-caret-right"></i>
              </button>
              <button
                onClick={lastStep}
                disabled={isPlaying || currentStep === steps.length - 1}
              >
                Last <i className="fa-solid fa-forward"></i>
              </button>
            </div>
          </div>
          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${(currentStep / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>
          <div className="array-display">
            <div className="phase-label">Array Elements</div>
            <div className="array-content">
              <div className="array-elements">
                {steps[currentStep]?.array?.map((value, index) => (
                  <div
                    key={index}
                    className={`array-element ${
                      index === steps[currentStep]?.i ||
                      index === steps[currentStep]?.j
                        ? "highlight"
                        : ""
                    }`}
                  >
                    {selectedAlgorithm !== "merge" &&
                      (index === steps[currentStep]?.i ||
                        index === steps[currentStep]?.j) && (
                          <div className="variable-label">
                            {index === steps[currentStep]?.i ? "i" : "j"}
                          </div>
                        )}
                      <div className="element-value">{value}</div>
                      <div className="element-index">{index}</div>
                  </div>
                ))}
              </div>
              {selectedAlgorithm === "merge" && steps[currentStep]?.merging && (
                <div className="subarrays">
                  {steps[currentStep]?.leftSubarray?.length > 0 && (
                    <div className="subarray left">
                      <div className="subarray-label">Merging Step</div>
                      <div className="subarray-label">Left Subarray</div>
                      <div className="subarray-elements">
                        {steps[currentStep]?.leftSubarray?.map((value, index) => (
                          <div key={index} className="array-element">
                            <div className="element-value">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {steps[currentStep]?.rightSubarray?.length > 0 && (
                    <div className="subarray right">
                      <div className="subarray-label">Right Subarray</div>
                      <div className="subarray-elements">
                        {steps[currentStep]?.rightSubarray?.map((value, index) => (
                          <div key={index} className="array-element">
                            <div className="element-value">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {selectedAlgorithm === "merge" && steps[currentStep]?.dividing && (
                <div className="subarrays">
                  <div className="subarray-label">Dividing Step</div>
                  <div className="subarray left">
                    <div className="subarray-label">Left Part</div>
                    <div className="subarray-elements">
                      {steps[currentStep]?.leftSubarray?.map((value, index) => (
                        <div key={index} className="array-element">
                          <div className="element-value">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="subarray right">
                    <div className="subarray-label">Right Part</div>
                    <div className="subarray-elements">
                      {steps[currentStep]?.rightSubarray?.map((value, index) => (
                        <div key={index} className="array-element">
                          <div className="element-value">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
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
              <option value="javaScript">JavaScript</option>
              <option value="c">C</option>
            </select>
          </div>
          <div className="code-box">
            {algorithms[selectedAlgorithm][selectedLanguage]
              .split("\n")
              .map((line, index) => (
                <div
                  key={index}
                  className={`code-line ${
                    steps[currentStep]?.highlightLine === index + 1
                      ? "highlight"
                      : ""
                  }`}
                >
                  <span className="line-number">{index + 1}</span>
                  <span className="line-content">{line}</span>
                </div>
              ))}
          </div>
          <div className="step-history">
            <h4>Step History:</h4>
            <div className="history-list" ref={historyListRef}>
              {history.slice(0, currentStep + 1).map((step, index) => (
                <div
                  key={index}
                  className={`history-item ${
                    index === currentStep ? "current" : ""
                  }`}
                  dangerouslySetInnerHTML={{ __html: step }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;

