import React, { Component, Fragment}  from 'react';
import { FaClock, FaLightbulb } from "react-icons/fa6";
import M from 'materialize-css';

import questions  from '../questions.json';
import isEmpty from '../utils/isEmpty';


class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
        questions: questions,
        currentQuestion: {},
        nextQuestion: {},
        previousQuestion: {},
        answer: [],
        numberOfQuestions:  0,
        numberOfAnsweredQuestions:  0,
        currentQuestionIndex:  0,
        score:  0,
        correctAnswers:   0,
        wrongtAnswers: 0,
        hints: 5,
        time: {}
        };

    }

    componentDidMount () {
        const {questions, currentQuestion, nextQuestion, previousQuestion}  = this.state;
        this.displayQuestions(questions, currentQuestion,  nextQuestion, previousQuestion);
    }


displayQuestions =  (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
    let {currentQuestionIndex}  = this.state;
    if (!isEmpty(this.state.questions)) {
        questions = this.state.questions;
        currentQuestion = questions[currentQuestionIndex];
        nextQuestion = questions[currentQuestionIndex + 1];
        previousQuestion = questions[currentQuestionIndex - 1];
        const answer = currentQuestion.answer;
        this.setState({
            currentQuestion: currentQuestion,
            nextQuestion: nextQuestion,
            previousQuestion: previousQuestion,
            answer: answer,
        });
    }
};

handleOptionClick  = (e) => {
    if  (e.target.innerHTML.toLowerCase() ===  this.state.answer.toLowerCase()) {
        this.correctAnswers();
    } else  {
        this.wrongAnswers();
    }
}

correctAnswers =  () => {
    M.toast({html:  'Correct answer!', classes: 'toast-valid', displayLength:  2000});
    this.setState(prevState => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
    }));
}

wrongAnswers =  () => {
    navigator.vibrate(1000);
    M.toast({html:  'Wrong answer!', classes: 'toast-invalid', displayLength:  2000});

    this.setState(prevState => ({
      wrongtAnswers:  prevState.wrongtAnswers + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,


    }));
}

    render () {
        const {currentQuestion}  = this.state;

        return (
            <Fragment>
                <div className='questions'>
                    <h2>Quiz Mode</h2>
                    <div className='page-clock-hint-container'>
                        <div className='clock'>                          
                            2:15 <span className='clock-icon'><FaClock size={20}/></span>
                        </div>                        
                        <div className='page'>
                            <span>1 of 15</span> 
                        </div>
                        <div className='hint'>
                            <p>
                                <span className="hint-bulb"><FaLightbulb size={20} /></span><span className='hint-number'>5</span>
                            </p>
                        </div>
                    </div>
                    <h5>{currentQuestion.question}</h5>
                    <div className='options-container'>
                        <p onClick={this.handleOptionClick} className='option'>{currentQuestion.optionA}</p>
                        <p onClick={this.handleOptionClick} className='option'>{currentQuestion.optionB}</p>
                    </div>
                    <div className='options-container'>
                        <p onClick={this.handleOptionClick} className='option'>{currentQuestion.optionC}</p>
                        <p onClick={this.handleOptionClick} className='option'>{currentQuestion.optionD}</p>                  
                    </div>
                    <div className='button-container'>
                        <button>Previous</button>
                        <button>Quit</button>
                        <button>Next</button>
                    </div>
                </div>
            </Fragment>
        );
    }

}
export default Play;