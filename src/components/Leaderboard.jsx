// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./leaderboard.css";

// function Leaderboard() {
//   const [leaderboard, setLeaderboard] = useState([]);

//   useEffect(() => {
//     // Fetch leaderboard data from the backend
//     axios
//       .get("http://localhost:3001/leaderboard")
//       .then((response) => {
//         setLeaderboard(response.data);
//       })
//       .catch((err) => console.log("Error fetching leaderboard data:", err));
//   }, []);

//   return (
//     <div className="leaderboard-container">
//       <img src="src/assets/logoimg.png" alt="logo" height={100} /> <br />
//       <h1>Leaderboard</h1>
//       <table className="leaderboard-table">
//         <thead>
//           <tr>
//             <th>Rank</th>
//             <th>Username</th>
//             <th>Score</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaderboard.length === 0 ? (
//             <tr>
//               <td colSpan="3">No data available</td>
//             </tr>
//           ) : (
//             leaderboard.map((entry, index) => (
//               <tr key={entry._id}>
//                 <td>{index + 1}</td>
//                 <td>{entry.username}</td>
//                 <td>{entry.score}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Leaderboard;



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
              <a
                className="btn btn m-1 fw-bold"
                style={{ width: "40px", cursor: "auto" }}
              >
                ID
                <i className="bi bi-trophy-fill"></i>
              </a>
            </th>
            <th>
              <a
                className="btn btn   m-1 fw-bold"
                style={{ width: "150px", cursor: "auto" }}
              >
                Username
              </a>
            </th>
            <th>
              <a
                className="btn btn m-1 fw-bold"
                style={{ width: "50px", cursor: "auto" }}
              >
                Score
              </a>
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
                  <a
                    className="btn btn-danger m-1 fw-bold"
                    style={{ width: "40px", cursor: "auto" }}
                  >
                    {index + 1}
                  </a>
                </td>
                <td>
                  <a
                    className="btn btn-danger m-1 fw-bold"
                    style={{ width: "150px", cursor: "auto" }}
                  >
                    {entry.username}
                  </a>
                </td>
                <td>
                  <a
                    className="btn btn-danger m-1 fw-bold"
                    style={{ width: "50px", cursor: "auto" }}
                  >
                    {entry.score}
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;