import React, { Component, Fragment}  from 'react';
import { FaClock, FaLightbulb } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

import M from 'materialize-css';
import questions  from '../questions.json';
import isEmpty from '../utils/isEmpty';

const PlayWithNavigate = () => {
    const navigate = useNavigate();
    return <Play navigate={navigate} />;
};

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
        wrongAnswers: 0,
        hints: 5,
        nextButtonDisabled: false,
        previousButtonDisabled: true,
        time: {}
        };
        this.interval = null
    }
  

    componentDidMount () {
        const {questions, currentQuestion, nextQuestion, previousQuestion}  = this.state;
        this.displayQuestions(questions, currentQuestion,  nextQuestion, previousQuestion);
        this.setTimer();
    }

    componentWillUnmount () {
        clearInterval(this.interval);
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
            numberOfQuestions: questions.length,
            answer: answer,
        }, () => {
            this.handleDisableButton();
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

handleNextButtonClick = () => {
    if  (this.state.nextQuestion !== undefined) {
        this.setState(prevState => ({
            currentQuestionIndex: prevState.currentQuestionIndex + 1
        }), () => {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
        });
    }
};

handlePreviousButtonClick = () => {
    if  (this.state.previousQuestion !== undefined) {
        this.setState(prevState => ({
            currentQuestionIndex: prevState.currentQuestionIndex - 1
        }), () => {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
        });
    }
};

handleQuitButtonClick =  () => {
    if(window.confirm('Are  you sure you want to quit?')) {
        this.props.navigate('/');
    }
};

handleButtonClick = (e) => {
    switch (e.target.id) {
        case 'next-button':
            this.handleNextButtonClick();
            break;
        case  'previous-button':
            this.handlePreviousButtonClick();
            break;
        case   'quit-button':
            this.handleQuitButtonClick();
            break;
        default:
         break;
    }
}



correctAnswers =  () => {
    M.toast({html:  'Correct answer!', classes: 'toast-valid', displayLength:  2000});
    this.setState(prevState => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
    }), () => {
        if (this.state.nextQuestion === undefined) {
            this.endGame();
        } else {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state);
        }   
     });
}

wrongAnswers =  () => {
    navigator.vibrate(1000);
    M.toast({
        html:  'Wrong answer!', 
        classes: 'toast-invalid', 
        displayLength:  2000
    });

    this.setState(prevState => ({
      wrongAnswers:  prevState.wrongAnswers + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
    }), () => {
        if (this.state.nextQuestion === undefined) {
            this.endGame();
        } else {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state);
        }
    });
}

    setTimer = () => {
        const coutDownTime = Date.now() + 900000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = coutDownTime - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) /  (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if  (distance < 0) {clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                 }, () => {
                    this.endGame();
                 });
                } else {
                    this.setState({
                        time:{
                            minutes: minutes,
                            seconds: seconds
                        }
                 });
             }
        }, 1000);
    }

    handleDisableButton = () => {
        if (this.state.previousQuestion === undefined || this.state.currentQuestionIndex <= 0) {
            this.setState({
                previousButtonDisabled: true
            });
        } else {
            this.setState({
                previousButtonDisabled: false
            });
        }

        if (this.state.nextQuestion === undefined || this.state.currentQuestionIndex +1 ===  this.state.questions.length) {
            this.setState({
                nextButtonDisabled: true
            });
        } else {
            this.setState({
                nextButtonDisabled: false
            });
        }
    }

    endGame  = () => {
        alert('Quiz  finished!');
        const {state}  = this;
        const playerStats = {
            scor: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,  
            usedHints: 5 - state.hints
        };
        console.log(playerStats);
        setTimeout(() => {
            this.props.navigate('/quiz-summary', playerStats);
        }, 3000);
    }


    render () {
        const {currentQuestion,
             currentQuestionIndex, 
             numberOfQuestions,
             time
            }  = this.state;

        return (
            <Fragment>
                <div className='questions'>
                    <h2>Quiz Mode</h2>
                    <div className='page-clock-hint-container'>
                        <div className='clock'>                          
                            {time.minutes}:{time.seconds} <span className='clock-icon'><FaClock size={20}/></span>
                        </div>                        
                        <div className='page'>
                            <span>{currentQuestionIndex + 1} of {numberOfQuestions}</span> 
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
                        <button 
                            className = {`button ${this.state.previousButtonDisabled ? 'disabled': ''}`} 
                            id='previous-button' 
                            onClick={this.handleButtonClick}>
                            Previous
                        </button>
                        <button id='quit-button' onClick={this.handleButtonClick}>Quit</button>
                        <button 
                            className = {`button ${this.state.nextButtonDisabled ? 'disabled': ''}`}        
                            id='next-button' 
                            onClick={this.handleButtonClick}>
                            Next
                        </button>

                    </div>
                </div>
            </Fragment>
        );
    }
}

export default PlayWithNavigate;