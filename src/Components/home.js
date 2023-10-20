import React, { Component } from 'react';
import "./home.css";
import Navbar from "./Navbar.js";
import gym from "../images/gym.png";
import shoulder from "../images/shoulder.png";
import squats from "../images/squats.png";
import triceps from "../images/triceps.png";
import logofi from "../images/logo.jpeg";
import up from "../images/arrow.png";
import down from "../images/down.png";
import { Link } from "react-router-dom";





class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          rotatevalue: 0, // Initial rotation value
        };
      }
    
      handleRotate = (angle) => {
        // Update the rotation value in the state
        this.setState((prevState) => ({
          rotatevalue: prevState.rotatevalue + angle,
        }));
      };

  render() {
    const { rotatevalue } = this.state;
    
    return (
      <div class="main"> 
            <Navbar/>
            <div class="information">
                <div class ="overlay"></div>
                <img src ={logofi} class="mobile"/>
             
                <div id="circle" style={{ transform: `rotate(${rotatevalue}deg)` }}>
                    <div class="feature one"> 
                    <img src ={gym} alt="logo"/>
                    <div><Link to="/Biceps" style={{ textDecoration: 'none', color: 'black' }}> <h2> Biceps</h2></Link></div> </div>
                    <div class="feature two"> 
                    <img src ={shoulder} alt="logo2"/>
                    <div>  <Link to="/Shoulder" style={{ textDecoration: 'none', color: 'black' }}><h2> Shoulder</h2></Link></div> </div>
                    <div class="feature three"> 
                    <img src ={squats} alt="logo3"/>
                    <div> <h2> Squats</h2></div></div>
                    <div class="feature four"> 
                    <img src ={triceps} alt="logo4"/>
                    <div> <Link to="/Triceps" style={{ textDecoration: 'none', color: 'black' }}><h2> Triceps</h2></Link></div></div>
                    </div>

            </div>
            <div class= "controls">
                <img src = {up} id="upBtn" onClick={() => this.handleRotate(-90)}
            alt="Rotate Up"/>
                <h2>Excercise</h2>
                <img src = {down} id="downBtn" onClick={() => this.handleRotate(90)}
            alt="Rotate Down"/>

            </div>
            
            
        
        
         </div>
    )
  }
}

export default Home;