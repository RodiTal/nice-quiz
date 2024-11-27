import React, { Component, Fragment } from 'react';
import { useNavigate,  useLocation } from 'react-router-dom';




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
    const { state } =  this.props.location;
    if (state) {
            this.setState({
                score: (state.score / state.numberOfQuestions) * 100,
                numberOfQuestions: state.numberOfQuestions,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers,
                usedHints: state.usedHints
            });
        }
}

    render() {
        const { state, score } = this.props.location;
        let stats, remark
        if(score <= 30) {
            remark = 'Poor';
            }
            else if(score <= 50) {
                remark = 'Average';
                }
                else if(score <= 70) {
                    remark = 'Good';
                    }
                    else if(score <= 90) {
                        remark = 'Excellent';
                        } else {
                            remark = 'Outstanding';
                        }

        if(state !==  undefined) {
            stats = (<h1>stats are available</h1>);
        } else {
            stats = (<h1>No stats available, please take the quiz first</h1>);
        }

        return (
           <Fragment>
                {stats}
           </Fragment>
        );
    }
}


export default  QuizSummaryWithNavigate;



