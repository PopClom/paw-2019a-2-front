import React from 'react';
import {withTranslation, Trans} from 'react-i18next';
import {Link} from "react-router-dom";
import Select from 'react-select';
import axios from "axios";
import {SERVER_ADDR} from "../constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons'

class RecipeEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            instructions: '',
            ingredients: [],
            amounts: [0],
            tags: [],
            image: '',
            formErrors: {name: '', description: '', instructions: '', ingredients: '', tags: '', image: ''},
            allIngredients: [],
            allTags: [],
            rows: 1
        };
    }

    handleAmountChange = (event, index) => {
        let amounts = this.state.amounts;
        amounts[index] = event.target.value;
        this.setState({amounts: amounts});
    };

    onSelectChange = (value, index) => {
        let ingredients = this.state.ingredients;
        ingredients[index] = value;

        this.setState({ingredients: ingredients});

        console.log(this.state.ingredients);
    };

    addSelect = (event) => {
        this.setState(({ rows }) => ({ rows: rows + 1 }));
        let amounts = this.state.amounts;
        amounts[this.state.rows] = 0;
        this.setState({amounts});
    };

    removeSelect = (event, index) => {
        if(this.state.rows > 1) {
            this.setState(({rows}) => ({rows: rows - 1}));

            let amounts = this.state.amounts;
            amounts.splice(index,1);
            this.setState({amounts});

            let ingredients = this.state.ingredients;
            ingredients.splice(index,1);
            this.setState({ingredients: ingredients}, () => {

                console.log(this.state.ingredients);
                console.log(this.state.amounts);
            });

        }
    };

    onSelectTagsChange = (values) => {
        this.setState({tags: values}, () => {
            console.log(this.state.tags);
        });
    };

    componentDidMount() {
        axios.get(`${SERVER_ADDR}/recipes/get_tags`).then(response => {
            this.setState({allTags: response.data.tags});
            console.log(this.state.allTags);
        });

        axios.get(`${SERVER_ADDR}/recipes/get_all_ingredients`).then(response => {
            this.setState({allIngredients: response.data.ingredients});
        });
    };

    /*seguro hay una forma mas linda*/
    assignParams = () =>{
        let {name, description, instructions, ingredients, tags, image, formErrors, allIngredients, allTags, amounts} = this.state;

        let params = this.props.location.state;
        if(params !== undefined){
            if(params.name !== undefined)
                name = params.name;
            if(params.description !== undefined)
                description = params.description;
            if(params.instructions !== undefined)
                instructions = params.instructions;
            if(params.ingredients !== undefined)
                ingredients = params.ingredients;
            if(params.tags !== undefined)
                tags = params.tags;
            if(params.image !== undefined)
                image = params.image;
            if(params.amounts !== undefined)
                amounts = params.amounts;
        }
        return {name, description, instructions, ingredients, tags, image, formErrors, allIngredients, allTags, amounts};
    };

    render() {
        const {name, description, instructions, ingredients, tags, image, formErrors, allIngredients, allTags, amounts} = this.assignParams();

        const {t} = this.props;

        return (
            <section className="main_container">

                <div className="card card-new-recipe">
                    <div className="card-body">
                        <h3>
                            <Trans i18nKey="addNewRecipe"/>
                        </h3>
                        <form method="post" encType="multipart/form-data">

                            <div className="form-row mb-4">
                                <label htmlFor="recipe_title">
                                    <Trans i18nKey="Recipe.name"/>
                                    <span className="tooltip-test" title={t('recipeName.title')}>
                                        <FontAwesomeIcon icon={faInfoCircle}/>
                                    </span>
                                </label>
                                <input value={name} type="text" id="recipe_title" className="form-control"
                                       placeholder={t('recipeName.placeholder')}/>
                                <errors className="form-text text-muted error-text" element="small">
                                    <Trans>{formErrors.name}</Trans>
                                </errors>
                            </div>

                            <div className="form-row mb-4">
                                <label htmlFor="recipe_description">
                                    <Trans i18nKey="Recipe.description"/>
                                    <span className="tooltip-test" title={t('description.title')}>
                                        <FontAwesomeIcon icon={faInfoCircle}/>
                                    </span>
                                </label>
                                <input value={description} type="text" id="recipe_description"
                                       className="form-control" placeholder={t('description.placeholder')}/>
                                <errors className="form-text text-muted error-text" element="small">
                                    <Trans>{formErrors.description}</Trans>
                                </errors>
                            </div>

                            <div className="form-row mb-4">
                                <label htmlFor="recipe_description">
                                    <Trans i18nKey="Recipe.instructions"/>
                                    <span className="tooltip-test" title={t('instructions.title')}>
                                        <FontAwesomeIcon icon={faInfoCircle}/>
                                    </span>
                                </label>
                                <textarea value={instructions} className="comment-textarea form-control mb-4"
                                          id="recipe_description_textarea"
                                          placeholder={t('instructions.placeholder')}/>
                                <errors className="form-text text-muted error-text" element="small">
                                    <Trans>{formErrors.instructions}</Trans>
                                </errors>
                            </div>
                            <div>

                            {Array.from({ length: this.state.rows }, (_, index) => (
                                <div id="clonedInput1" className="to_clone clonedInput_1 form-row" key={index}>
                                    <div className="new-recipe-ingredient-select">
                                        <label className="ingredientLabel">
                                            <Trans i18nKey="addIngredient.select"/>
                                        </label>

                                        <Select
                                            value={ingredients[index] === undefined ? '' : ingredients[index]}
                                            onChange={value => this.onSelectChange(value, index)}
                                            options={allIngredients}
                                            getOptionLabel={(ingredient) => t(ingredient.name)}
                                            getOptionValue={(ingredient) => ingredient.name}
                                            placeholder = {t('ingredient.select')}/>
                                    </div>
                                    <div className="new-recipe-ingredient-amount">
                                        <label className="ingredientAmountLabel">
                                            <Trans i18nKey="addIngredient.amount"/>
                                        </label>
                                        <input type="number" value={amounts[index]} step="0.01" name="amount"
                                               className="form-control mb-4 ingredientAmountInput" onChange={e => this.handleAmountChange(e,index)}/>
                                    </div>
                                    <button type="button" id={index} onClick={e => this.removeSelect(e, index)}
                                            className="bg-transparent text-center delete-ingredient-button delete-btn">
                                        <FontAwesomeIcon icon={faTrash} className="fa-2x red-ic"/>
                                    </button>
                                </div>
                            ))}
                            </div>

                            <errors className="form-text text-muted error-text" element="small"/>

                            <div className="form-row mb-4">
                                <button type="button" name="btnAdd" className="btn btn-green new-ingredient-btn" onClick={this.addSelect}>
                                    <Trans i18nKey="Recipe.addIngredient"/>
                                </button>
                            </div>

                            <div className="form-row">
                                <label>
                                    <Trans i18nKey="Recipe.image"/>
                                </label>
                            </div>

                            <div className="form-row">
                                <button type="button" id="btnFile" name="btnAdd" className="btn btn-green">
                                    <Trans i18nKey="Recipe.addImage"/>
                                </button>
                                <input id="fileInput" className="d-none" type="file"/>
                            </div>
                            <div className="form-row mb-4">
                                <errors className="form-text text-muted error-text" element="small"/>
                            </div>

                            <div className="form-row">
                                <label>
                                    Agregar tags (TRADUCIR)
                                </label>
                            </div>

                            <Select
                                onChange={this.onSelectTagsChange}
                                options={allTags}
                                value={tags}
                                isMulti="true"
                                getOptionLabel={(tag) => t(tag)}
                                getOptionValue={(tag) => t(tag)}
                                placeholder = {t('tags.select')}/>

                            <div className="bottom-new-recipe-btn">
                                <Link to={`/`} className="btn btn-blue-grey">
                                    <Trans i18nKey="close"/>
                                </Link>
                                <button type="submit" className="btn btn-green">
                                    <Trans i18nKey="saveChangesButton"/>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}

const Extended = withTranslation()(RecipeEditor);
Extended.static = RecipeEditor.static;

export default Extended;