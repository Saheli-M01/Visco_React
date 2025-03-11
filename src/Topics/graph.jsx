import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import GraphVisualizer from './GraphVisualizer';

const Graph = () => {
    const [selectedOperation, setSelectedOperation] = useState(null);

    const operations = [
        {
            id: 'dfs',
            name: 'Depth-First Search (DFS)',
            description: 'Explores a graph by going as deep as possible along each branch before backtracking.',
            timeComplexity: 'O(V + E)',
            spaceComplexity: 'O(V)',
            code: `function dfs(graph, start) {
    const visited = new Set();
    
    function explore(vertex) {
        visited.add(vertex);
        console.log(vertex); // Process vertex
        
        for (const neighbor of graph[vertex]) {
            if (!visited.has(neighbor)) {
                explore(neighbor);
            }
        }
    }
    
    explore(start);
}`
        },
        {
            id: 'bfs',
            name: 'Breadth-First Search (BFS)',
            description: 'Explores a graph level by level, visiting all neighbors before moving to the next level.',
            timeComplexity: 'O(V + E)',
            spaceComplexity: 'O(V)',
            code: `function bfs(graph, start) {
    const visited = new Set([start]);
    const queue = [start];
    
    while (queue.length > 0) {
        const vertex = queue.shift();
        console.log(vertex); // Process vertex
        
        for (const neighbor of graph[vertex]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}`
        }
    ];

    const handleOperationClick = (operation) => {
        setSelectedOperation(operation);
    };

    const handleCloseVisualizer = () => {
        setSelectedOperation(null);
    };

    return (
        <section id="graph">
            <div className="container">
                <h1>Graph Algorithms</h1>
                <div className="row">
                    {operations.map((operation) => (
                        <div key={operation.id} className="topic-card">
                            <div className="card-content">
                                <h3 className="card-name">{operation.name}</h3>
                                <p className="card-description">{operation.description}</p>
                                <div className="complexity">
                                    <p>
                                        <strong>Time Complexity:</strong> {operation.timeComplexity}
                                    </p>
                                    <p>
                                        <strong>Space Complexity:</strong> {operation.spaceComplexity}
                                    </p>
                                </div>
                                <button
                                    className="btn-outline"
                                    onClick={() => handleOperationClick(operation)}
                                >
                                    Visualize <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedOperation && (
                <GraphVisualizer
                    operation={selectedOperation}
                    onClose={handleCloseVisualizer}
                    isVisible={true}
                />
            )}
        </section>
    );
};

export default Graph;
