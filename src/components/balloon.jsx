import React, { useEffect, useState } from "react";
import "./Balloon.css";

const Balloon = ({ correctAns, handleBalloonClick, refreshBalloons }) => {
  const [balloons, setBalloons] = useState([]);

  const generateBalloons = () => {
    const newBalloons = [];
    const numberOfBalloons = Math.floor(Math.random() * 4) + 5; // Generate between 5 and 8 balloons
    const containerWidth = 100; // Percentage width of the container
    const containerHeight = 100; // Percentage height of the container
    const balloonSize = 10; // Approximate size of the balloon in percentage

    const isOverlapping = (x1, y1, x2, y2) => {
      return (
        Math.abs(x1 - x2) < balloonSize && Math.abs(y1 - y2) < balloonSize
      );
    };

    const generateRandomPosition = () => {
      return {
        x: Math.random() * (containerWidth - balloonSize),
        y: Math.random() * (containerHeight - balloonSize),
      };
    };

    for (let i = 0; i < numberOfBalloons; i++) {
      let position;
      let overlapping;

      do {
        position = generateRandomPosition();
        overlapping = newBalloons.some((balloon) =>
          isOverlapping(balloon.style.left, balloon.style.top, position.x, position.y)
        );
      } while (overlapping);

      newBalloons.push({
        number: i === 0 ? correctAns : Math.floor(Math.random() * 9) + 1, // Ensure one balloon has the correct answer
        id: i,
        style: {
          left: `${position.x}%`,
          top: `${position.y}%`,
          animationDuration: `${10 + Math.random() * 5}s`,
          animationDelay: `${Math.random() * 2}s`,
          backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
        },
      });
    }

    setBalloons(newBalloons);
  };

  useEffect(() => {
    generateBalloons(); // Generate new balloons
  }, [correctAns, refreshBalloons]);

  return (
    <div className="balloon-container">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="balloon"
          style={balloon.style}
          onClick={() => handleBalloonClick(balloon.number)}
        >
          <div className="balloon-number">{balloon.number}</div>
          <div className="balloon-string"></div>
        </div>
      ))}
    </div>
  );
};

export default Balloon;

