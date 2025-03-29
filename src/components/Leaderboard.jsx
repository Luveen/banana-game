import React, { useEffect, useState } from "react";
import axios from "axios";
import "./leaderboard.css";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  

  useEffect(() => {
    // Fetch leaderboard data from the backend
    axios
      .get("http://localhost:3001/leaderboard")
      .then((response) => {
        setLeaderboard(response.data);
      })
      .catch((err) => console.log(err));


  }, []);

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={entry._id}>
              <td>{index + 1}</td>
              <td>{entry.username}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;