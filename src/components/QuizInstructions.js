import React, {Fragment} from "react";
import { Link } from "react-router-dom";
import { FaLightbulb } from "react-icons/fa6";



  

const QuizInstructions =  () => {
    return (
        <Fragment>
            <div className="instruction-container">
                <h1>Instuctions on how to play the quiz</h1>
                <p>Ensure you read this guide carefully before proceeding to the quiz</p>
                <ul className="browser-default" id="main-list">
                    <li>This game has a duration of <b>15 minutes</b> and ends as soon as your time is up</li>
                    <li>Each game  has <b>15 questions</b></li>
                    <li>Every question has <b>4 options</b></li>
                    <li><b>Select</b> the option you think is correct</li>
                    <li>Each game has <b>5 hints</b></li>
                    <li>Use a <b>hint</b> by clicking the icon 
                     <span className="hint-icon"><FaLightbulb size={20} /></span>
                     will <b>remove</b> one wrong answer from the options.
                    </li>      
                    <li>Fill free to quite the game any tine. In that case your score will be <b>revealed</b> afterwords. </li>  
                    <li>The timer will <b>start automatically</b> as soon as the game loads</li>
                    <li><b>Good luck and have fun!</b></li>
                </ul>
                <div className="btns">
                    <span className="left"><Link to="/">No, take me back</Link></span>
                    <span className="right"><Link to="/play">Ok, let's play</Link></span>
                </div>
            </div>
        </Fragment>
    );
};

export default QuizInstructions;
