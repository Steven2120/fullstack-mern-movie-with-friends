//imports react
import React, { Component } from "react";
import "./Home.css";

//renders jsx
export class Home extends Component {
  render() {
    return (
      <div className="home__container">
        <video src="/Videos/movieHome.mp4" autoPlay loop muted />
        <h1>Movie With Friends</h1>
      </div>
    );
  }
}

export default Home;
