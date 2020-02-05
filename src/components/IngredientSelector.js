import React from 'react';
import {Trans} from 'react-i18next';
import axios from "axios";
import {SERVER_ADDR} from "../constants";
import Select from 'react-select';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Form} from "react-bootstrap";

class IngredientSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allIngredients: [],
            rows: 1
        }
    }

    addSelect = (event) => {
        this.setState(({rows}) => ({rows: rows + 1}));
    };

    removeSelect = (event, index) => {
        if (this.state.rows > 1) {
            this.setState(({rows}) => ({rows: rows - 1}));

            this.addIngredientToOptions(this.props.ingredients[index]);
            this.props.ingredients.splice(index, 1);
            this.props.onChange();
        }
    };


    onSelectChange = (value, index) => {
        this.addIngredientToOptions(this.props.ingredients[index]);
        this.removeIngredientFromOptions(value);

        if (this.props.ingredients[index] !== undefined && this.props.ingredients[index].amount !== undefined)
            value.amount = this.props.ingredients[index].amount;
        else
            value.amount = "0";

        this.props.ingredients[index] = value;
        this.props.onChange();
    };

    handleAmountChange = (event, index) => {
        this.props.ingredients[index].amount = event.target.value;
        this.props.onChange();
    };

    addIngredientToOptions = (ingredient) => {
        if (ingredient !== undefined) {
            this.state.allIngredients.push(ingredient);
            this.state.allIngredients.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        }
    };

    removeIngredientFromOptions = (ingredient) => {
        this.setState({allIngredients: this.state.allIngredients.filter(item => item.id !== ingredient.id)});
    };


    componentDidMount() {
        axios.get(`${SERVER_ADDR}/recipes/get_all_ingredients`).then(response => {
            response.data.ingredients.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            this.setState({allIngredients: response.data.ingredients});
        });

        this.setState({rows: this.props.ingredients.length});
    }


    render() {

        const{ingredients, error} = this.props;

        return (
            <div>
                {Array.from({length: this.state.rows}, (_, index) => (
                    <div className="form-row mt-3" key={index}>
                        <div className="new-recipe-ingredient-select">
                            <label>
                                <Trans i18nKey="addIngredient.select"/>
                            </label>

                            <Select
                                className="ingredient-select"
                                value={ingredients[index] === undefined ? '' : ingredients[index]}
                                onChange={value => this.onSelectChange(value, index)}
                                options={this.state.allIngredients}
                                getOptionLabel={(ingredient) => <Trans>{ingredient.name}</Trans>}
                                getOptionValue={(ingredient) => ingredient.id}
                                placeholder={<Trans>ingredient.select</Trans>}/>
                        </div>
                        <div className="new-recipe-ingredient-amount">
                            <div
                                className={ingredients[index] === undefined ? "hidden" : "ingredient-amount-div"}>
                                <label>
                                    <Trans i18nKey="addIngredient.amount"/>
                                    &ensp;({ingredients[index] === undefined ? '' : <Trans>{ingredients[index].typeOfServing}</Trans>})
                                </label>
                                <Form.Control type="number" value={ingredients[index] === undefined ? "" : (
                                    ingredients[index].amount === undefined ? "" : ingredients[index].amount)}
                                              step="0.01" name="amount"
                                              onChange={e => this.handleAmountChange(e, index)}
                                              isInvalid={!!error[index]}/>

                                <Form.Control.Feedback type="invalid">
                                    <Trans>{error[index]}</Trans>
                                </Form.Control.Feedback>
                            </div>
                            <button type="button" id={index} onClick={e => this.removeSelect(e, index)}
                                    className="bg-transparent text-center delete-ingredient-button delete-btn">
                                <FontAwesomeIcon icon={faTrash} className="fa-2x red-ic"/>
                            </button>
                        </div>
                    </div>
                ))}

                <div className="form-row mb-4">
                    <button type="button" name="btnAdd" className="btn btn-green new-ingredient-btn"
                            onClick={this.addSelect}>
                        <Trans i18nKey="Recipe.addIngredient"/>
                    </button>
                </div>
            </div>
        )
    }
}

IngredientSelector.defaultProps = {
    ingredients: [],
    error: [],
};

export default IngredientSelector;