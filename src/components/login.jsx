import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    // Add your login logic here (e.g., form validation, API call, etc.)
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { username, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Sucessfully logged in") {  

          // Store the username in local storage
          localStorage.setItem("username", username);

          navigate("/game");
        }
        else {
          console.log("Invalid credentials");
        }
        
      })
      .catch((err) => console.log(err));

  };

  const handleSignup = () => {
    navigate("/signup");
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="heading">
            <img src="src\assets\logoimg.png" alt="logo" height={100} /> <br />
              <h2>LOGIN</h2>
              <br />
            </div>
          </div>
          <div className="col-md-12">
            <div className="login-fields justify-content-center">
              <h1>username</h1>
              <input
                type="text"
                name="enter username "
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <h1>password</h1>
              <input
                type="password"
                name="enter username "
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* adding button login */}

              <div class="couche1" id="green1" onClick={handleLogin}>
                <div class="couche2" id="green2">
                  <div class="couche23" id="green23">
                    <div class="couche3" id="green3">
                      <div class="couche4" id="green4">
                        <span class="battle" id="battle_green">
                          Login
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />

              <div class="couche1" id="blue1" onClick={handleSignup}>
                <div class="couche2" id="blue2">
                  <div class="couche23" id="blue23">
                    <div class="couche3" id="blue3">
                      <div class="couche4" id="blue4">
                        <span class="battle" id="battle_blue">
                          Signup
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

export default Login;