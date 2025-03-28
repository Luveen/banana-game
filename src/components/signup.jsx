import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./signup.css";

function Signup() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const handleAccountCreation = (e) => {
    // Add your sign-up logic here (e.g., form validation, API call, etc.)
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", {username, email, password})
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });

    // Navigate to the Login page
    navigate("/");
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row" onSubmit={handleAccountCreation}>
          <div className="heading">
            <h1>Balloon Math</h1> <br />
            <h2>SIGNUP</h2>
            <br />
          </div>

          <div className="col-md-12">
            <div className="signup-fields justify-content-center">
              <h1>Name</h1>
              <input
                type="text"
                name="enter username "
                id="username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <h1>Email</h1>
              <input type="email" name="enter username " id="email" required 
              onChange={(e) => setEmail(e.target.value)} />
              <h1>password</h1>
              <input
                type="password"
                name="enter username "
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* adding button login */}

              <div class="couche1" id="blue1" onClick={handleAccountCreation}>
                <div class="couche2" id="blue2">
                  <div class="couche23" id="blue23">
                    <div class="couche3" id="blue3">
                      <div class="couche4" id="blue4">
                        <span class="battle" id="battle_blue">
                          Create Account
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
