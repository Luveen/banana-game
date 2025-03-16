import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './app.css'
import FetchGameData from './game.jsx';
import Login from './components/login.jsx'


function App() {
  return (
    <div>
      <Login />
      {/* <FetchGameData />  */}
    </div>
  );
}

export default App;