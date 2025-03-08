import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './app.css'
import FetchGameData from './game.jsx';
import backgroundImage from './assets/game-background.jpg'
import ImageToText from "./components/imageToText.jsx";
import BalloonGame from "./balloongame.jsx";
import Balloon from "./components/balloon.jsx";


function App() {
  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
      <FetchGameData />
      <BalloonGame/>
      <Balloon />
       
    </div>
  );
}

export default App;