import React, { Component, Fragment } from 'react';
import { useNavigate,  useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';



const QuizSummaryWithNavigate = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return <QuizSummary navigate={navigate} location={location} />;
};




class QuizSummary  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score:  0,
            numberOfQuestions:  0,
            correctAnswers:  0,
            wrongAnswers:  0,
            usedHints: 0
        };
    }

    componentDidMount() {
        const { state } = this.props.location;
        if (state) {
            const score = (state.score / state.numberOfQuestions) * 100;
            let remark = '';
            if (score <= 30) remark = 'Poor';
            else if (score <= 50) remark = 'Average';
            else if (score <= 70) remark = 'Good';
            else if (score <= 90) remark = 'Excellent';
            else remark = 'Outstanding';

            this.setState({
                score,
                numberOfQuestions: state.numberOfQuestions,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers,
                usedHints: state.usedHints,
                remark,
            });
        }
    }

    render() {
        const { state } = this.props.location;
        const { score, numberOfQuestions, correctAnswers, wrongAnswers, usedHints, remark } = this.state;

        let content;
        if (state) {
            content = (
                <Fragment>
                    <h1>Quiz Summary</h1>
                    <p>Score: {score.toFixed(2)}%</p>
                    <p>Number of Questions: {numberOfQuestions}</p>
                    <p>Correct Answers: {correctAnswers}</p>
                    <p>Wrong Answers: {wrongAnswers}</p>
                    <p>Hints Used: {usedHints}</p>
                    <p>Performance Remark: <strong>{remark}</strong></p>
                    <section>
                        <ul>
                            <li>
                                <Link to="/">Back to Home</Link>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <Link to="/play">Play again</Link>
                            </li>
                        </ul>
                    </section>
                </Fragment>
            );
        } else {
            content = (
                <section>     
                    <h1 className='no-stats'>No stats available, please take the quiz first</h1>
                        <ul>
                            <li>
                                <Link to="/">Back to Home</Link>
                            </li>
                        </ul>
                        <ul>
                             <li>
                                <Link to="/play">Take the quiz</Link>
                            </li>
                        </ul>
            
        
        </section>
        );
     }
        return <div className='summary'>{content}</div>;
    }
}
export default QuizSummaryWithNavigate;