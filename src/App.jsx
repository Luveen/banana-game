import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

// Importing the components
import Homepage from "./components/Homepage.jsx";
import Signup from "./components/signup.jsx";
import Login from "./components/login.jsx";
import FetchGameData from "./game.jsx";


function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Homepage */}
        <Route path="/" element={<Homepage />} />

        {/* Route for the Login page */}
        <Route path="/Login" element={<Login />} />

        {/* Route for the Signup page */}
        <Route path="/signup" element={<Signup />} />

        {/* Route for the Game page */}
        <Route path="/game" element={<FetchGameData />} />
      </Routes>
    </Router>
  );
}

export default App;