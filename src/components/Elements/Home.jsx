// src/components/Home.jsx
import React, { useRef, useEffect } from 'react';
import "../../styles/ElementStyle/_home.scss";
import { FaForwardStep } from "react-icons/fa6";

// Code snippets to animate
const codeSnippets = [
  {
    code: [
      "def merge_sort(arr):",
      "    if len(arr) > 1:",
      "        mid = len(arr) // 2",
      "        left_half = arr[:mid]",
      "        right_half = arr[mid:]",
      "",
      "        merge_sort(left_half)",
      "        merge_sort(right_half)",
      "",
      "        i = j = k = 0",
      "        while i < len(left_half) and j < len(right_half):",
      "            if left_half[i] < right_half[j]:",
      "                arr[k] = left_half[i]",
      "                i += 1",
      "            else:",
      "                arr[k] = right_half[j]",
      "                j += 1",
      "            k += 1",
      "",
      "        while i < len(left_half):",
      "            arr[k] = left_half[i]",
      "            i += 1",
      "            k += 1",
      "",
      "        while j < len(right_half):",
      "            arr[k] = right_half[j]",
      "            j += 1",
      "            k += 1",
      "",
      "    return arr",
    ],
    color: " #B8F9D3", // Green for Python
  },
  {
    code: [
      "struct Node {",
      "    int data;",
      "    struct Node* next;",
      "};",
      "",
      "void printList(struct Node* n) {",
      "    while (n != NULL) {",
      '        printf("%d -> ", n->data);',
      "        n = n->next;",
      "    }",
      '    printf("NULL\\n");',
      "}",
      "",
      "int main() {",
      "    struct Node* head = NULL;",
      "    struct Node* second = NULL;",
      "    struct Node* third = NULL;",
      "",
      "    head = (struct Node*) malloc(sizeof(struct Node));",
      "    second = (struct Node*) malloc(sizeof(struct Node));",
      "    third = (struct Node*) malloc(sizeof(struct Node));",
      "",
      "    head->data = 1;",
      "    head->next = second;",
      "    second->data = 2;",
      "    second->next = third;",
      "    third->data = 3;",
      "    third->next = NULL;",
      "",
      "    printList(head);",
      "    return 0;",
      "}",
    ],
    color: " #ffd4a9", // Orange for C
  },
  {
    code: [
      "void BFS(int start, vector<vector<int>>& adj) {",
      "    vector<bool> visited(adj.size(), false);",
      "    queue<int> q;",
      "    visited[start] = true;",
      "    q.push(start);",
      "",
      "    while (!q.empty()) {",
      "        int node = q.front();",
      "        q.pop();",
      '        cout << node << " ";',
      "",
      "        for (int neighbor : adj[node]) {",
      "            if (!visited[neighbor]) {",
      "                visited[neighbor] = true;",
      "                q.push(neighbor);",
      "            }",
      "        }",
      "    }",
      "}",
      "",
      "int main() {",
      "    int V = 5;",
      "    vector<vector<int>> adj(V);",
      "    adj[0].push_back(1); adj[0].push_back(2);",
      "    adj[1].push_back(3); adj[1].push_back(4);",
      "    adj[2].push_back(4);",
      "",
      "    BFS(0, adj);",
      "    return 0;",
      "}",
    ],
    color: "#ff7e7e", // red for C++
  },
  {
    code: [
      "class Stack {",
      "    constructor() {",
      "        this.items = [];",
      "    }",
      "",
      "    push(element) {",
      "        this.items.push(element);",
      "    }",
      "",
      "    pop() {",
      "        if (this.isEmpty())",
      "            return 'Underflow';",
      "        return this.items.pop();",
      "    }",
      "",
      "    peek() {",
      "        return this.items[this.items.length - 1];",
      "    }",
      "",
      "    isEmpty() {",
      "        return this.items.length === 0;",
      "    }",
      "",
      "    size() {",
      "        return this.items.length;",
      "    }",
      "}",
      "",
      "const stack = new Stack();",
      "stack.push(10);",
      "stack.push(20);",
      "stack.push(30);",
      "console.log(stack.pop());",
      "console.log(stack.peek());",
    ],
    color: "#ceb2fc", // violet for JS
  },
  {
    code: [
      "public class BubbleSort {",
      "    public static void bubbleSort(int[] arr) {",
      "        int n = arr.length;",
      "        for (int i = 0; i < n - 1; i++) {",
      "            for (int j = 0; j < n - i - 1; j++) {",
      "                if (arr[j] > arr[j + 1]) {",
      "                    int temp = arr[j];",
      "                    arr[j] = arr[j + 1];",
      "                    arr[j + 1] = temp;",
      "                }",
      "            }",
      "        }",
      "    }",
      "",
      "    public static void main(String[] args) {",
      "        int[] arr = {64, 34, 25, 12, 22, 11, 90};",
      "        bubbleSort(arr);",
      "        for (int num : arr) {",
      '            System.out.print(num + " ");',
      "        }",
      "    }",
      "}",
    ],
    color: "#afceff", // blue for Java
  },
];

