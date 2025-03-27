import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import FetchGameData from "./game.jsx";
import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Login page */}
        <Route path="/" element={<Login />} />

        {/* Route for the Signup page */}
        <Route path="/signup" element={<Signup />} />

        {/* Route for the Game page */}
        <Route path="/game" element={<FetchGameData />} />
      </Routes>
    </Router>
  );
}

export default App;