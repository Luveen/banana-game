import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './app.css'
import FetchGameData from './game.jsx';
import backgroundImage from './assets/game-background.jpg'


function App() {
  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
      <FetchGameData />
    </div>
  );
}

export default App;