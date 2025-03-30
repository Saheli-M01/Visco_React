import React, { useEffect, useState } from 'react';
import '../../styles/CommonStyle/_loading.scss';

const LoadingPage = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate nodes in a circular pattern
    const generateNodes = () => {
      const centerX = 100;
      const centerY = 100;
      const radius = 80;
      const nodeCount = 12;
      const newNodes = [];

      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        newNodes.push({ x, y });
      }

      // Add center node
      newNodes.push({ x: centerX, y: centerY });

      setNodes(newNodes);

      // Generate connections between nodes
      const newConnections = [];
      for (let i = 0; i < nodeCount; i++) {
        // Connect to center
        newConnections.push({
          from: { x: newNodes[i].x, y: newNodes[i].y },
          to: { x: centerX, y: centerY }
        });

        // Connect to next node
        const nextIndex = (i + 1) % nodeCount;
        newConnections.push({
          from: { x: newNodes[i].x, y: newNodes[i].y },
          to: { x: newNodes[nextIndex].x, y: newNodes[nextIndex].y }
        });
      }

      setConnections(newConnections);
    };

    // Generate random particles
    const generateParticles = () => {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3
      }));
      setParticles(newParticles);
    };

    generateNodes();
    generateParticles();
  }, []);

  return (
    <div className="loading-container">
      <div className="energy-particles">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${-particle.delay}s`
            }}
          />
        ))}
      </div>

      <div className="radiation-waves"></div>
      <div className="radiation-waves"></div>
      <div className="radiation-waves"></div>
      <div className="radiation-waves"></div>
      
      <div className="neural-network">
        {connections.map((connection, index) => (
          <div
            key={`connection-${index}`}
            className="connection active"
            style={{
              width: Math.sqrt(
                Math.pow(connection.to.x - connection.from.x, 2) +
                Math.pow(connection.to.y - connection.from.y, 2)
              ),
              left: connection.from.x,
              top: connection.from.y,
              transform: `rotate(${Math.atan2(
                connection.to.y - connection.from.y,
                connection.to.x - connection.from.x
              ) * (180 / Math.PI)}deg)`
            }}
          />
        ))}
        {nodes.map((node, index) => (
          <div
            key={`node-${index}`}
            className="node active"
            style={{
              left: node.x - 6,
              top: node.y - 6
            }}
          />
        ))}
      </div>
      
      <div className="loading-text">
        Loading
      </div>
    </div>
  );
};

export default LoadingPage; 