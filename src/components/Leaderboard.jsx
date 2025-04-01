import React, { useEffect, useState } from "react";
import axios from "axios";
import "./leaderboard.css";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch leaderboard data from the backend
    axios
      .get("http://localhost:3001/leaderboard")
      .then((response) => {
        setLeaderboard(response.data);
      })
      .catch((err) => console.log("Error fetching leaderboard data:", err));
  }, []);

  return (
    <div className="leaderboard-container">
      <img src="src/assets/logoimg.png" alt="logo" height={100} /> <br />
      <h1>Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>
              <h4
                className="table-id m-1"
                style={{ width: "40px", cursor: "auto" }}
              >
                ID
                <i className="bi bi-trophy-fill"></i>
              </h4>
            </th>
            <th>
              <h4
                className="table-username m-1 fw-bold"
                style={{ width: "100px",  textAlign: "center" }}
              >
                Username
              </h4>
            </th>
            <th>
              <h4
                className="table-score m-1"
                style={{ width: "50px", cursor: "auto" }}
              >
                Score
              </h4>
            </th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.length === 0 ? (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          ) : (
            leaderboard.map((entry, index) => (
              <tr key={entry._id}>
                <td>
                  <p
                    className="table-data-id m-1"
                    style={{ width: "40px", cursor: "auto" }}
                  >
                    {index + 1}
                  </p>
                </td>
                <td>
                  <p
                    className="table-data-username m-1 fw-bold"
                    style={{ width: "100px", cursor: "auto", textAlig: "center" }}
                  >
                    {entry.username}
                  </p>
                </td>
                <td>
                  <p
                    className="table-data-score m-1"
                    style={{ width: "50px", cursor: "auto" }}
                  >
                    {entry.score}
                  </p>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="leaderboard-buttons">
        <button
          className="btn btn-success m-2"
          onClick={() => navigate("/game")} // Navigate back to the game page
        >
          Back to Game
        </button>
        <button
          className="btn btn-danger m-2"
          onClick={() => navigate("/")} // Navigate to the homepage
        >
          Exit
        </button>
      </div>
    </div>
  );
}

export default Leaderboard;