const Home = () => {
  // Refs for direct DOM manipulation
  const codeOutputRef = useRef(null);
  const toggleIconRef = useRef(null);

  // Refs to track animation state (won't trigger re-render)
  const snippetIndexRef = useRef(0);
  const lineIndexRef = useRef(0);
  const isAnimatingRef = useRef(true);

  // Ref to hold the current timeout ID for cleanup
  const timeoutIdRef = useRef(null);

  // Auto-scroll the code container as new lines are added
  const autoScroll = () => {
    if (codeOutputRef.current) {
      codeOutputRef.current.scrollTop = codeOutputRef.current.scrollHeight;
    }
  };

  // Function to type one line at a time from the current snippet
  const typeLineByLine = () => {
    const snippet = codeSnippets[snippetIndexRef.current];
    if (lineIndexRef.current < snippet.code.length && isAnimatingRef.current) {
      const line = snippet.code[lineIndexRef.current];
      if (codeOutputRef.current) {
        codeOutputRef.current.style.color = snippet.color;
        codeOutputRef.current.textContent += line + "\n";
      }
      lineIndexRef.current++;
      autoScroll();
      timeoutIdRef.current = setTimeout(typeLineByLine, 500);
    } else if (!isAnimatingRef.current) {
      return;
    } else {
      timeoutIdRef.current = setTimeout(resetAndNextSnippet, 1000);
    }
  };

  // Function to clear the code container and start the next snippet
  const resetAndNextSnippet = () => {
    if (codeOutputRef.current) {
      codeOutputRef.current.textContent = "";
    }
    lineIndexRef.current = 0;
    snippetIndexRef.current = (snippetIndexRef.current + 1) % codeSnippets.length;
    typeLineByLine();
  };

  // Toggle play/pause of the code snippet animation
  const toggleAnimation = () => {
    isAnimatingRef.current = !isAnimatingRef.current;
    if (toggleIconRef.current) {
      if (isAnimatingRef.current) {
        toggleIconRef.current.classList.remove("fa-play");
        toggleIconRef.current.classList.add("fa-pause");
        // Resume typing by calling typeLineByLine if not already running
        typeLineByLine();
      } else {
        toggleIconRef.current.classList.remove("fa-pause");
        toggleIconRef.current.classList.add("fa-play");
        // Clear any pending timeout so the animation stops
        clearTimeout(timeoutIdRef.current);
      }
    }
  };


  // Start the animation when the component mounts
  useEffect(() => {
    typeLineByLine();
    // Cleanup: clear any pending timeouts when component unmounts
    return () => clearTimeout(timeoutIdRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section id="home">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 left">
              <h1 className="py-4">
                Where <span>O(n<sup>100</sup>)</span> Complexity Turns into{" "}
                <span>O(1)</span> Understanding
              </h1>
              <h4 className="mt-3 mb-5 pe-2">
                Where coding meets clarity. At <span>Visco</span>, explore inbuilt
                algorithms through simple, intuitive visuals. We turn complexity
                into clarity, making code effortless to understand.
              </h4>
              <button
                type="button"
                className="btn btn-outline py-3"
                onClick={() => window.location.href = "#topic"}
              >
                Get Started <i className="ms-2 fa-solid fa-terminal"></i>
              </button>
            </div>
            <div className="col-lg-6 right">
              <button
                id="toggleAnimation"
                className="btn btn-outline"
                onClick={toggleAnimation}
              >
                <i
                  id="toggleIcon"
                  ref={toggleIconRef}
                  className="fa-solid fa-pause"
                ></i>
              </button>
              <button id="skip"onClick={resetAndNextSnippet} className="btn btn-outline">
                <FaForwardStep />
                </button>
              <div className="code-container" ref={codeOutputRef}></div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;
