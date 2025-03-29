import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

// Importing the components
import Homepage from "./components/Homepage.jsx";
import Signup from "./components/signup.jsx";
import Login from "./components/login.jsx";
import FetchGameData from "./game.jsx";
import Leaderboard from "./components/Leaderboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/game" element={<FetchGameData />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
