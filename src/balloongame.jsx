// 

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const BalloonGame = () => {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetch('https://marcconrad.com/uob/banana/api.php')
      .then(response => response.json())
      .then(data => {
        setQuestion(data.question);
        const params = new URLSearchParams(data.solution.slice(1));
        const correctAnswer = parseInt(params.get('banana'));
        setAnswer(correctAnswer);
        generateNumbers(correctAnswer);
        setLoading(false);
      });
  }, []);

  const generateNumbers = (correctAnswer) => {
    const numbers = [];
    for (let i = 0; i < 7; i++) {
      numbers.push(correctAnswer + Math.floor(Math.random() * 20 - 10));
    }
    numbers.push(correctAnswer);
    setNumbers(numbers.sort(() => Math.random() - 0.5));
  };

  const handleBalloonClick = (number) => {
    if (gameOver) return;
    
    if (number === answer) {
      setScore(score + 10);
      setGameOver(true);
    } else {
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) setGameOver(true);
        return newLives;
      });
    }
  };

  const resetGame = () => {
    setGameOver(false);
    setLives(3);
    setScore(0);
    fetch('https://marcconrad.com/uob/banana/api.php')
      .then(response => response.json())
      .then(data => {
        const params = new URLSearchParams(data.solution.slice(1));
        setAnswer(parseInt(params.get('banana')));
        generateNumbers(parseInt(params.get('banana')));
      });
  };

  if (loading) return <div className="loading">Loading Game...</div>;

  return (
    <div className="game-container">
      <div className="header">
        <h1>Math Balloon Pop</h1>
        <div className="score-board">
          <span>Score: {score}</span>
          <span>Lives: {Array(lives).fill('❤️').join(' ')}</span>
        </div>
      </div>

      <div className="question-section">
        <img src={question} alt="Math problem" className="question-image" />
      </div>

      <div className="balloon-area">
        {numbers.map((number, index) => (
          <div
            key={index}
            className={`balloon ${gameOver && number === answer ? 'popped' : ''}`}
            style={{
              left: `${Math.random() * 85}%`,
              animationDuration: `${8 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
              zIndex: numbers.length - index
            }}
            onClick={() => handleBalloonClick(number)}
          >
            <div className="balloon-number">{number}</div>
            <div className="balloon-string"></div>
          </div>
        ))}
      </div>

      {gameOver && (
        <div className="game-over-screen">
          <h2>{lives > 0 ? 'You Won! 🎉' : 'Game Over! 😢'}</h2>
          <button className="btn btn-primary" onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default BalloonGame;