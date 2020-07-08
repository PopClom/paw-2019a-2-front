import React from 'react';
import {Trans, withTranslation} from 'react-i18next';
import {Link} from "react-router-dom";
import Select from 'react-select';
import axios from "axios";
import {SERVER_ADDR} from "../constants";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import IngredientSelector from "../components/Ingredient/IngredientSelector";
import {Form, Button} from "react-bootstrap";
import TooltipHover from "../components/General/TooltipHover";
import {Formik} from "formik";
import {validateRecipe} from "../helpers/validations";
import StepsEditor from "../components/Recipe/StepsEditor";
import ImageIcon from '@material-ui/icons/Image';
import {isLoggedIn} from "../helpers/auth";
import Spinner from "../components/General/Spinner";
import Error from "../components/General/Error";
import noRecipeImg from "../assets/img/no_recipe_image.png";

class RecipeEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe: {},
            editing: true,
            fetching: true,
            error: false,
            allTags: [],
            rows: 1
        };
    }

    componentDidMount() {
        let recipeId = this.props.match.params.recipeId;
        if (recipeId) {
            if (this.props.location.recipe) {
                this.setState({recipe: this.props.location.recipe, fetching: false});
            } else {
                axios.get(`${SERVER_ADDR}/recipes/${recipeId}`)
                    .then(response => this.setState({recipe: response.data, fetching: false}))
                    .catch(() => this.setState({fetching: false, error: true}));
            }
        } else {
            this.setState({recipe: this.props.recipe, fetching: false, editing: false});
        }

        axios.get(`${SERVER_ADDR}/constants/recipes/tags`).then(response => {
            this.setState({allTags: response.data.tags});
        });
    };

    onFormSubmit = (values, setSubmitting, reader) => {
        const data = {...values, image: reader ? reader.result.split(',')[1] : null};
        const recipePromise = values.id ? axios.put(`${SERVER_ADDR}/recipes/${values.id}`, data) :
            axios.post(`${SERVER_ADDR}/recipes/`, data);
        recipePromise.then(response => {
                this.props.history.push(`/recipe/${response.data.id}`);
            }).catch(() => setSubmitting(false));
    };

    render() {
        const {recipe, editing, fetching, error, allTags} = this.state;
        const loggedIn = isLoggedIn();
        const {t} = this.props;

        return (
            <section className="main_container">

                <div className="card card-new-recipe">
                    <div className="card-body">
                        {loggedIn ? fetching ?
                            <section className="browse">
                                <Spinner/>
                            </section> : (error ?
                                <Error error="404"/> :
                                <div>
                                    <h3>
                                        <Trans i18nKey={editing ? "editRecipe" : "addNewRecipe"}/>
                                    </h3>

                                    <Formik
                                        initialValues={{
                                            id: recipe.id,
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
                                            if (values.file) {
                                                const reader = new FileReader();
                                                reader.addEventListener("load",
                                                    () => this.onFormSubmit(values, setSubmitting, reader), false);
                                                reader.readAsDataURL(values.file);
                                            } else {
                                                this.onFormSubmit(values, setSubmitting);
                                            }
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
                                                        <Trans i18nKey={errors.name} values={{0: "5", 1: "100"}}/>
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
                                                        <Trans i18nKey={errors.description} values={{0: "10", 1: "100"}}/>
                                                    </Form.Control.Feedback>
                                                </Form.Row>

                                                <StepsEditor steps={values.steps} error={errors.steps} onChange={() => validateForm()}/>

                                                <IngredientSelector name="ingredients" ingredients={values.ingredients}
                                                                    onChange={() => validateForm()}
                                                                    error={errors.ingredients}/>

                                                <Form.Row>
                                                    <Form.Label>
                                                        <Trans i18nKey="Recipe.image"/>
                                                    </Form.Label>
                                                </Form.Row>
                                                <Form.Row className="mb-4">
                                                    <div style={{display: "grid"}}>
                                                        <Form.Label id="btnFile" className="btn btn-green">
                                                            <ImageIcon/>&nbsp;
                                                            <Trans i18nKey={recipe.image ? "Recipe.changeImage" : "Recipe.addImage"}/>
                                                            {values.file ? ': ' + values.file.name : ''}
                                                            <Form.Control type="file" className="d-none"
                                                                          name="file"
                                                                          onChange={(event) => {
                                                                              setFieldValue("file", event.currentTarget.files[0]);
                                                                          }}
                                                                          onBlur={handleBlur}
                                                                          isInvalid={touched.file && !!errors.file}/>
                                                        </Form.Label>
                                                        {!values.file && recipe.image &&
                                                        <img style={{width: "250px", padding: "5px"}}
                                                             src={`data:image/png;base64,${recipe.image}`}
                                                             alt={recipe.name}/>}
                                                    </div>
                                                    <Form.Control.Feedback style={{display: "block"}} type="invalid">
                                                        <Trans i18nKey={errors.file}/>
                                                    </Form.Control.Feedback>
                                                </Form.Row>

                                                <div className="form-row">
                                                    <label><Trans i18nKey="Recipe.addTags"/></label>
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
                                </div>) :
                            <div>
                                <h4>{<Trans>recipe.login</Trans>}</h4>
                                <Link to={{ pathname: '/login', from: window.location.pathname }}>
                                    <button className="btn btn-green">{<Trans>logIn</Trans>}</button>
                                </Link>
                            </div>}
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