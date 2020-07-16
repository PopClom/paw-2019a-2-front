import React from 'react';
import {formatNumber, isMyUser, isUserAdmin} from '../../helpers';
import {Trans, withTranslation} from 'react-i18next';
import RatingRecipe from "./RatingRecipe";
import noRecipeImg from "../../assets/img/no_recipe_image.png";
import TooltipHover from "../General/TooltipHover";
import {Link} from "react-router-dom";
import {isLoggedIn} from "../../helpers/auth";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RecipeSteps from "./RecipeSteps";
import IconButton from "@material-ui/core/IconButton";
import AddRecipeToCooklistModal from "../Modal/AddRecipeToCooklistModal";
import CookingModal from "../Modal/CookingModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faExclamationCircle, faTimes, faUtensils} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {NotificationManager} from "react-notifications";
import {SERVER_ADDR} from "../../constants";
import Error from "../General/Error";

class RecipeContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddModal: false,
            showCookModal: false,
            userIngredients: {},
            error: false
        }
    }

    toggleCookModal = () => {
        this.setState({showCookModal: !this.state.showCookModal});
    };

    toggleAddModal = () => {
        this.setState({showAddModal: !this.state.showAddModal});
    };

    onCookRecipe = () => {
        axios.post(`${SERVER_ADDR}/recipes/` + this.props.recipe.id).then(() =>
            NotificationManager.success(<Trans
                i18nKey="cook.successfull"/>, "", 5000)).catch(() => this.setState({error: true}));
    };

    render() {
        const {recipe, onRate, missingIngredients, t} = this.props;
        const instructionLines = recipe.instructions ? recipe.instructions.split('\n') : [];
        const loggedIn = isLoggedIn();
        const canEdit = isMyUser(recipe.userId) || isUserAdmin();

        return (
            <>
                {this.state.error ?
                    <Error error="404"/> :
                    <>
                        <div className="card">
                            <div className="flex-recipe">
                                <div className="recipe-image-container">
                                    <div>
                                        <img className="card-img-top"
                                             src={recipe.image ? `data:image/png;base64,${recipe.image}` :
                                                 noRecipeImg}
                                             alt={recipe.name}/>
                                        <div className="ingredients-tags-div">
                                            <br/>
                                            <div className="ratings-recipe">
                                                <p className="ingredients-title">
                                                    <Trans>rating.general</Trans>
                                                </p>
                                                <RatingRecipe rating={recipe.rating}/>
                                                <br/>
                                                {loggedIn && <div>
                                                    <p className="ingredients-title">
                                                        <Trans>rating.user</Trans>
                                                    </p>
                                                    <RatingRecipe rating={recipe.yourRating} onClick={onRate}/>
                                                </div>}
                                            </div>
                                            <br/>

                                            {recipe.tags.length > 0 &&
                                            <div className="recipe-categories">
                                                <p className="ingredients-title">
                                                    <Trans>categories</Trans>
                                                </p>
                                                {recipe.tags.map(tag =>
                                                    <p key={tag} className="categories-names">
                                                        <Trans>{tag}</Trans>
                                                    </p>)}
                                            </div>}

                                            <div className="recipe-nutritional-div">
                                                <p className="ingredients-title">
                                                    <Trans>nutritionalValueAprox</Trans>
                                                </p>
                                                {Object.keys(recipe.nutritionalInfo).map(idx =>
                                                    <div key={idx} className={parseInt(idx) === 0 ?
                                                        "recipe-nutritional-item-no-border" : "recipe-nutritional-item"}>
                                                        <p className="recipe-nutritional-type">
                                                            <Trans>{recipe.nutritionalInfo[idx].type}</Trans></p>
                                                        <p className="recipe-nutritional-amount">
                                                            {`${formatNumber(recipe.nutritionalInfo[idx].amount, 2)}${
                                                                recipe.nutritionalInfo[idx].type === 'calorie' ? ' kcal.' : ' gr.'
                                                            }`}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            <br/>
                                        </div>
                                    </div>
                                </div>
                                <div className="recipe-body">
                                    <h4 className="recipe-title">
                                        {recipe.name}
                                    </h4>
                                    <p className="recipe-description">
                                        {recipe.description}
                                    </p>
                                    <br/>
                                    <p className="ingredients-title">
                                        <Trans>ingredients</Trans>
                                    </p>
                                    <div className="recipe-ingredient-div ">
                                        {Object.keys(recipe.ingredients).map(idx => {
                                            const recipeIngredient = recipe.ingredients[idx];
                                            const missingIngredient = missingIngredients[recipeIngredient.id];
                                            return <div key={idx}
                                                        className={parseInt(idx) === 0 ? "ingredients-recipe-no-border" : "ingredients-recipe"}>
                                                <div className="ingredient-name-container">
                                                    <div className="ingredient-tooltip">
                                                        {missingIngredient === undefined ?
                                                            <TooltipHover placement="top"
                                                                          message={<Trans i18nKey="ingredient.gotIt"/>}
                                                                          icon={<FontAwesomeIcon
                                                                              className="tooltip-recipe ic-green"
                                                                              icon={faCheck}/>}/>
                                                            :
                                                            <>
                                                                {recipeIngredient.amount > missingIngredient.amount ?
                                                                    <TooltipHover placement="top"
                                                                                  message={<Trans
                                                                                      i18nKey="ingredient.missing"
                                                                                      values={{0: missingIngredient.amount +
                                                                                              " " + t(missingIngredient.typeOfServing)}}/>}
                                                                                  icon={<FontAwesomeIcon
                                                                                      className="tooltip-recipe ic-orange"
                                                                                      icon={faExclamationCircle}/>}/>
                                                                    :
                                                                    <TooltipHover placement="top"
                                                                                  message={<Trans
                                                                                      i18nKey="ingredient.missing"
                                                                                      values={{0: missingIngredient.amount +
                                                                                              " " + t(missingIngredient.typeOfServing)}}/>}
                                                                                  icon={<FontAwesomeIcon
                                                                                      className="tooltip-recipe ic-red"
                                                                                      icon={faTimes}/>}/>
                                                                }
                                                            </>
                                                        }

                                                    </div>
                                                    <p className="ingredients-item">
                                                        <Trans>{recipe.ingredients[idx].name}</Trans>
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="ingredients-serving">
                                                        <Trans>{recipe.ingredients[idx].typeOfServing}</Trans></p>
                                                    <p className="ingredients-amount">{formatNumber(recipe.ingredients[idx].amount)}&nbsp;</p>
                                                </div>
                                            </div>
                                        })}
                                    </div>

                                    <p className="ingredients-title">
                                        <Trans>instructions</Trans>
                                    </p>
                                    {recipe.steps && recipe.steps.length > 0 ?
                                        <RecipeSteps steps={recipe.steps} showCookingModal={this.toggleCookModal}/> :
                                        Object.keys(instructionLines).map(idx => (
                                            <span
                                                className={"recipe-instructions" + (parseInt(idx) === (instructionLines.length - 1) ? " recipe-instructions-last" : "")}
                                                key={idx}>{instructionLines[idx]}<br/></span>
                                        ))
                                    }
                                </div>

                                <div className="recipe-body-bottom">
                                    <div className="recipe-bottom-icon">
                                        {isLoggedIn() &&
                                        <>
                                            <TooltipHover placement="top" message={<Trans>recipe.cook</Trans>}
                                                          icon={
                                                              <IconButton onClick={this.toggleCookModal}>
                                                                  <FontAwesomeIcon className="ic-blue"
                                                                                   icon={faUtensils}/>
                                                              </IconButton>}
                                            />
                                            <TooltipHover placement="top" message={<Trans>cooklist.add</Trans>}
                                                          icon={
                                                              <IconButton onClick={this.toggleAddModal}>
                                                                  <AddCircleIcon className="add-icon-cooklist"/>
                                                              </IconButton>}
                                            />
                                        </>}
                                        {canEdit &&
                                        <>
                                            <TooltipHover placement="top" message={<Trans>editRecipe</Trans>} icon={

                                                <IconButton>
                                                    <Link className="link-material-ui-btn" to={{
                                                        pathname: `/edit_recipe/${recipe.id}`,
                                                        recipe: recipe
                                                    }}>
                                                        <EditIcon className="edit-ingredient-icon"/>
                                                    </Link>
                                                </IconButton>}
                                            />
                                            <TooltipHover placement="top" message={<Trans>deleteRecipe</Trans>}
                                                          icon={
                                                              <IconButton onClick={this.props.toggleDeleteModal}>
                                                                  <DeleteIcon className="delete-ingredient-icon"/>
                                                              </IconButton>}
                                            />
                                        </>}
                                    </div>
                                </div>
                            </div>
                            <AddRecipeToCooklistModal recipeId={recipe.id} showModal={this.state.showAddModal}
                                                      toggleModal={this.toggleAddModal}/>
                        </div>
                        <CookingModal recipe={recipe} showModal={this.state.showCookModal}
                                      toggleModal={this.toggleCookModal} missingIngredients={missingIngredients}
                                      onCookRecipe={this.onCookRecipe}/>
                    </>
                }
            </>
        );
    }
}

const Extended = withTranslation()(RecipeContent);
Extended.static = RecipeContent.static;

export default Extended;