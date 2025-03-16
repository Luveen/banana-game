import React, { useEffect, useState } from "react";
import "./Balloon.css";

const Balloon = ({ correctAnswer, handleBalloonClick, refreshBalloons }) => {
  const [balloons, setBalloons] = useState([]);

  // Generate random balloon positions and numbers
  const generateBalloons = () => {
    const newBalloons = [];
    const numberOfBalloons = Math.floor(Math.random() * 4) + 5; // Generate between 5 and 8 balloons

    // Function to check if a position overlaps with existing balloons
    const isOverlapping = (left, top) => {
      return newBalloons.some(
        (balloon) =>
          Math.abs(parseFloat(balloon.style.left) - left) < 10 &&
          Math.abs(parseFloat(balloon.style.top) - top) < 10
      );
    };

    // Ensure one balloon has the correct answer
    let left, top;
    do {
      left = Math.random() * 80;
      top = Math.random() * 80;
    } while (isOverlapping(left, top));

    newBalloons.push({
      number: correctAnswer,
      id: 0,
      style: {
        left: `${left}%`,
        top: `${top}%`,
        animationDuration: `${10 + Math.random() * 10}s`,
        animationDelay: `${Math.random() * 5}s`,
        backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
      },
    });

    // Generate other balloons with random numbers between 1 and 9
    for (let i = 1; i < numberOfBalloons; i++) {
      let randomNum;
      do {
        randomNum = Math.floor(Math.random() * 9) + 1;
      } while (randomNum === correctAnswer);

      do {
        left = Math.random() * 80;
        top = Math.random() * 80;
      } while (isOverlapping(left, top));

      newBalloons.push({
        number: randomNum,
        id: i,
        style: {
          left: `${left}%`,
          top: `${top}%`,
          animationDuration: `${10 + Math.random() * 10}s`,
          animationDelay: `${Math.random() * 5}s`,
          backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
        },
      });
    }
    setBalloons(newBalloons.sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    console.log("Correct Answer in Balloon:", correctAnswer); // Debugging line
    generateBalloons();
  }, [correctAnswer, refreshBalloons]);

  return (
    <div className="balloon-container" >
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
