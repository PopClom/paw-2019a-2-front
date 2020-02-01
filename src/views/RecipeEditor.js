import React from 'react';
import {withTranslation, Trans} from 'react-i18next';
import {Link} from "react-router-dom";
import Select from 'react-select';
import axios from "axios";
import {SERVER_ADDR} from "../constants";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfoCircle, faTrash} from '@fortawesome/free-solid-svg-icons'
import IngredientSelector from "../components/IngredientSelector";

class RecipeEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            instructions: '',
            ingredients: [],
            amounts: ["0"],
            tags: [],
            image: '',
            formErrors: {name: '', description: '', instructions: '', ingredients: '', tags: '', image: ''},
            allTags: [],
            rows: 1
        };
    }

    onChange = (change) => {
        this.setState({change}, ()=> {
            console.log(this.state.amounts);
            console.log(this.state.ingredients);
        });
    };

    onSelectTagsChange = (values) => {
        this.setState({tags: values});
    };

    componentDidMount() {
        axios.get(`${SERVER_ADDR}/recipes/get_tags`).then(response => {
            this.setState({allTags: response.data.tags});
        });
    };

    /*seguro hay una forma mas linda*/
    assignParams = () => {
        let {name, description, instructions, ingredients, tags, image, formErrors, allTags, amounts} = this.state;

        let params = this.props.location.state;
        if (params !== undefined) {
            if (params.name !== undefined)
                name = params.name;
            if (params.description !== undefined)
                description = params.description;
            if (params.instructions !== undefined)
                instructions = params.instructions;
            if (params.ingredients !== undefined)
                ingredients = params.ingredients;
            if (params.tags !== undefined)
                tags = params.tags;
            if (params.image !== undefined)
                image = params.image;
            if (params.amounts !== undefined)
                amounts = params.amounts;
        }
        return {name, description, instructions, ingredients, tags, image, formErrors, allTags, amounts};
    };

    render() {
        const {name, description, instructions, ingredients, tags, image, formErrors, allTags, amounts} = this.assignParams();

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

                            <IngredientSelector ingredients={this.state.ingredients} amounts={this.state.amounts} onChange={this.onChange}/>

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
                                placeholder={t('tags.select')}/>

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