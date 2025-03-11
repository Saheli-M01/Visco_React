import React, { useState } from "react";
import "../styles/Topics/_tree.scss";
import TreeVisualizer from "./TreeVisualizer";

const treeOperations = [
    {
        id: "binary-tree",
        name: "Binary Tree Creation",
        description: "Create and visualize a Binary Tree structure",
        timeComplexity: { worst: "O(1)", average: "O(1)", best: "O(1)" },
        spaceComplexity: "O(n)",
        code: `class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);
        if (!this.root) {
            this.root = newNode;
            return;
        }
        
        const queue = [this.root];
        while (queue.length > 0) {
            const current = queue.shift();
            if (!current.left) {
                current.left = newNode;
                break;
            } else if (!current.right) {
                current.right = newNode;
                break;
            }
            queue.push(current.left);
            queue.push(current.right);
        }
    }
}`
    },
    {
        id: "avl-tree",
        name: "AVL Tree",
        description: "Self-balancing Binary Search Tree with height balancing",
        timeComplexity: { worst: "O(log n)", average: "O(log n)", best: "O(log n)" },
        spaceComplexity: "O(n)",
        code: `class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    height(node) {
        return node ? node.height : 0;
    }

    balanceFactor(node) {
        return this.height(node.left) - this.height(node.right);
    }

    rotateRight(y) {
        const x = y.left;
        const T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        return x;
    }

    rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        return y;
    }

    insert(value) {
        this.root = this._insert(this.root, value);
    }

    _insert(node, value) {
        if (!node) return new Node(value);
        
        if (value < node.value)
            node.left = this._insert(node.left, value);
        else if (value > node.value)
            node.right = this._insert(node.right, value);
        else
            return node;

        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
        const balance = this.balanceFactor(node);

        // Left Left Case
        if (balance > 1 && value < node.left.value)
            return this.rotateRight(node);

        // Right Right Case
        if (balance < -1 && value > node.right.value)
            return this.rotateLeft(node);

        // Left Right Case
        if (balance > 1 && value > node.left.value) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }

        // Right Left Case
        if (balance < -1 && value < node.right.value) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }
}`
    }
];

const TreeComponent = () => {
    const [selectedOperation, setSelectedOperation] = useState(null);

    const closeVisualizer = () => {
        setSelectedOperation(null);
    };

    return (
        <section id="tree">
            <div className="container">
                <h1>Tree Operations</h1>
                <div className="row">
                    {treeOperations.map((op) => (
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
                <TreeVisualizer
                    onClose={closeVisualizer}
                    operation={selectedOperation}
                    isVisible={true}
                />
            )}
        </section>
    );
}

export default TreeComponent;
