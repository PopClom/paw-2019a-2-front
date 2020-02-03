import React from 'react';
import {Trans, withTranslation} from 'react-i18next';
import {Link} from "react-router-dom";
import Select from 'react-select';
import axios from "axios";
import {SERVER_ADDR} from "../constants";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import IngredientSelector from "../components/IngredientSelector";
import {Form, Button} from "react-bootstrap";
import TooltipHover from "../components/TooltipHover";
import {Formik} from "formik";
import {validateRecipe} from "../helpers/validations";

class RecipeEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allTags: [],
            rows: 1
        };
    }


    componentDidMount() {
        axios.get(`${SERVER_ADDR}/recipes/get_tags`).then(response => {
            this.setState({allTags: response.data.tags});
        });
    };

    /*seguro hay una forma mas linda*/
    assignParams = () => {
        let {name, description, instructions, ingredients, tags, image, allTags, amounts} = this.state;

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
        return {name, description, instructions, ingredients, tags, image, allTags, amounts};
    };

    onFormSubmit = (event) =>{
        event.preventDefault();


        console.log(this.state.name.length);
    };

    render() {
        const {name, description, instructions, ingredients, tags, image, allTags} = this.assignParams();
        const {t} = this.props;

        return (
            <section className="main_container">

                <div className="card card-new-recipe">
                    <div className="card-body">
                        <h3>
                            <Trans i18nKey="addNewRecipe"/>
                        </h3>

                        <Formik
                            initialValues={{
                                name, description, instructions, ingredients, tags, image, allTags
                            }}
                            validate={values => validateRecipe(values)}
                            onSubmit={(values, { setSubmitting }) => {
                                console.log("asdasddsaSAD");
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                }, 400);
                            }}
                        >
                            {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue}) => (

                                <Form onSubmit={handleSubmit}>
                                    <Form.Row className="mb-4">
                                        <Form.Label>
                                            <Trans i18nKey="Recipe.name"/>
                                        </Form.Label>
                                        <TooltipHover placement="right" message={<Trans>recipeName.title</Trans>}
                                                      icon={<FontAwesomeIcon className="tooltip-recipe" icon={faInfoCircle}/>}/>

                                        <Form.Control value={values.name} type="text"
                                                      placeholder={t("recipeName.placeholder")} name="name" onChange={handleChange}
                                                      onBlur={handleBlur} isInvalid={touched.name &&!!errors.name}/>
                                        <Form.Control.Feedback type="invalid">
                                            <Trans>{errors.name}</Trans>
                                        </Form.Control.Feedback>
                                    </Form.Row>


                                    <Form.Row className="mb-4">
                                        <Form.Label>
                                            <Trans i18nKey="Recipe.description"/>
                                        </Form.Label>
                                        <TooltipHover placement="right" message={<Trans>description.title</Trans>}
                                                      icon={<FontAwesomeIcon className="tooltip-recipe" icon={faInfoCircle}/>}/>
                                        <Form.Control value={values.description} type="text"
                                                      placeholder={t("description.placeholder")} name="description"
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      isInvalid={touched.description && !!errors.description}/>

                                        <Form.Control.Feedback type="invalid">
                                            <Trans>{errors.description}</Trans>
                                        </Form.Control.Feedback>
                                    </Form.Row>

                                    <Form.Row className="mb-4">
                                        <Form.Label>
                                            <Trans i18nKey="Recipe.instructions"/>
                                        </Form.Label>
                                        <TooltipHover placement="right" message={<Trans>instructions.title</Trans>}
                                                      icon={<FontAwesomeIcon className="tooltip-recipe" icon={faInfoCircle}/>}/>

                                        <Form.Control as="textarea" name="instructions" className="comment-textarea"
                                                      value={values.instructions}
                                                      placeholder={t('instructions.placeholder')}
                                                      isInvalid={touched.instructions && !!errors.instructions}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}/>

                                        <Form.Control.Feedback type="invalid">
                                            <Trans>{errors.instructions}</Trans>
                                        </Form.Control.Feedback>
                                    </Form.Row>

                                    <IngredientSelector name="ingredients" onChange={(ingredients) => setFieldValue("ingredients", ingredients)} error={errors.ingredients}/>

                                    <div className="form-row">
                                        <label>
                                            <Trans i18nKey="Recipe.image"/>
                                        </label>
                                    </div>

                                    <div className="form-row mb-4">
                                        <button type="button" id="btnFile" name="btnAdd" className="btn btn-green">
                                            <Trans i18nKey="Recipe.addImage"/>
                                        </button>
                                        <input id="fileInput" className="d-none" type="file"/>
                                    </div>

                                    <Form.Control.Feedback type="invalid">
                                        <Trans>{errors.image}</Trans>
                                    </Form.Control.Feedback>


                                    <div className="form-row">
                                        <label>
                                            Agregar tags (TRADUCIR)
                                        </label>
                                    </div>

                                    <Select
                                        onChange={(option) => setFieldValue("tags", option)}
                                        options={allTags}
                                        value={values.tags}
                                        isMulti="true"
                                        getOptionLabel={(tag) => <Trans>{tag}</Trans>}
                                        getOptionValue={(tag) => <Trans>{tag}</Trans>}
                                        placeholder={<Trans>tags.select</Trans>}/>

                                    <div className="bottom-new-recipe-btn">
                                        <Link to={`/`}>
                                            <Button type="submit" className="btn-blue-grey">
                                                <Trans i18nKey="close"/>
                                            </Button>
                                        </Link>
                                        <Button type="submit" className="btn-green" disabled={isSubmitting}>
                                            <Trans i18nKey="saveChangesButton"/>
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>

                    </div>
                </div>
            </section>
        );
    }
}
const Extended = withTranslation()(RecipeEditor);
Extended.static = RecipeEditor.static;

export default Extended;