import React, { useEffect, useState } from "react";
import "./Balloon.css";

const Balloon = ({ correctAns, handleBalloonClick, refreshBalloons }) => {
  const [balloons, setBalloons] = useState([]);

  const generateBalloons = () => {
    const newBalloons = [];
    const numberOfBalloons = Math.floor(Math.random() * 4) + 5; // Generate between 5 and 8 balloons

    // Add the correct answer balloon
    newBalloons.push({
      number: correctAns,
      id: 0,
      style: {
        left: `${Math.random() * 80}%`,
        animationDuration: `${10 + Math.random() * 10}s`,
        animationDelay: `${Math.random() * 5}s`,
        backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
      },
    });

    // Add random balloons
    for (let i = 1; i < numberOfBalloons; i++) {
      let randomNum;
      do {
        randomNum = Math.floor(Math.random() * 9) + 1; // Generate random numbers between 1 and 9
      } while (randomNum === correctAns); // Ensure no duplicate of the correct answer

      newBalloons.push({
        number: randomNum,
        id: i,
        style: {
          left: `${Math.random() * 80}%`,
          animationDuration: `${10 + Math.random() * 10}s`,
          animationDelay: `${Math.random() * 5}s`,
          backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
        },
      });
    }

    // Shuffle the balloons to randomize their order
    console.log("Generated Balloons:", newBalloons); // Debugging line
    setBalloons(newBalloons.sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    generateBalloons();
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

