import React from 'react';
import {Button} from "react-bootstrap";
import Slider from "react-slick";
import RecipeStep from "./RecipeStep";
import {Trans} from "react-i18next";

class RecipeSteps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            carousel: '',
            isPlaying: false,
        };
        this.slider = React.createRef();
    }

    addItem = () => {
        console.log(this.state.index);
    };

    slickPrev = () => {
        this.slider.slickPrev();
        this.setState({index: this.state.index - 1});
    };

    slickNext = () => {
        this.slider.slickNext();
        this.setState({index: this.state.index + 1});
    };

    endCooking = () => {

    };


    render() {
        const {steps} = this.props;

        return (
            <section className="step-section">
                <p className="step-number-indicator">
                    <Trans i18nKey="recipe.stepLeft" values={{currentStep: this.state.index+1, totalSteps: steps.length}}/>
                </p>
                <div>
                    <Slider ref={c => (this.slider = c)} adaptiveHeight={true} dots={false}
                            swipeToSlide={false} arrows={false} infinite={false}>
                        {Object.keys(steps).map(idx => <RecipeStep key={idx} step={{title:
                                <Trans i18nKey="recipe.step" values={{0: parseInt(idx) + 1}}/>, ...steps[idx]}}/>)}
                    </Slider>
                    <div className="step-buttons">
                        <Button className="btn-green float-left"
                                onClick={this.slickPrev} disabled={this.state.index === 0}>Previous</Button>
                        { this.state.index < steps.length - 1 ?
                            <Button className="btn-green float-right"
                                    onClick={this.slickNext}>Next</Button> :
                            <Button className="btn-green float-right"
                                    onClick={this.endCooking}>Finish</Button>
                        }
                    </div>
                </div>
            </section>
        );
    }
}

export default RecipeSteps;