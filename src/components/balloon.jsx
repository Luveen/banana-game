import React, { useEffect, useState } from 'react';
import './Balloon.css';

const Balloon = () => {
  const [balloons, setBalloons] = useState([]);
  
  // Generate random balloon positions and numbers
  useEffect(() => {
    const generateBalloons = () => {
      const newBalloons = [];
      for (let i = 0; i < 8; i++) {
        newBalloons.push({
          number: Math.floor(Math.random() * 100),
          id: i,
          style: {
            left: `${Math.random() * 85}%`,
            animationDuration: `${8 + Math.random() * 8}s`,
            animationDelay: `${Math.random() * 5}s`,
            backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`
          }
        });
      }
      setBalloons(newBalloons);
    };

    generateBalloons();
  }, []);

  return (
    <div className="balloon-container">
      {balloons.map(balloon => (
        <div 
          key={balloon.id}
          className="balloon"
          style={balloon.style}
        >
          <div className="balloon-number">{balloon.number}</div>
          <div className="balloon-string"></div>
        </div>
      ))}
    </div>
  );
};

export default Balloon;