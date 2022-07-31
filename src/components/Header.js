import React from "react";
import './style.css';



export default class Header extends React.Component {
    render() {

        return (
            <div className="top">
            <nav>
                <a href="#">
                    Home Page |
                </a>
                
                <a href="#">
                   | About
                </a>
            </nav>
             <h1> City Explorer</h1>

            </div>


        )
    }
}



