import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ImageToText from "./components/imageToText";
import Balloon from "./components/balloon";

//Fetching Data From the image {Question and Solution}
// function FetchGameData() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch("https://marcconrad.com/uob/banana/api.php")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Fetched data:", data); //Show the Question and Solution data
//         setData(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-md-6">
//             <h1 className="greetings">Good morning, Luveen</h1>
//           </div>
//         </div>
//       </div>
//       <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
//         <div className="row">
//           <div className="col-md-12">
//             <div className="card text-center">
//               <div className="card-body">
//                 <h1 className="card-title">Game</h1>

//                 <img
//                   src={data.question}
//                   alt="Banana question"
//                   className="card-img-top"
//                   style={{ objectFit: "cover" }}
//                 />

//                 <ImageToText imageUrl={data.question} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default FetchGameData;

function FetchGameData() {
  const [data, setData] = useState(null);
  const [numbers, setNumbers] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameWon, setGameWon] = useState(false);

  // Fetch question from API
  useEffect(() => {
    fetch("https://marcconrad.com/uob/banana/api.php")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        const solution = new URLSearchParams(data.solution.slice(1));
        const correctAnswer = parseInt(solution.get("banana"));
        setAnswer(correctAnswer);
        generateNumbers(correctAnswer);
      });
  }, []);

  // Generate random numbers including the correct answer
  const generateNumbers = (correctAnswer) => {
    const numbers = [];
    // Add 4 random numbers
    for (let i = 0; i < 4; i++) {
      numbers.push(correctAnswer + Math.floor(Math.random() * 20 - 10));
    }
    // Add correct answer
    numbers.push(correctAnswer);
    // Shuffle array
    setNumbers(numbers.sort(() => Math.random() - 0.5));
  };

  const handleBalloonClick = (number) => {
    if (number === answer) {
      setScore(score + 10);
      setGameWon(true);
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
    }
  };

  const resetGame = () => {
    setData(null);
    setGameWon(false);
    setLives(3);
    setScore(0);
    fetch("https://marcconrad.com/uob/banana/api.php")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        const solution = new URLSearchParams(data.solution.slice(1));
        const correctAnswer = parseInt(solution.get("banana"));
        setAnswer(correctAnswer);
        generateNumbers(correctAnswer);
      });
  };

  if (!data) return <div className="loading">Loading Game...</div>;

  return (
    <div className="game-container">
      <div className="header">
        <h1>Balloon Pop Math</h1>
        <div className="score-board">
          <span>Score: {score}</span>
          <span>Lives: {"❤️".repeat(lives)}</span>
        </div>
      </div>

      <div className="question-section">
        <img
          src={data.question}
          alt="Math problem"
          className="question-image"
        />
      </div>

      <div className="balloon-container">
        {numbers.map((number, index) => (
          <div
            key={index}
            className={`balloon ${gameWon ? "popped" : ""}`}
            style={{
              left: `${index * 20 + 10}%`,
              animationDelay: `${index * 0.5}s`,
            }}
            onClick={() => !gameWon && handleBalloonClick(number)}
          >
            {number}
          </div>
        ))}
      </div>

      {gameWon && (
        <div className="win-screen">
          <h2>Correct! 🎉</h2>
          <button className="btn btn-primary" onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}

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
