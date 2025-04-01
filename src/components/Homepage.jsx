import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Homepage.css";

function Homepage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/Login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="heading-homepage">
              <img src="src\assets\logoimg.png" alt="logo" height={200} />
              <br />
            </div>
          </div>
          <div className="col-md-12">
            <div className="homepage-buttons">
              <button className="start-game-btn" onClick={handleLogin}>
                Start Game
              </button>
            </div>
          </div>
        </div>

        <div className="container">
          <span className="hover-me">Hover over me for Game Instructions!</span>
          <div className="tooltip">
            
            <img src="src\assets\logoimg.png" alt="logo" height={20} />
            <p><b>How to Play</b></p>
            <p><b>Solve the Equation –</b> Look at the math problem displayed at the top.</p>
            <p><b>Find the Answer – </b> One of the floating balloons has the right number.</p>
            <p><b>Pop It! – </b> Click the correct balloon</p>
            <p><b>Game Rules</b></p>
            <p><b>✔ Correct Answer → </b>  +10 points!</p>
            <p><b>❌ Wrong Answer →</b> Lose 1 life (❤️).</p>
            <p><b>⏳ Timer (Hard Mode) –</b> Balloons move faster, and time decreases!</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
