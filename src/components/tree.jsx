import React from "react";
import "../styles/_tree.scss"; // Import SCSS file

const Tree = () => {
    const renderTree = (nodes) => {
        return (
            <ul>
                {nodes.map((node) => (
                    <li key={node.id}>
                        <div className="node">{node.name}</div>
                        {node.children && <div className="children">{renderTree(node.children)}</div>}
                    </li>
                ))}
            </ul>
        );
    };

    const treeData = [
        {
            id: 1,
            name: "Root",
            children: [
                {
                    id: 2,
                    name: "Child 1",
                    children: [
                        { id: 3, name: "Grandchild 1" },
                        { id: 4, name: "Grandchild 2" },
                    ],
                },
                { id: 5, name: "Child 2" },
            ],
        },
    ];

    return (
        <div className="tree-container">
            <h1>Tree Structure</h1>
            {renderTree(treeData)}
        </div>
    );
};

export default Tree;
