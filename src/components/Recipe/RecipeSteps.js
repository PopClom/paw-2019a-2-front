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

    slickPrev = () => {
        this.slider.slickPrev();
    };

    slickNext = () => {
        this.slider.slickNext();
    };

    render() {
        const {steps, showCookingModal} = this.props;
        const settings = {
            adaptiveHeight: true,
            dots: false,
            arrows: false,
            infinite: false,
            beforeChange: (current, next) => this.setState({index: next})
        };

        return (
            <section className="step-section">
                <div>
                    <p className="steps-title">
                        <Trans i18nKey="recipe.step" values={{0: this.state.index+1, 1: steps.length}}/>
                    </p>
                    <Slider ref={c => (this.slider = c)} {...settings}>
                        {Object.keys(steps).map(idx => <RecipeStep key={idx} step={steps[idx]}/>)}
                    </Slider>
                    <div className="step-buttons">
                        <Button className="btn-green float-left" onClick={this.slickPrev}
                                disabled={this.state.index === 0}><Trans i18nKey="recipe.prevStep"/></Button>
                        {this.state.index < steps.length - 1 ?
                            <Button className="btn-green float-right"
                                    onClick={this.slickNext}><Trans i18nKey="recipe.nextStep"/></Button> :
                            <Button className="btn-green float-right"
                                    onClick={showCookingModal}><Trans i18nKey="recipe.cook"/></Button>}
                    </div>
                </div>
            </section>
        );
    }
}

export default RecipeSteps;