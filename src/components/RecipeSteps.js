import React from 'react';
import Spinner from './Spinner';
import {Button, Card} from "react-bootstrap";
import Slider from "react-slick";
import RecipeStep from "./RecipeStep";
import {Trans} from "react-i18next";

class RecipeSteps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            steps: [{title: "Primer paso", description:"Cocinalo por una hora papa", timer: 90},
                {title: "Segundo paso", description:"oisajdoadsasdasdasdfhijsadoi oaisd joisad joisad joiads joiasd joidj oaisj", timer: 0},
                {title: "Tercer paso", description:"asdasdaf<iouytycbn23r789dfnbe0as<989da0n hfp9ioudhc sp9a8dcfhn 9p38hdfhoñdfh dsf9hdsa890fayms9d 1298dhsap9d8hn 21390dn91 dnydedq9nhdcfq908h", timer: 10}],
            index: 0,
            carousel: '',
            isPlaying: false,
        };
        this.slider = React.createRef();
    }

    componentDidMount() {
        this.setState({fetching: false});
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
        const {fetching, steps} = this.state;

        return (
            <section className="step-section">
                <div>
                    <p className="step-number-indicator">
                        <Trans i18nKey="recipe.stepLeft" values={{currentStep: this.state.index+1, totalSteps: this.state.steps.length}}/>
                    </p>
                    {fetching ? <Spinner/> :
                        <Slider ref={c => (this.slider = c)} adaptiveHeight={true} dots={false}
                                swipeToSlide={false} arrows={false} infinite={false}>
                            {Object.keys(steps).map(idx => <RecipeStep key={idx} step={steps[idx]}/>)}
                        </Slider>

                    }
                    <div className="step-buttons">
                        <Button className="btn-green float-left"
                                onClick={this.slickPrev} disabled={this.state.index === 0}>Previous</Button>
                        { this.state.index < this.state.steps.length - 1 ?
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