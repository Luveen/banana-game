import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './app.css'
import FetchGameData from './game.jsx';
import Login from './components/login.jsx'
import Signup from './components/signup.jsx'


function App() {
  return (
    <div>
      <Signup />
      {/* <Login /> */}
      {/* <FetchGameData />  */}
    </div>
  );
}

export default App;