import React from 'react';
import {formatNumber, isMyUser, userIsAdmin} from '../../helpers';
import {Trans} from 'react-i18next';
import RatingRecipe from "./RatingRecipe";
import noRecipeImg from "../../assets/img/no_recipe_image.png";
import TooltipHover from "../TooltipHover";
import {Link} from "react-router-dom";
import {isLoggedIn} from "../../helpers/auth";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RecipeSteps from "./RecipeSteps";
import IconButton from "@material-ui/core/IconButton";
import AddRecipeToCooklistModal from "../Modal/AddRecipeToCooklistModal";

class RecipeContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddModal: false,
        }
    }

    toggleAddModal = () => {
        this.setState({showAddModal: !this.state.showAddModal});
    };

    render() {
        const {recipe, onRate} = this.props;
        const instructionLines = recipe.instructions ? recipe.instructions.split('\n') : [];
        const loggedIn = isLoggedIn();
        const canEdit = isMyUser(recipe.userId) || userIsAdmin();

        return (
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
                                                    recipe.nutritionalInfo[idx].type === 'Calorie' ? '' : ' gr.'
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
                            {Object.keys(recipe.ingredients).map(idx =>
                                <div key={idx} className={parseInt(idx) === 0 ?
                                    "ingredients-recipe-no-border" : "ingredients-recipe"}>
                                    <p className="ingredients-item"><Trans>{recipe.ingredients[idx].name}</Trans></p>
                                    <div className="float-right">
                                        <p className="ingredients-serving">
                                            <Trans>{recipe.ingredients[idx].typeOfServing}</Trans></p>
                                        <p className="ingredients-amount">{formatNumber(recipe.ingredients[idx].amount)}&nbsp;</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <p className="ingredients-title">
                            <Trans>instructions</Trans>
                        </p>
                        {recipe.steps && recipe.steps.length > 0 ?
                            <RecipeSteps steps={recipe.steps}/> :
                            Object.keys(instructionLines).map(idx => (
                                <span className={"recipe-instructions" + (parseInt(idx) === (instructionLines.length - 1) ? " recipe-instructions-last" : "")}
                                      key={idx}>{instructionLines[idx]}<br/></span>
                            ))
                        }
                    </div>

                    <div className="recipe-body-bottom">
                        <div className="recipe-bottom-icon">
                            {canEdit ? (
                                <div className="float-right">
                                    <div className="float-right">
                                        <TooltipHover placement="top" message={<Trans>deleteRecipe</Trans>}
                                                      icon={
                                                          <IconButton onClick={this.props.toggleDeleteModal}>
                                                              <DeleteIcon className="delete-ingredient-icon"/>
                                                          </IconButton>}
                                        />
                                    </div>
                                    <div className="float-right">
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
                                    </div>
                                </div>) : ''
                            }

                            <TooltipHover placement="top" message={<Trans>cooklist.add</Trans>} icon={
                                <IconButton onClick={this.toggleAddModal}>
                                    <AddCircleIcon className="add-icon-cooklist"/>
                                </IconButton>}
                            />
                        </div>
                    </div>
                </div>
                <AddRecipeToCooklistModal recipeId={recipe.id} showModal={this.state.showAddModal} toggleModal={this.toggleAddModal}/>
            </div>
        )
            ;
    }
}

export default RecipeContent;