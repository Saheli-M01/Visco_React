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
  const [rangeMin, setRangeMin] = useState(1);
  const [rangeMax, setRangeMax] = useState(20);

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
    quick: {
      name: "Quick Sort",
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
      python: `def countingSort(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10

    # Store count of occurrences
    for i in range(n):
        index = arr[i] // exp
        count[index % 10] += 1

    # Change count[i] so that count[i] now contains actual
    # position of this digit in output[]
    for i in range(1, 10):
        count[i] += count[i - 1]

    # Build the output array
    i = n - 1
    while i >= 0:
        index = arr[i] // exp
        output[count[index % 10] - 1] = arr[i]
        count[index % 10] -= 1
        i -= 1

    # Copy the output array to arr[]
    for i in range(n):
        arr[i] = output[i]

def radixSort(arr):
    # Find the maximum number to know number of digits
    max_num = max(arr)
    
    # Do counting sort for every digit
    exp = 1
    while max_num // exp > 0:
        countingSort(arr, exp)
        exp *= 10
    return arr`,
      "c++": `void countingSort(int arr[], int n, int exp) {
    int output[n];
    int count[10] = {0};

    // Store count of occurrences
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;

    // Change count[i] so that count[i] now contains actual
    // position of this digit in output[]
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];

    // Build the output array
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }

    // Copy the output array to arr[]
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}

void radixSort(int arr[], int n) {
    // Find the maximum number to know number of digits
    int max_num = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > max_num)
            max_num = arr[i];

    // Do counting sort for every digit
    for (int exp = 1; max_num / exp > 0; exp *= 10)
        countingSort(arr, n, exp);
}`,
      java: `void countingSort(int arr[], int n, int exp) {
    int output[] = new int[n];
    int count[] = new int[10];
    Arrays.fill(count, 0);

    // Store count of occurrences
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;

    // Change count[i] so that count[i] now contains
    // actual position of this digit in output[]
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];

    // Build the output array
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }

    // Copy the output array to arr[]
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}

void radixSort(int arr[]) {
    int n = arr.length;
    
    // Find the maximum number to know number of digits
    int max_num = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > max_num)
            max_num = arr[i];

    // Do counting sort for every digit
    for (int exp = 1; max_num / exp > 0; exp *= 10)
        countingSort(arr, n, exp);
}`,
      javaScript: `function countingSort(arr, exp) {
    let n = arr.length;
    let output = new Array(n).fill(0);
    let count = new Array(10).fill(0);

    // Store count of occurrences
    for (let i = 0; i < n; i++) {
        let index = Math.floor(arr[i] / exp) % 10;
        count[index]++;
    }

    // Change count[i] so that count[i] now contains actual
    // position of this digit in output[]
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
        let index = Math.floor(arr[i] / exp) % 10;
        output[count[index] - 1] = arr[i];
        count[index]--;
    }

    // Copy the output array to arr[]
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

function radixSort(arr) {
    // Find the maximum number to know number of digits
    let max_num = Math.max(...arr);

    // Do counting sort for every digit
    for (let exp = 1; Math.floor(max_num / exp) > 0; exp *= 10) {
        countingSort(arr, exp);
    }
    return arr;
}`,
      c: `void countingSort(int arr[], int n, int exp) {
    int output[n];
    int count[10] = {0};

    // Store count of occurrences
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;

    // Change count[i] so that count[i] now contains actual
    // position of this digit in output[]
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];

    // Build the output array
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }

    // Copy the output array to arr[]
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}

void radixSort(int arr[], int n) {
    // Find the maximum number to know number of digits
    int max_num = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > max_num)
            max_num = arr[i];

    // Do counting sort for every digit
    for (int exp = 1; max_num / exp > 0; exp *= 10)
        countingSort(arr, n, exp);
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
          key: key, // Add key to the step
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
            key: key, // Add key to the step
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
            key: key, // Add key to the step
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
          key: key, // Add key to the step
        });
        history.push(
          `Step ${steps.length}: Inserted key=${key} at position ${j + 1} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
        );
      }
    } else if (selectedAlgorithm === "heap") {
      const heapifyWithSteps = (arr, n, i) => {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        steps.push({
          array: [...arr],
          i: i,
          j: null,
          highlightLine: 3,
          action: `Heapifying subtree rooted at index ${i}`,
          heapNodes: { root: i, left: left < n ? left : null, right: right < n ? right : null }
        });
        history.push(
          `Step ${steps.length}: Heapifying subtree rooted at index ${i} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
        );

        // Check if left child is larger than root
        if (left < n) {
          steps.push({
            array: [...arr],
            i: i,
            j: left,
            highlightLine: 4,
            action: `Comparing left child ${arr[left]} with root ${arr[largest]}`,
            heapNodes: { root: i, left: left, right: right < n ? right : null }
          });
          history.push(
            `Step ${steps.length}: Comparing left child arr[${left}]=${arr[left]} with root arr[${largest}]=${arr[largest]} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
          );

          if (arr[left] > arr[largest]) {
            largest = left;
            steps.push({
              array: [...arr],
              i: i,
              j: left,
              highlightLine: 5,
              action: `Left child ${arr[left]} is larger than root`,
              heapNodes: { root: largest, left: left, right: right < n ? right : null }
            });
            history.push(
              `Step ${steps.length}: Left child ${arr[left]} is larger than root - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
            );
          }
        }

        // Check if right child is larger than largest so far
        if (right < n) {
          steps.push({
            array: [...arr],
            i: largest,
            j: right,
            highlightLine: 6,
            action: `Comparing right child ${arr[right]} with largest ${arr[largest]}`,
            heapNodes: { root: i, left: left < n ? left : null, right: right }
          });
          history.push(
            `Step ${steps.length}: Comparing right child arr[${right}]=${arr[right]} with largest arr[${largest}]=${arr[largest]} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
          );

          if (arr[right] > arr[largest]) {
            largest = right;
            steps.push({
              array: [...arr],
              i: i,
              j: right,
              highlightLine: 7,
              action: `Right child ${arr[right]} is the largest`,
              heapNodes: { root: largest, left: left < n ? left : null, right: right }
            });
            history.push(
              `Step ${steps.length}: Right child ${arr[right]} is the largest - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
            );
          }
        }

        // If largest is not root
        if (largest !== i) {
          [arr[i], arr[largest]] = [arr[largest], arr[i]];
          steps.push({
            array: [...arr],
            i: i,
            j: largest,
            highlightLine: 8,
            action: `Swapped ${arr[i]} and ${arr[largest]}`,
            heapNodes: { root: i, left: left < n ? left : null, right: right < n ? right : null }
          });
          history.push(
            `Step ${steps.length}: Swapped arr[${i}]=${arr[i]} and arr[${largest}]=${arr[largest]} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
          );

          // Recursively heapify the affected sub-tree
          heapifyWithSteps(arr, n, largest);
        }
      };

      // Build max heap
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        steps.push({
          array: [...arr],
          i: i,
          j: null,
          highlightLine: 2,
          action: `Building max heap: processing index ${i}`,
          phase: "build"
        });
        history.push(
          `Step ${steps.length}: Building max heap - processing index ${i} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
        );
        heapifyWithSteps(arr, n, i);
      }

      // Extract elements from heap one by one
      for (let i = n - 1; i > 0; i--) {
        steps.push({
          array: [...arr],
          i: 0,
          j: i,
          highlightLine: 9,
          action: `Moving root ${arr[0]} to end`,
          phase: "extract"
        });
        history.push(
          `Step ${steps.length}: Moving root ${arr[0]} to end - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
        );

        [arr[0], arr[i]] = [arr[i], arr[0]];
        steps.push({
          array: [...arr],
          i: 0,
          j: i,
          highlightLine: 10,
          action: `Swapped root with last element`,
          phase: "extract"
        });
        history.push(
          `Step ${steps.length}: Swapped root with last element - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
        );

        heapifyWithSteps(arr, i, 0);
      }
    } else if (selectedAlgorithm === "shell") {
      let gap = Math.floor(n / 2);

      while (gap > 0) {
        steps.push({
          array: [...arr],
          i: null,
          j: null,
          highlightLine: 2,
          action: `Setting gap size to ${gap}`,
          gap: gap
        });
        history.push(
          `Step ${steps.length}: Setting gap size to ${gap} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
        );

        for (let i = gap; i < n; i++) {
          let temp = arr[i];
          let j = i;

          steps.push({
            array: [...arr],
            i: i,
            j: null,
            highlightLine: 3,
            action: `Selecting element ${temp} at position ${i}`,
            gap: gap,
            temp: temp
          });
          history.push(
            `Step ${steps.length}: Selecting element ${temp} at position ${i} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
          );

          while (j >= gap && arr[j - gap] > temp) {
            steps.push({
              array: [...arr],
              i: j,
              j: j - gap,
              highlightLine: 4,
              action: `Comparing elements at positions ${j - gap} and ${j}`,
              gap: gap,
              temp: temp
            });
            history.push(
              `Step ${steps.length}: Comparing elements ${arr[j - gap]} and ${temp} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
            );

            arr[j] = arr[j - gap];
            steps.push({
              array: [...arr],
              i: j,
              j: j - gap,
              highlightLine: 5,
              action: `Moving element ${arr[j]} to position ${j}`,
              gap: gap,
              temp: temp
            });
            history.push(
              `Step ${steps.length}: Moving element ${arr[j]} to position ${j} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
            );

            j -= gap;
          }

          arr[j] = temp;
          steps.push({
            array: [...arr],
            i: j,
            j: null,
            highlightLine: 6,
            action: `Placing ${temp} at position ${j}`,
            gap: gap
          });
          history.push(
            `Step ${steps.length}: Placing ${temp} at position ${j} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`
          );
        }

        gap = Math.floor(gap / 2);
      }
    } else if (selectedAlgorithm === "counting") {
      // Create count array and output array
      const count = new Array(rangeMax - rangeMin + 1).fill(0);
      const output = new Array(n).fill(0);

      // Initialize output array with zeros
      steps.push({
        array: [...arr],
        outputArray: [...output],
        i: null,
        j: null,
        highlightLine: 3,
        action: "Initializing output array with zeros",
        count: [...count],
        phase: "initialization",
        rangeMin: rangeMin,
        rangeMax: rangeMax
      });
      history.push(`Step ${steps.length}: Initializing output array with zeros - <span style="color: var(--light-yellow)">Output array: [${output.join(", ")}]</span>`);

      // Count occurrences of each element
      for (let i = 0; i < n; i++) {
        const value = arr[i];
        const countIndex = value - rangeMin;
        count[countIndex]++;

        steps.push({
          array: [...arr],
          i: i,
          j: null,
          highlightLine: 4,
          action: `Counting element ${value}: incrementing count[${countIndex}] to ${count[countIndex]}`,
          count: [...count],
          phase: "counting",
          rangeMin: rangeMin,
          rangeMax: rangeMax,
          countIndex: countIndex
        });
        history.push(
          `Step ${steps.length}: Counting element ${value}:<br>` +
          `- Incrementing count[${countIndex}] to ${count[countIndex]}<br>` +
          `<span style="color: var(--light-yellow)">Count array: [${count.join(", ")}]</span>`
        );
      }

      // Calculate cumulative count
      for (let i = 1; i < count.length; i++) {
        const prevValue = count[i - 1];
        count[i] += prevValue;

        steps.push({
          array: [...arr],
          i: i,
          j: null,
          highlightLine: 7,
          action: `Calculating cumulative count: count[${i}] = count[${i}](${count[i] - prevValue}) + count[${i-1}](${prevValue}) = ${count[i]}`,
          count: [...count],
          phase: "cumulative",
          rangeMin: rangeMin,
          rangeMax: rangeMax
        });
        history.push(
          `Step ${steps.length}: Calculating cumulative count at index ${i}:<br>` +
          `- count[${i}] = count[${i}](${count[i] - prevValue}) + count[${i-1}](${prevValue}) = ${count[i]}<br>` +
          `<span style="color: var(--light-yellow)">Count array: [${count.join(", ")}]</span>`
        );
      }

      // Build output array by placing elements in their sorted positions
      for (let i = n - 1; i >= 0; i--) {
        const value = arr[i];
        const countIndex = value - rangeMin;
        const position = count[countIndex] - 1;
        output[position] = value;
        count[countIndex]--;

        steps.push({
          array: [...arr],
          outputArray: [...output],
          i: i,
          j: position,
          highlightLine: 11,
          action: `Reading ${value} from input[${i}], count[${countIndex}]=${count[countIndex] + 1}, placing at output[${position}]`,
          count: [...count],
          phase: "placing",
          rangeMin: rangeMin,
          rangeMax: rangeMax,
          value: value,
          countIndex: countIndex,
          readIndex: i
        });
        history.push(
          `Step ${steps.length}: Building output array:<br>` +
          `- Reading ${value} from input[${i}]<br>` +
          `- Using count[${countIndex}] = ${count[countIndex] + 1}<br>` +
          `- Placing at output[${position}]<br>` +
          `- Decreasing count[${countIndex}] to ${count[countIndex]}<br>` +
          `<span style="color: var(--light-yellow)">Output array: [${output.join(", ")}]</span>`
        );
      }

      // Final step
      steps.push({
        array: [...arr],
        outputArray: [...output],
        i: null,
        j: null,
        highlightLine: null,
        action: "Counting sort completed",
        count: [...count],
        phase: "completed",
        rangeMin: rangeMin,
        rangeMax: rangeMax
      });
      history.push(`Step ${steps.length}: Counting sort completed - <span style="color: var(--light-yellow)">Output array: [${output.join(", ")}]</span>`);
    } else if (selectedAlgorithm === "radix") {
      const getMax = (arr) => {
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
          if (arr[i] > max) max = arr[i];
        }
        return max;
      };

      const countingSortForRadix = (arr, exp) => {
        const output = new Array(n).fill(0);
        const count = new Array(10).fill(0);

        // Count occurrences
        for (let i = 0; i < n; i++) {
          const digit = Math.floor(arr[i] / exp) % 10;
          count[digit]++;
          steps.push({
            array: [...arr],
            i: i,
            j: null,
            highlightLine: 4,
            action: `Counting occurrence of digit ${digit} from ${arr[i]}`,
            count: [...count],
            digit,
            exp,
            phase: "counting"
          });
          history.push(`Step ${steps.length}: Counting digit ${digit} from ${arr[i]} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`);
        }

        // Calculate cumulative count
        for (let i = 1; i < 10; i++) {
          count[i] += count[i - 1];
          steps.push({
            array: [...arr],
            i: i,
            j: null,
            highlightLine: 7,
            action: `Calculating cumulative count for digit ${i}`,
            count: [...count],
            exp,
            phase: "cumulative"
          });
          history.push(`Step ${steps.length}: Calculating cumulative count for digit ${i} - <span style="color: var(--light-yellow)">Count array: [${count.join(", ")}]</span>`);
        }

        // Build output array
        for (let i = n - 1; i >= 0; i--) {
          const digit = Math.floor(arr[i] / exp) % 10;
          const position = count[digit] - 1;
          output[position] = arr[i];
          count[digit]--;

          steps.push({
            array: [...arr],
            i: i,
            j: position,
            highlightLine: 11,
            action: `Placing ${arr[i]} (digit ${digit}) at position ${position}`,
            count: [...count],
            digit,
            exp,
            phase: "placing",
            outputArray: [...output]
          });
          history.push(`Step ${steps.length}: Placing ${arr[i]} at position ${position} - <span style="color: var(--light-yellow)">Output array: [${output.join(", ")}]</span>`);
        }

        // Copy output array back to original array
        for (let i = 0; i < n; i++) {
          arr[i] = output[i];
        }
        
        // Add a step to show the array after this pass
        steps.push({
          array: [...arr],
          i: null,
          j: null,
          highlightLine: 15,
          action: `Completed sorting by digit at position ${Math.log10(exp) + 1}`,
          exp,
          phase: "completed_pass"
        });
        history.push(`Step ${steps.length}: Completed sorting by digit at position ${Math.log10(exp) + 1} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`);
      };

      const max = getMax(arr);
      for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        steps.push({
          array: [...arr],
          i: null,
          j: null,
          highlightLine: 2,
          action: `Sorting by digit at position ${Math.log10(exp) + 1}`,
          exp,
          phase: "start"
        });
        history.push(`Step ${steps.length}: Starting to sort by digit at position ${Math.log10(exp) + 1} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`);

        countingSortForRadix(arr, exp);
      }
    } else if (selectedAlgorithm === "bucket") {
      // Find max and min values first
      const max = Math.max(...arr);
      const min = Math.min(...arr);
      
      steps.push({
        array: [...arr],
        i: null,
        j: null,
        highlightLine: 1,
        action: `Finding array bounds: min = ${min}, max = ${max}`,
        phase: "array_bounds",
        maxValue: max,
        minValue: min
      });
      history.push(`Step ${steps.length}: Found array bounds - min: ${min}, max: ${max} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`);

      const bucketCount = Math.min(n, 5); // Use at most 5 buckets
      const bucketRange = (max - min) / bucketCount + 1;
      const buckets = Array.from({ length: bucketCount }, () => []);
      
      // Calculate bucket ranges
      const bucketRanges = Array.from({ length: bucketCount }, (_, i) => ({
        min: min + i * bucketRange,
        max: min + (i + 1) * bucketRange,
        label: `Bucket ${i}`
      }));

      steps.push({
        array: [...arr],
        i: null,
        j: null,
        highlightLine: 2,
        action: `Creating ${bucketCount} buckets with range ${bucketRange.toFixed(2)}`,
        buckets: buckets.map(bucket => [...bucket]),
        phase: "bucket_formation",
        maxValue: max,
        minValue: min,
        bucketRanges: bucketRanges,
        bucketDetails: bucketRanges.map((range, idx) => 
          `Bucket ${idx}: [${range.min.toFixed(2)} to ${range.max.toFixed(2)}]`
        ).join(", ")
      });
      history.push(`Step ${steps.length}: Created ${bucketCount} buckets - <span style="color: var(--light-yellow)">Ranges: ${bucketRanges.map((range, idx) => 
        `Bucket ${idx}: [${range.min.toFixed(2)} to ${range.max.toFixed(2)}]`
      ).join(", ")}</span>`);

      // Distribute elements into buckets
      for (let i = 0; i < n; i++) {
        const value = arr[i];
        const bucketIndex = Math.min(
          Math.floor((value - min) / bucketRange),
          bucketCount - 1
        );
        
        steps.push({
          array: [...arr],
          i: i,
          j: null,
          highlightLine: 3,
          action: `Calculating bucket for ${value}: (${value} - ${min}) / ${bucketRange.toFixed(2)} = ${bucketIndex}`,
          buckets: buckets.map(bucket => [...bucket]),
          phase: "calculation",
          currentElement: value,
          targetBucket: bucketIndex,
          maxValue: max,
          minValue: min,
          bucketRanges: bucketRanges,
          calculation: {
            value: value,
            min: min,
            range: bucketRange,
            result: bucketIndex
          }
        });
        history.push(`Step ${steps.length}: Calculating bucket for ${value} - <span style="color: var(--light-yellow)">Goes to Bucket ${bucketIndex} [${bucketRanges[bucketIndex].min.toFixed(2)} to ${bucketRanges[bucketIndex].max.toFixed(2)}]</span>`);

        buckets[bucketIndex].push(value);
        
        steps.push({
          array: [...arr],
          i: i,
          j: bucketIndex,
          highlightLine: 4,
          action: `Placed ${value} in Bucket ${bucketIndex} [${bucketRanges[bucketIndex].min.toFixed(2)} to ${bucketRanges[bucketIndex].max.toFixed(2)}]`,
          buckets: buckets.map(bucket => [...bucket]),
          phase: "distribution",
          currentElement: value,
          activeBucket: bucketIndex,
          maxValue: max,
          minValue: min,
          bucketRanges: bucketRanges,
          bucketContents: buckets.map((bucket, idx) => 
            `Bucket ${idx}: [${bucket.join(", ")}]`
          ).join(", ")
        });
        history.push(`Step ${steps.length}: Placed ${value} in Bucket ${bucketIndex} - <span style="color: var(--light-yellow)">Current bucket contents: [${buckets[bucketIndex].join(", ")}]</span>`);
      }

      // Sort individual buckets
      let currentIndex = 0;
      for (let i = 0; i < bucketCount; i++) {
        if (buckets[i].length > 0) {
          steps.push({
            array: [...arr],
            i: i,
            j: null,
            highlightLine: 7,
            action: `Sorting bucket ${i} with elements [${buckets[i].join(", ")}]`,
            buckets: buckets.map(bucket => [...bucket]),
            phase: "sorting",
            activeBucket: i,
            bucketRanges: bucketRanges
          });
          history.push(`Step ${steps.length}: Sorting bucket ${i} - <span style="color: var(--light-yellow)">Bucket contents: [${buckets[i].join(", ")}]</span>`);

          buckets[i].sort((a, b) => a - b);

          steps.push({
            array: [...arr],
            i: i,
            j: null,
            highlightLine: 8,
            action: `Sorted bucket ${i}: [${buckets[i].join(", ")}]`,
            buckets: buckets.map(bucket => [...bucket]),
            phase: "sorted",
            activeBucket: i,
            bucketRanges: bucketRanges
          });
          history.push(`Step ${steps.length}: Sorted bucket ${i} - <span style="color: var(--light-yellow)">Sorted contents: [${buckets[i].join(", ")}]</span>`);
        }

        // Concatenate sorted buckets
        for (const element of buckets[i]) {
          arr[currentIndex] = element;
          steps.push({
            array: [...arr],
            i: currentIndex,
            j: i,
            highlightLine: 9,
            action: `Moving ${element} from bucket ${i} to position ${currentIndex} in final array`,
            buckets: buckets.map(bucket => [...bucket]),
            phase: "concatenation",
            currentElement: element,
            activeBucket: i,
            bucketRanges: bucketRanges
          });
          history.push(`Step ${steps.length}: Moving ${element} to final array position ${currentIndex} - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`);
          currentIndex++;
        }
      }

      steps.push({
        array: [...arr],
        i: null,
        j: null,
        highlightLine: null,
        action: "Bucket sort completed",
        buckets: buckets.map(bucket => [...bucket]),
        phase: "completed",
        bucketRanges: bucketRanges
      });
      history.push(`Step ${steps.length}: Bucket sort completed - <span style="color: var(--light-yellow)">Final array: [${arr.join(", ")}]</span>`);
    }

    steps.push({
      array: [...arr],
      i: null,
      j: null,
      highlightLine: null,
      action: "Sorting completed"
    });
    history.push(`Step ${steps.length}: Sorting completed - <span style="color: var(--light-yellow)">Array state: [${arr.join(", ")}]</span>`);

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
    
    if (selectedAlgorithm === "counting") {
      // Check if any value is outside the defined range
      if (newArray.some(num => num < rangeMin || num > rangeMax)) {
        setWarning(`All values must be within the range ${rangeMin} to ${rangeMax} (inclusive)`);
        return;
      }
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

  const renderBucketSort = (step) => {
    switch (step.phase) {
      case "array_bounds":
        return (
          <div className="array-bounds">
            <div className="bound">
              <span className="bound-label">Min:</span>
              <span className="bound-value">{step.minValue}</span>
            </div>
            <div className="bound">
              <span className="bound-label">Max:</span>
              <span className="bound-value">{step.maxValue}</span>
            </div>
          </div>
        );
        
      case "bucket_formation":
        return (
          <div className="bucket-formation">
            <div className="formation-title">Bucket Formation</div>
            <div className="bucket-ranges">
              {step.bucketRanges.map((range, index) => (
                <div key={index} className="range-item">
                  <div className="range-label">Bucket {index}</div>
                  <div className="range-values">
                    <span className="range-min">{range.min.toFixed(2)}</span>
                    <span className="range-separator">to</span>
                    <span className="range-max">{range.max.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case "calculation":
        return (
          <div className="calculation-step">
            <div className="calculation-title">Bucket Index Calculation</div>
            <div className="calculation-formula">
              <span className="formula-part">floor</span>
              <span className="formula-operator">(</span>
              <span className="formula-part">{step.calculation.value}</span>
              <span className="formula-operator">-</span>
              <span className="formula-part">{step.calculation.min}</span>
              <span className="formula-operator">) /</span>
              <span className="formula-part">{step.calculation.range.toFixed(2)}</span>
              <span className="formula-operator">=</span>
              <span className="formula-result">{step.calculation.result}</span>
            </div>
          </div>
        );
        
      case "distribution":
        return (
          <div className="bucket-distribution">
            <div className="distribution-title">Bucket Distribution</div>
            <div className="buckets">
              {step.buckets.map((bucket, index) => (
                <div 
                  key={index} 
                  className={`bucket ${index === step.activeBucket ? 'active' : ''}`}
                >
                  <div className="bucket-header">
                    <div className="bucket-label">Bucket {index}</div>
                    <div className="bucket-range">
                      {step.bucketRanges[index].min.toFixed(2)} to {step.bucketRanges[index].max.toFixed(2)}
                    </div>
                  </div>
                  <div className="bucket-elements">
                    {bucket.map((value, idx) => (
                      <div 
                        key={idx} 
                        className={`bucket-element ${value === step.currentElement ? 'active' : ''}`}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="sorting-visualizer">
      <style jsx>{`
        .sorting-visualizer {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          background-color: var(--dark-bg);
          color: var(--light-text);
          font-family: 'Roboto', sans-serif;
          overflow: hidden;
        }
        
        /* ... existing styles ... */
        
        /* Radix Sort Styles */
        .radix-visualization {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        
        .radix-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.5rem;
          background-color: var(--dark-card);
          border-radius: 8px;
          margin-bottom: 0.5rem;
        }
        
        .digit-info {
          font-size: 0.9rem;
          padding: 0.5rem;
          background-color: var(--dark-bg);
          border-radius: 4px;
        }
        
        .highlight-digit {
          color: var(--light-yellow);
          font-weight: bold;
          font-size: 1.1rem;
        }
        
        .radix-label {
          background-color: var(--dark-accent);
          color: var(--light-text);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          white-space: nowrap;
        }
      `}</style>
      
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
                    <div className="number-input-container">
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
                      />
                      <div className="number-controls">
                        <button 
                          type="button"
                          onClick={() => {
                            const maxIndex = inputValue ? inputValue.split(",").length - 1 : 9;
                            if (pivotIndex < maxIndex) {
                              setPivotIndex(pivotIndex + 1);
                            }
                          }}
                        >
                          ▲
                        </button>
                        <button 
                          type="button"
                          onClick={() => {
                            if (pivotIndex > 0) {
                              setPivotIndex(pivotIndex - 1);
                            }
                          }}
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                    <span className="pivot-warning">
                      Max: {inputValue ? inputValue.split(",").length - 1 : 9}
                    </span>
                  </div>
                )}
                
                {selectedAlgorithm === "counting" && (
                  <div className="range-input-section">
                    <label htmlFor="rangeMin">Range:</label>
                    <div className="number-input-container">
                      <input
                        type="number"
                        id="rangeMin"
                        value={rangeMin}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value) && value >= 0) {
                            // Ensure the range doesn't exceed 19
                            if (rangeMax - value <= 19) {
                              setRangeMin(value);
                            } else {
                              // Adjust rangeMax to maintain the maximum range of 19
                              setRangeMin(value);
                              setRangeMax(value + 19);
                            }
                          }
                        }}
                        min="0"
                        max={rangeMax - 1}
                      />
                      <div className="number-controls">
                        <button
                          onClick={() => {
                            if (rangeMin < rangeMax - 1) {
                              setRangeMin(rangeMin + 1);
                            }
                          }}
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => {
                            if (rangeMin > 0) {
                              setRangeMin(rangeMin - 1);
                              // Check if range exceeds 19 after decreasing min
                              if (rangeMax - (rangeMin - 1) > 19) {
                                setRangeMax((rangeMin - 1) + 19);
                              }
                            }
                          }}
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                    <span className="range-separator">to</span>
                    <div className="number-input-container">
                      <input
                        type="number"
                        id="rangeMax"
                        value={rangeMax}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value) && value > rangeMin) {
                            // Ensure the range doesn't exceed 19
                            if (value - rangeMin <= 19) {
                              setRangeMax(value);
                            } else {
                              // Adjust rangeMin to maintain the maximum range of 19
                              setRangeMax(value);
                              setRangeMin(value - 19);
                            }
                          }
                        }}
                        min={rangeMin + 1}
                        max="100"
                      />
                      <div className="number-controls">
                        <button
                          onClick={() => {
                            if (rangeMax < 100) {
                              setRangeMax(rangeMax + 1);
                              // Check if range exceeds 19 after increasing max
                              if ((rangeMax + 1) - rangeMin > 19) {
                                setRangeMin((rangeMax + 1) - 19);
                              }
                            }
                          }}
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => {
                            if (rangeMax > rangeMin + 1) {
                              setRangeMax(rangeMax - 1);
                            }
                          }}
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                    <span className="range-info">Max range: 19</span>
                    {warning && <span className="range-warning">{warning}</span>}
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
          <div className="display">
            <div className="phase-label">Array Elements</div>
            
            {/* Key value box for insertion sort */}
            {selectedAlgorithm === "insertion" && steps[currentStep]?.key !== undefined && (
              <div className="key-value-box">
                <div className="key-box-label">Key:</div>
                <div className="key-box-value">{steps[currentStep]?.key}</div>
              </div>
            )}
            
            {/* Temp value box for shell sort */}
            {selectedAlgorithm === "shell" && steps[currentStep]?.temp !== undefined && (
              <div className="key-value-box temp-value-box">
                <div className="key-box-label">Temp:</div>
                <div className="key-box-value">{steps[currentStep]?.temp}</div>
              </div>
            )}
            
            <div className="array-content">
              {/* Array Elements - Hide only in the last step of counting sort */}
              {!(selectedAlgorithm === "counting" && 
                 steps[currentStep]?.phase === "completed" && 
                 currentStep === steps.length - 1) && (
                <div className="array-elements">
                  {steps[currentStep]?.array?.map((value, index) => (
                    <div
                      key={index}
                      className={`array-element ${
                        selectedAlgorithm === "counting"
                          ? (steps[currentStep]?.phase === "placing" &&
                             index === steps[currentStep]?.readIndex
                              ? "highlight"
                              : steps[currentStep]?.phase === "counting" &&
                                index === steps[currentStep]?.i
                              ? "highlight"
                              : "")
                          : ((index === steps[currentStep]?.i ||
                              index === steps[currentStep]?.j)
                              ? "highlight"
                              : "")
                      } ${
                        selectedAlgorithm === "heap" && steps[currentStep]?.heapNodes
                          ? index === steps[currentStep]?.heapNodes.root
                            ? "heap-root"
                            : index === steps[currentStep]?.heapNodes.left
                            ? "heap-left"
                            : index === steps[currentStep]?.heapNodes.right
                            ? "heap-right"
                            : ""
                          : ""
                      } ${
                        selectedAlgorithm === "shell" && steps[currentStep]?.gap
                          ? index % steps[currentStep]?.gap === 0
                            ? "gap-start"
                            : ""
                          : ""
                      } ${
                        selectedAlgorithm === "shell" && steps[currentStep]?.temp !== undefined
                          ? value === steps[currentStep]?.temp
                            ? "temp-element"
                            : ""
                          : ""
                      } ${
                        selectedAlgorithm === "radix" && steps[currentStep]?.phase === "placing" && index === steps[currentStep]?.i
                          ? "digit-active"
                          : ""
                      } ${
                        selectedAlgorithm === "bucket" && steps[currentStep]?.phase === "concatenation" && index === steps[currentStep]?.i
                          ? "bucket-active"
                          : ""
                      }`}
                    >
                      {/* For counting sort - counting phase */}
                      {selectedAlgorithm === "counting" &&
                        steps[currentStep]?.phase === "counting" &&
                        index === steps[currentStep]?.i && (
                          <div className="variable-label counting-label">
                            counting {value}<br/>
                            count[{value - rangeMin}]++
                          </div>
                      )}

                      {/* For counting sort - placing phase */}
                      {selectedAlgorithm === "counting" &&
                        steps[currentStep]?.phase === "placing" &&
                        index === steps[currentStep]?.readIndex && (
                          <div className="variable-label counting-label">
                            reading from here<br/>
                            (right to left)
                          </div>
                      )}

                      {/* For radix sort - show current digit */}
                      {selectedAlgorithm === "radix" &&
                        steps[currentStep]?.exp &&
                        index === steps[currentStep]?.i && (
                          <div className="variable-label radix-label">
                            current element<br/>
                            digit: {Math.floor(value / steps[currentStep]?.exp) % 10}
                          </div>
                      )}

                      {/* For non-counting sort algorithms */}
                      {selectedAlgorithm !== "counting" &&
                       selectedAlgorithm !== "merge" &&
                       selectedAlgorithm !== "heap" &&
                       selectedAlgorithm !== "insertion" &&
                       selectedAlgorithm !== "shell" &&
                        (index === steps[currentStep]?.i ||
                        index === steps[currentStep]?.j) && (
                          <div className="variable-label">
                            {index === steps[currentStep]?.i ? "i" : "j"}
                          </div>
                      )}
                      
                      {/* For insertion sort key label */}
                      {selectedAlgorithm === "insertion" && 
                       steps[currentStep]?.key !== undefined && 
                       value === steps[currentStep]?.key && (
                        <div className="key-label">key</div>
                      )}
                      
                      {/* For insertion sort i/j labels */}
                      {selectedAlgorithm === "insertion" && 
                       (index === steps[currentStep]?.i || index === steps[currentStep]?.j) && (
                        <div className="variable-label insertion-variable">
                          {index === steps[currentStep]?.i ? "i" : "j"}
                        </div>
                      )}
                      
                      {/* For shell sort i/j labels (when not at gap position) */}
                      {selectedAlgorithm === "shell" && 
                       (index === steps[currentStep]?.i || index === steps[currentStep]?.j) &&
                       !(index % steps[currentStep]?.gap === 0) && (
                        <div className="variable-label shell-variable">
                          {index === steps[currentStep]?.i ? "i" : "j"}
                        </div>
                      )}
                      
                      {/* Combined gap and variable label for shell sort */}
                      {selectedAlgorithm === "shell" && 
                       steps[currentStep]?.gap && 
                       index % steps[currentStep]?.gap === 0 && 
                       (index === steps[currentStep]?.i || index === steps[currentStep]?.j) && (
                        <div className="variable-label shell-variable">
                          {index === steps[currentStep]?.i ? `i, Gap ${steps[currentStep]?.gap}` : `j, Gap ${steps[currentStep]?.gap}`}
                        </div>
                      )}
                      
                      {/* Gap label for shell sort (only when not combined with variable) */}
                      {selectedAlgorithm === "shell" && 
                       steps[currentStep]?.gap && 
                       index % steps[currentStep]?.gap === 0 && 
                       !(index === steps[currentStep]?.i || index === steps[currentStep]?.j) && (
                        <div className="gap-label">
                          Gap {steps[currentStep]?.gap}
                        </div>
                      )}
                      
                      {/* For heap sort algorithm */}
                      {selectedAlgorithm === "heap" && steps[currentStep]?.heapNodes && (
                        <>
                          {/* Combine labels if multiple variables point to the same index */}
                          {(index === steps[currentStep]?.i || 
                            index === steps[currentStep]?.heapNodes.left || 
                            index === steps[currentStep]?.heapNodes.right) && (
                            <div className="variable-label">
                              {index === steps[currentStep]?.i && index === steps[currentStep]?.heapNodes.left
                                ? "i, left"
                                : index === steps[currentStep]?.i && index === steps[currentStep]?.heapNodes.right
                                ? "i, right"
                                : index === steps[currentStep]?.i
                                ? "i"
                                : index === steps[currentStep]?.heapNodes.left
                                ? "left"
                                : "right"}
                            </div>
                          )}
                        </>
                      )}
                      <div className="element-value">{value}</div>
                      <div className="element-index">{index}</div>
                    </div>
                  ))}
                </div>
              )}
              {selectedAlgorithm === "heap" && steps[currentStep]?.heapNodes && (
                <div className="heap-visualization">
                  <div className="heap-tree">
                    {/* Draw SVG lines for connections */}
                    <svg className="heap-connections" width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
                    {steps[currentStep]?.array?.map((value, index) => {
                        if (index === 0) return null; // Skip root node (no parent)
                        
                        const parentIndex = Math.floor((index - 1) / 2);
                      const level = Math.floor(Math.log2(index + 1));
                        const parentLevel = Math.floor(Math.log2(parentIndex + 1));
                        const position = index - (Math.pow(2, level) - 1);
                        const parentPosition = parentIndex - (Math.pow(2, parentLevel) - 1);
                        const totalNodesInLevel = Math.pow(2, level);
                        const totalNodesInParentLevel = Math.pow(2, parentLevel);
                        
                        // Calculate positions
                        const x1 = (parentPosition + 0.5) * (100 / totalNodesInParentLevel) + '%';
                        const y1 = (parentLevel * 60 + 22.5) + 'px';
                        const x2 = (position + 0.5) * (100 / totalNodesInLevel) + '%';
                        const y2 = (level * 60 - 22.5) + 'px';
                        
                        const isActive = index === steps[currentStep]?.heapNodes.left || 
                                        index === steps[currentStep]?.heapNodes.right;
                        
                        return (
                          <line
                            key={`line-${index}`}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="var(--light-orange)"
                            strokeWidth={isActive ? 2 : 1}
                            strokeOpacity={isActive ? 0.8 : 0.4}
                          />
                        );
                      })}
                    </svg>
                    
                    {/* Draw nodes on top of lines */}
                    {steps[currentStep]?.array?.map((value, index) => {
                      const level = Math.floor(Math.log2(index + 1));
                      const position = index - (Math.pow(2, level) - 1);
                      const totalNodesInLevel = Math.pow(2, level);
                      const leftPercent = (position + 0.5) * (100 / totalNodesInLevel);
                      
                      // Determine which variable label to show
                      let variableLabel = null;
                      if (index === steps[currentStep]?.heapNodes?.root && index === steps[currentStep]?.heapNodes?.left) {
                        variableLabel = "i, left";
                      } else if (index === steps[currentStep]?.heapNodes?.root && index === steps[currentStep]?.heapNodes?.right) {
                        variableLabel = "i, right";
                      } else if (index === steps[currentStep]?.heapNodes?.root) {
                        variableLabel = "i";
                      } else if (index === steps[currentStep]?.heapNodes?.left) {
                        variableLabel = "left";
                      } else if (index === steps[currentStep]?.heapNodes?.right) {
                        variableLabel = "right";
                      }
                      
                      return (
                        <div
                          key={index}
                          className={`heap-node ${
                            index === steps[currentStep]?.heapNodes.root
                              ? "heap-root"
                              : index === steps[currentStep]?.heapNodes.left
                              ? "heap-left"
                              : index === steps[currentStep]?.heapNodes.right
                              ? "heap-right"
                              : ""
                          }`}
                          style={{
                            top: `${level * 60}px`,
                            left: `${leftPercent}%`,
                          }}
                        >
                          {variableLabel && (
                            <div className="variable-label">{variableLabel}</div>
                          )}
                          <div className="node-value">{value}</div>
                          <div className="node-index">{index}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
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
              
              {/* Counting Sort Visualization */}
              {selectedAlgorithm === "counting" && steps[currentStep]?.count && (
                <div className="counting-visualization">
                  {/* Count Array - Hide when completed */}
                  {steps[currentStep]?.phase !== "completed" && (
                    <div className="count-array">
                      <div className="section-label">
                        Count Array (Index: 0 to {rangeMax - rangeMin})
                      </div>
                      <div className="elements">
                        {steps[currentStep]?.count.map((count, index) => (
                          <div
                            key={index}
                            className={`count-element ${
                              index === steps[currentStep]?.countIndex &&
                              (steps[currentStep]?.phase === "counting" ||
                               steps[currentStep]?.phase === "placing")
                                ? "highlight"
                                : index === steps[currentStep]?.i &&
                                  steps[currentStep]?.phase === "cumulative"
                                ? "highlight"
                                : ""
                            }`}
                          >
                            <div className="count-value">{count}</div>
                            <div className="count-index">
                              index: {index}<br/>
                              value: {index + rangeMin}
                            </div>
                            {/* Variable labels for counting and placing phases */}
                            {(steps[currentStep]?.phase === "counting" ||
                              steps[currentStep]?.phase === "placing") &&
                              index === steps[currentStep]?.countIndex && (
                                <div className="variable-label counting-label">
                                  count[{index}]
                                </div>
                            )}
                            {/* Variable labels for cumulative phase */}
                            {steps[currentStep]?.phase === "cumulative" &&
                              index === steps[currentStep]?.i && (
                                <div className="variable-label counting-label">
                                  Adding count[{index - 1}] = {count - steps[currentStep]?.count[index]}<br/>
                                  to count[{index}] = {steps[currentStep]?.count[index]}
                                </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Output Array - Always show when placing or completed */}
                  {(steps[currentStep]?.phase === "placing" ||
                    steps[currentStep]?.phase === "completed") && (
                    <div className="array-section" style={{ 
                      marginTop: steps[currentStep]?.phase === "completed" ? "2rem" : "",
                      marginBottom: "1rem"
                    }}>
                      <div className="section-label">
                        {steps[currentStep]?.phase === "completed" ? "Sorted Array" : "Output Array"}
                      </div>
                      <div className="elements">
                        {steps[currentStep]?.outputArray?.map((value, index) => (
                          <div
                            key={index}
                            className={`array-element ${
                              index === steps[currentStep]?.j &&
                              steps[currentStep]?.phase === "placing"
                                ? "highlight"
                                : ""
                            }`}
                          >
                            <div className="element-value">{value !== 0 ? value : "0"}</div>
                            <div className="element-index">{index}</div>
                            {steps[currentStep]?.phase === "placing" &&
                              index === steps[currentStep]?.j && (
                                <div className="variable-label counting-label">
                                  position {index}<br/>
                                  (count[{steps[currentStep]?.countIndex}]-1)
                                </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Radix Sort Visualization */}
              {selectedAlgorithm === "radix" && steps[currentStep]?.count && (
                <div className="radix-visualization">
                  {/* Current Digit Information */}
                  <div className="radix-info">
                    <div className="section-label">
                      Sorting by digit position: {Math.log10(steps[currentStep]?.exp) + 1}
                    </div>
                    {steps[currentStep]?.digit !== undefined && (
                      <div className="digit-info">
                        Current digit of {steps[currentStep]?.array[steps[currentStep]?.i]}: 
                        <span className="highlight-digit"> {steps[currentStep]?.digit}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Count Array */}
                  <div className="count-array">
                    <div className="section-label">
                      Count Array (Digits 0-9)
                    </div>
                    <div className="elements">
                      {steps[currentStep]?.count?.map((count, index) => (
                        <div
                          key={index}
                          className={`count-element ${
                            index === steps[currentStep]?.digit &&
                            steps[currentStep]?.phase === "counting"
                              ? "highlight"
                              : index === steps[currentStep]?.i &&
                                steps[currentStep]?.phase === "cumulative"
                              ? "highlight"
                              : ""
                          }`}
                        >
                          <div className="count-value">{count}</div>
                          <div className="count-index">
                            digit: {index}
                          </div>
                          {steps[currentStep]?.phase === "counting" &&
                            index === steps[currentStep]?.digit && (
                              <div className="variable-label radix-label">
                                count[{index}]++
                              </div>
                          )}
                          {steps[currentStep]?.phase === "cumulative" &&
                            index === steps[currentStep]?.i && (
                              <div className="variable-label radix-label">
                                Adding previous count
                              </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Output Array - Show when placing */}
                  {steps[currentStep]?.phase === "placing" && steps[currentStep]?.outputArray && (
                    <div className="array-section">
                      <div className="section-label">
                        Output Array
                      </div>
                      <div className="elements">
                        {steps[currentStep]?.outputArray?.map((value, index) => (
                          <div
                            key={index}
                            className={`array-element ${
                              index === steps[currentStep]?.j
                                ? "highlight"
                                : ""
                            }`}
                          >
                            <div className="element-value">{value !== 0 ? value : "0"}</div>
                            <div className="element-index">{index}</div>
                            {index === steps[currentStep]?.j && (
                              <div className="variable-label radix-label">
                                position {index}<br/>
                                (count[{steps[currentStep]?.digit}]-1)
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Bucket Sort Visualization */}
              {selectedAlgorithm === "bucket" && steps[currentStep] && (
                <div className="bucket-visualization">
                  {renderBucketSort(steps[currentStep])}
                </div>
              )}

              {/* Final Sorted Array (for all algorithms except counting sort) */}
              {steps[currentStep]?.phase === "completed" && selectedAlgorithm !== "counting" && (
                <div className="array-section">
                  <div className="section-label">Sorted Array</div>
                  <div className="elements">
                    {steps[currentStep]?.array?.map((value, index) => (
                      <div
                        key={index}
                        className="array-element"
                      >
                        <div className="element-value">{value}</div>
                        <div className="element-index">{index}</div>
                      </div>
                    ))}
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
