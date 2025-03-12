import React, { useState } from "react";
import "../../../../styles/ElementStyle/TopicStyle/LinkedListStyle/_linkedList.scss";
import LinkedListVisualizer from "./LinkedListVisualizer";

const linkedListOperations = [
    {
        id: "singly-linked-list",
        name: "Singly Linked List",
        description: "A linear data structure where each element points to the next element",
        timeComplexity: { 
            worst: "O(n)", 
            average: "O(n)", 
            best: "O(1)" 
        },
        spaceComplexity: "O(n)",
        code: `class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    prepend(value) {
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
        if (!this.tail) {
            this.tail = newNode;
        }
        this.length++;
    }
}`
    },
    {
        id: "doubly-linked-list",
        name: "Doubly Linked List",
        description: "Each node contains data and references to both next and previous nodes",
        timeComplexity: { 
            worst: "O(n)", 
            average: "O(n)", 
            best: "O(1)" 
        },
        spaceComplexity: "O(n)",
        code: `class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    prepend(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
    }
}`
    },
    {
        id: "circular-linked-list",
        name: "Circular Linked List",
        description: "Last node points back to the first node, creating a circle",
        timeComplexity: { 
            worst: "O(n)", 
            average: "O(n)", 
            best: "O(1)" 
        },
        spaceComplexity: "O(n)",
        code: `class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class CircularLinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    append(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            newNode.next = this.head;
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            current.next = newNode;
            newNode.next = this.head;
        }
        this.length++;
    }

    prepend(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            newNode.next = this.head;
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            newNode.next = this.head;
            this.head = newNode;
            current.next = this.head;
        }
        this.length++;
    }
}`
    },
    {
        id: "doubly-circular-linked-list",
        name: "Doubly Circular Linked List",
        description: "Combination of doubly linked list and circular linked list",
        timeComplexity: { 
            worst: "O(n)", 
            average: "O(n)", 
            best: "O(1)" 
        },
        spaceComplexity: "O(n)",
        code: `class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyCircularLinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    append(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            newNode.next = this.head;
            newNode.prev = this.head;
        } else {
            let tail = this.head.prev;
            if (!tail) {
                // If only one node exists
                this.head.next = newNode;
                this.head.prev = newNode;
                newNode.next = this.head;
                newNode.prev = this.head;
            } else {
                newNode.prev = tail;
                newNode.next = this.head;
                tail.next = newNode;
                this.head.prev = newNode;
            }
        }
        this.length++;
    }

    prepend(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            newNode.next = this.head;
            newNode.prev = this.head;
        } else {
            let tail = this.head.prev;
            newNode.next = this.head;
            newNode.prev = tail;
            this.head.prev = newNode;
            if (tail) {
                tail.next = newNode;
            } else {
                this.head.next = newNode;
            }
            this.head = newNode;
        }
        this.length++;
    }
}`
    }
];

const LinkedListComponent = () => {
    const [selectedOperation, setSelectedOperation] = useState(null);

    const closeVisualizer = () => {
        setSelectedOperation(null);
    };

    return (
        <section id="linkedList">
            <div className="container">
                <h1>Linked List Operations</h1>
                <div className="row">
                    {linkedListOperations.map((op) => (
                        <div key={op.id} className="topic-card">
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
                                    className="btn-outline"
                                    onClick={() => setSelectedOperation(op)}
                                >
                                    Visualize <i className="fa-solid fa-play"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedOperation && (
                <LinkedListVisualizer
                    onClose={closeVisualizer}
                    operation={selectedOperation}
                    isVisible={true}
                />
            )}
        </section>
    );
}

export default LinkedListComponent;
