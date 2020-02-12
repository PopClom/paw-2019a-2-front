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
import StepsEditor from "../components/StepsEditor";
import ImageIcon from '@material-ui/icons/Image';
import {isLoggedIn} from "../helpers/auth";

class RecipeEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allTags: [],
            rows: 1
        };
    }

    componentDidMount() {

        let recipeId = this.props.match.params.recipeId;
        if(this.props.location.recipe === undefined)
            console.log("NO ESTA");
            //pedirle la receta a la api con el id
        else
            console.log("SI ESTA");

        axios.get(`${SERVER_ADDR}/recipes/get_tags`).then(response => {
            this.setState({allTags: response.data.tags});
        });
    };

    /*seguro hay una forma mas linda*/
    assignParams = () => {
        let recipe = this.props.location.recipe;
        return recipe === undefined ? this.props.recipe : recipe;
    };

    onFormSubmit = (event) => {
        event.preventDefault();
    };

    render() {
        const recipe = this.assignParams();
        const {allTags} = this.state;
        const loggedIn = isLoggedIn();
        const {t} = this.props;

        return (
            <section className="main_container">

                <div className="card card-new-recipe">
                    <div className="card-body">
                        {loggedIn ?
                            <div>
                                <h3>
                                    <Trans i18nKey="addNewRecipe"/>
                                </h3>

                                <Formik
                                    initialValues={{
                                        name: recipe.name,
                                        description: recipe.description,
                                        instructions: recipe.instructions,
                                        steps: recipe.steps,
                                        ingredients: recipe.ingredients,
                                        tags: recipe.tags,
                                        image: recipe.image,
                                        allTags
                                    }}
                                    validate={values => validateRecipe(values)}
                                    onSubmit={(values, {setSubmitting}) => {
                                        axios.post(`${SERVER_ADDR}/recipes/`, values)
                                            .then(response => {
                                                this.props.history.push(`/recipe/${response.data.id}`);
                                            })
                                            .catch(err => {
                                                console.log(":(");
                                            });
                                    }}
                                    validateOnChange={true}
                                >
                                    {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue, validateForm}) => (

                                        <Form onSubmit={handleSubmit}>
                                            <Form.Row className="mb-4">
                                                <Form.Label>
                                                    <Trans i18nKey="Recipe.name"/>
                                                </Form.Label>
                                                <TooltipHover placement="right" message={<Trans>recipeName.title</Trans>}
                                                              icon={<FontAwesomeIcon className="tooltip-recipe"
                                                                                     icon={faInfoCircle}/>}/>

                                                <Form.Control value={values.name} type="text"
                                                              placeholder={t("recipeName.placeholder")} name="name"
                                                              onChange={handleChange}
                                                              onBlur={handleBlur} isInvalid={touched.name && !!errors.name}/>
                                                <Form.Control.Feedback type="invalid">
                                                    <Trans>{errors.name}</Trans>
                                                </Form.Control.Feedback>
                                            </Form.Row>


                                            <Form.Row className="mb-4">
                                                <Form.Label>
                                                    <Trans i18nKey="Recipe.description"/>
                                                </Form.Label>
                                                <TooltipHover placement="right" message={<Trans>description.title</Trans>}
                                                              icon={<FontAwesomeIcon className="tooltip-recipe"
                                                                                     icon={faInfoCircle}/>}/>
                                                <Form.Control value={values.description} type="text"
                                                              placeholder={t("description.placeholder")} name="description"
                                                              onChange={handleChange}
                                                              onBlur={handleBlur}
                                                              isInvalid={touched.description && !!errors.description}/>

                                                <Form.Control.Feedback type="invalid">
                                                    <Trans>{errors.description}</Trans>
                                                </Form.Control.Feedback>
                                            </Form.Row>

                                            <StepsEditor steps={values.steps} error={errors.steps} onChange={() => validateForm()}/>

                                            <IngredientSelector name="ingredients" ingredients={values.ingredients}
                                                                onChange={() => validateForm()}
                                                                error={errors.ingredients}/>

                                            <div className="form-row">
                                                <label>
                                                    <Trans i18nKey="Recipe.image"/>
                                                </label>
                                            </div>

                                            <div className="form-row mb-4">
                                                <button type="button" id="btnFile" name="btnAdd" className="btn btn-green">
                                                    <ImageIcon/>
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
                                                getOptionValue={(tag) => tag}
                                                placeholder={t('tags.select')}/>

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
                            </div> : <div>
                                <h4>{<Trans>recipe.login</Trans>}</h4>
                                <Link to="/logIn">
                                    <button className="btn btn-green">{<Trans>logIn</Trans>}</button>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </section>
        );
    }
}

RecipeEditor.defaultProps = {
    recipe: {
        name: '',
        description: '',
        instructions: '',
        steps: [],
        ingredients: [],
        tags: [],
        image: []
    }
};

const Extended = withTranslation()(RecipeEditor);
Extended.static = RecipeEditor.static;

export default Extended;