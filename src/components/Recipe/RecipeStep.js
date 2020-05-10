import React from 'react';
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import {Trans} from "react-i18next";

class RecipeStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false
        }
    }

    getRemainingTime = value => {
        const m = Math.floor(value / 60);
        const s = value % 60;
        return (
            <div>
                <div className="timer-value">{m >= 10 ? m : "0" + m}:{s >= 10 ? s : "0" + s}</div>
            </div>
        )
    };

    notStartedRender = value => {
        return (
            <div>
                <button className="fullWidth fullHeight bg-transparent"
                        onClick={() => this.setState({isPlaying: true})}>
                    <div className="timer-text"><Trans i18nKey="timer.pressToStart"/></div>
                    {this.getRemainingTime(value)}
                </button>
            </div>
        );
    };

    renderTime = value => {
        if (value === 0) {
            return <div className="timer"><Trans i18nKey="timer.timeUp"/></div>;
        }

        return (
            <button className="fullWidth fullHeight bg-transparent"
                    onClick={() => this.setState({isPlaying: !this.state.isPlaying})}>
                <div className="timer">
                    <div className="timer-text"><Trans i18nKey="timer.remaining"/></div>
                    {this.getRemainingTime(value)}
                </div>
            </button>
        );
    };

    render() {
        const {step} = this.props;
        const descriptionLines = step.description ? step.description.split('\n') : [];

        return (
            <div className="step-container">
                <div className="step-title">
                    <h4 className="recipe-title">
                        {step.title}
                    </h4>
                </div>

                <div className="step-description">
                    <p className="recipe-description">
                        {Object.keys(descriptionLines).map(idx => (
                            <span key={idx}>{descriptionLines[idx]}<br/></span>
                        ))}
                    </p>
                </div>

                {step.seconds > 0 ? <CountdownCircleTimer
                    size={140}
                    strokeWidth={10}
                    isPlaying={this.state.isPlaying}
                    durationSeconds={step.seconds}
                    colors={[["#1ed75f", 0.85], ["#F7B801", 0.1], ["#A30000"]]}
                    renderTime={this.state.isPlaying ? this.renderTime : this.notStartedRender}
                /> : ''}
            </div>
        );
    }
}

export default RecipeStep;