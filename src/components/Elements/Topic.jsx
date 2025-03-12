import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import "../../styles/ElementStyle/_topic.scss";
import array from "../../Assets/Images/Topic/array.svg";
import tree from "../../Assets/Images/Topic/tree.svg";
import graph from "../../Assets/Images/Topic/graph.svg";
import linkedList from "../../Assets/Images/Topic/linked-list.svg";
import sort from "../../Assets/Images/Topic/sort.svg";


const topics = [
  { name: "Array", imgSrc: array, route: "/topic/array" },
  { name: "Tree", imgSrc: tree, route: "/topic/tree" },
  { name: "Graph", imgSrc: graph, route: "/topic/graph" },
  { name: "Linked List", imgSrc: linkedList, route: "/topic/linkedList" },
  { name: "Sorting", imgSrc: sort, route: "/topic/sort" },
];

const TopicSection = () => {
  const navigate = useNavigate(); // Hook to navigate

  const handleNavigation = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  };

  return (
    <section id="topic">
      <div className="container">
        <h1 className="text-center">Explore Topics</h1>
        <div className="row">
          {topics.map((topic, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-12 topic-card mt-2">
              <div className="card-content">
                <div className="icon-container">
                  <img src={topic.imgSrc} alt={topic.name} />
                </div>
                <p className="card-name">{topic.name}</p>
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => handleNavigation(topic.route)}
                >
                  Explore <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicSection;
