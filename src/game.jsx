import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Balloon from "./components/balloon";

function FetchGameData() {
  const [data, setData] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameWon, setGameWon] = useState(false);
  const [refreshBalloons, setRefreshBalloons] = useState(false);

  // Fetch question from API
  const fetchQuestion = () => {
    fetch("https://marcconrad.com/uob/banana/api.php")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); // Debugging line
        setData(data);
        const solution = new URLSearchParams(data.solution.slice(1));
        const correctAnswer = parseInt(solution.get("banana"));
        console.log("Correct Answer:", correctAnswer); // Debugging line
        setAnswer(correctAnswer);
        setRefreshBalloons((prev) => !prev); // Toggle to refresh balloons
      })
      .catch((error) => {
        console.error("Error fetching question:", error);
      });
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleBalloonClick = (number) => {
    if (number === answer) {
      setScore(score + 10);
      setGameWon(true);
      // Fetch new question and continue the game
      fetchQuestion();
      setGameWon(false);
    } else {
      setLives(lives - 1);
      // Shake animation for wrong answers
      const balloons = document.querySelectorAll(".balloon");
      balloons.forEach((b) => {
        if (b.textContent == number) b.classList.add("shake");
      });
      setTimeout(() => {
        balloons.forEach((b) => b.classList.remove("shake"));
      }, 500);
      // Generate new balloons
      setRefreshBalloons((prev) => !prev); // Toggle to refresh balloons
    }
  };

  const resetGame = () => {
    setData(null);
    setGameWon(false);
    setLives(3);
    setScore(0);
    fetchQuestion();
  };

  if (!data) return <div className="loading">Loading Game...</div>;

  return (
    <div className="game-container">
      <div className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h1 className="logoname" >
                Balloon math
              </h1>
            </div>
          </div>

          <div className="row">
            <div className="score-board">
              <span>Score: {score}</span>
              <span>Lives: {"❤️".repeat(lives)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="question-section">
        <img
          src={data.question}
          alt="Math problem"
          className="question-image"
        />
      </div>

      <Balloon
        correctAnswer={answer}
        handleBalloonClick={handleBalloonClick}
        refreshBalloons={refreshBalloons}
      />

      {lives <= 0 && (
        <div className="game-over">
          <h2>Game Over! 😢</h2>
          <button className="btn btn-danger" onClick={resetGame}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default FetchGameData;
