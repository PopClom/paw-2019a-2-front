import React from 'react';
import {withTranslation, Trans} from 'react-i18next';
import {Link} from "react-router-dom";
import Select from 'react-select';
import axios from "axios";
import {SERVER_ADDR} from "../constants";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfoCircle, faTrash} from '@fortawesome/free-solid-svg-icons'
import IngredientSelector from "../components/IngredientSelector";
import {handleInputChange, onChange} from "../helpers";
import {Form, OverlayTrigger, Button, Tooltip} from "react-bootstrap";
import TooltipHover from "../components/TooltipHover";

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

        this.handleInputChange = handleInputChange.bind(this);
    }

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

    onFormSubmit = (event) =>{
        event.preventDefault();

        let formErrors = this.state.formErrors;

        console.log(this.state.name.length);
        formErrors.name = (this.state.name.length < 5 || this.state.name.length > 100) ? "userNotExist" : '';
        formErrors.description = (this.state.description.length < 10 || this.state.description.length > 100) ? "userNotExist" : '';
        formErrors.instructions = (this.state.description.length < 20 || this.state.description.length > 4000) ? "userNotExist" : '';

    };

    render() {
        const {name, description, instructions, ingredients, tags, image, formErrors, allTags} = this.assignParams();
        const {t} = this.props;

        return (
            <section className="main_container">

                <div className="card card-new-recipe">
                    <div className="card-body">
                        <h3>
                            <Trans i18nKey="addNewRecipe"/>
                        </h3>

                        <Form onSubmit={this.onFormSubmit}>
                            <Form.Row className="mb-4">
                                <Form.Label>
                                    <Trans i18nKey="Recipe.name"/>
                                </Form.Label>
                                <TooltipHover placement="right" message={t('recipeName.title')}
                                              icon={<FontAwesomeIcon className="tooltip-recipe" icon={faInfoCircle}/>}/>

                                <Form.Control value={name} type="text"
                                              placeholder={t('recipeName.placeholder')} name="name"
                                              onChange={this.handleInputChange} isInvalid={formErrors.name.length > 0}/>
                                <Form.Control.Feedback type="invalid">
                                    <Trans>{formErrors.name}</Trans>
                                </Form.Control.Feedback>
                            </Form.Row>


                            <Form.Row className="mb-4">
                                <Form.Label>
                                    <Trans i18nKey="Recipe.description"/>
                                </Form.Label>
                                <TooltipHover placement="right" message={t('description.title')}
                                              icon={<FontAwesomeIcon className="tooltip-recipe" icon={faInfoCircle}/>}/>
                                <Form.Control value={description} type="text"
                                              placeholder={t('description.placeholder')} name="description"
                                              onChange={this.handleInputChange}
                                              isInvalid={formErrors.description.length > 0}/>

                                <Form.Control.Feedback type="invalid">
                                    <Trans>{formErrors.description}</Trans>
                                </Form.Control.Feedback>
                            </Form.Row>

                            <Form.Row className="mb-4">
                                <Form.Label>
                                    <Trans i18nKey="Recipe.instructions"/>
                                </Form.Label>
                                <TooltipHover placement="right" message={t('instructions.title')}
                                              icon={<FontAwesomeIcon className="tooltip-recipe" icon={faInfoCircle}/>}/>

                                <Form.Control as="textarea" name="instructions" className="comment-textarea"
                                              value={instructions}
                                              placeholder={t('instructions.placeholder')}
                                              isInvalid={formErrors.instructions.length > 0}
                                              onChange={this.handleInputChange}/>

                                <Form.Control.Feedback type="invalid">
                                    <Trans>{formErrors.instructions}</Trans>
                                </Form.Control.Feedback>
                            </Form.Row>

                            <IngredientSelector ingredients={this.state.ingredients}
                                                error={this.state.formErrors.ingredients}
                                                onChange={onChange.bind(this)}/>

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

                            <Form.Control.Feedback type="invalid">
                                <Trans>{formErrors.image}</Trans>
                            </Form.Control.Feedback>


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

                            <Form.Control.Feedback type="invalid">
                                <Trans>{formErrors.tags}</Trans>
                            </Form.Control.Feedback>

                            <div className="bottom-new-recipe-btn">
                                <Link to={`/`}>
                                    <Button type="submit" className="btn-blue-grey">
                                        <Trans i18nKey="close"/>
                                    </Button>
                                </Link>
                                <Button type="submit" className="btn-green">
                                    <Trans i18nKey="saveChangesButton"/>
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </section>
        );
    }
}

const Extended = withTranslation()(RecipeEditor);
Extended.static = RecipeEditor.static;

export default Extended;