import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Balloon from "./components/balloon";
import axios from "axios";

function FetchGameData() {
  const [data, setData] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameWon, setGameWon] = useState(false);
  const [refreshBalloons, setRefreshBalloons] = useState(false);

  const navigate = useNavigate();

  // Fetch question from API
  const fetchQuestion = () => {
    fetch("https://marcconrad.com/uob/banana/api.php")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); // Debugging line
        console.log("Solution:", data.solution); // Debugging line

        setData(data);

        const correctAns = parseInt(data.solution);
        setAnswer(correctAns);
        setRefreshBalloons((prev) => !prev); // Toggle to refresh balloons
      })
      .catch((error) => {
        console.log("Error fetching question:", error);
      });
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const updateLeaderboard = (username, score) => {
    console.log("Sending leaderboard update:", { username, score }); // Debugging line
  
    axios
      .post("http://localhost:3001/leaderboard", { username, score })
      .then((response) => {
        console.log("Leaderboard updated successfully:", response.data);
      })
      .catch((err) => {
        console.error("Error updating leaderboard:", err);
      });
  };

  const handleBalloonClick = (number) => {
    if (number === answer) {
      const newScore = score + 10;
      setScore(newScore);

      // Retrieve the username from local storage
      const username = localStorage.getItem("username");

      if (!username) {
        console.error("Username is missing. Cannot update leaderboard.");
        return;
      }

      console.log("Username:", username);

      // Update the leaderboard in the backend
      updateLeaderboard(username, newScore);

      if (newScore >= 100) {
        setGameWon(true); // Trigger game won notification
      } else {
        fetchQuestion(); // Fetch new question if the game is not won
        setRefreshBalloons((prev) => !prev);
      }
    } else {
      setLives(lives - 1);
      setRefreshBalloons((prev) => !prev); // Toggle to refresh balloons
    }
  };

  const resetGame = () => {
    setData(data);
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
              <h1 className="logoname">Balloon Math</h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <button className="btn btn-warning" onClick={fetchQuestion}>
                New Question
              </button>
            </div>

            <div className="col-md-4">
              <button
                onClick={() => navigate("/leaderboard")}
                className="btn btn-info"
              >
                View Leaderboard
              </button>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                Exit Game
              </button>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-4">
              <div className="score-board">
                <span>Score: {score}</span>
              </div>
            </div>

            <div className="col-md-4">
              <div className="question-section">
                <img
                  src={data.question}
                  alt="Math problem"
                  className="question-image"
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="score-board">
                <span>Lives: {"❤️".repeat(lives)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="question-section">
        <img
          src={data.question}
          alt="Math problem"
          className="question-image"
        />
      </div> */}

      {/* //state variable is passed as a prop to the Balloon component */}
      <Balloon
        correctAns={answer}
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

      {gameWon && (
        <div className="game-won">
          <h2>🎉 Congratulations! You Won! 🎉</h2>
          <button className="btn btn-success" onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default FetchGameData;
