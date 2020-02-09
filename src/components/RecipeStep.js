import React from 'react';
import {CountdownCircleTimer} from "react-countdown-circle-timer";

class RecipeStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false
        }
    }

    getRemainingTime = value => {
        return (
            <div>
                {value / 60 >= 1 ? <div className="timer-value">{Math.floor(value / 60)}m {value % 60}s</div> :
                    <div className="timer-value">{value % 60}s</div>}
            </div>
        )
    };

    notStartedRender = value => {
        return (
            <div>
                <button className="fullWidth fullHeight bg-transparent"
                        onClick={() => this.setState({isPlaying: true})}>
                    <div className="timer-text">Press to start</div>
                    {this.getRemainingTime(value)}
                </button>
            </div>
        );
    };

    renderTime = value => {
        if (value === 0) {
            return <div className="timer">Time is up</div>;
        }

        return (
            <button className="fullWidth fullHeight bg-transparent"
                    onClick={() => this.setState({isPlaying: !this.state.isPlaying})}>
                <div className="timer">
                    <div className="timer-text">Remaining</div>
                    {this.getRemainingTime(value)}
                    <div className="timer-text">seconds</div>
                </div>
            </button>
        );
    };

    render() {
        const {step} = this.props;

        return (
            <div className="step-container">
                <div className="step-title">
                    <h4 className="recipe-title">
                        {step.title}
                    </h4>
                </div>


                <div className="step-description">
                    <p className="recipe-description">
                        {step.description}
                    </p>
                </div>

                {step.timer > 0 ? <CountdownCircleTimer
                    isPlaying={this.state.isPlaying}
                    durationSeconds={step.timer}
                    colors={[["#1ed75f", 0.85], ["#F7B801", 0.1], ["#A30000"]]}
                    renderTime={this.state.isPlaying ? this.renderTime : this.notStartedRender}
                /> : ''}
            </div>
        );
    }
}

export default RecipeStep;