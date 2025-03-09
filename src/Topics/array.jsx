import React from "react";
import "../styles/Topics/_array.scss"; // Adjust the path to match your project structure

const ArrayComponent = () => {
    const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

    return (
        <div className="array-container">
            <h2>Array Items</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index} className="array-item">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArrayComponent;