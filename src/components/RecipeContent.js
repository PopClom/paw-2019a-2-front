import React from 'react';
import {formatNumber, isMyUser} from '../helpers';
import {Trans} from 'react-i18next';
import RatingRecipe from "./RatingRecipe";
import noRecipeImg from "../assets/img/no_recipe_image.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlusCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import TooltipHover from "./TooltipHover";
import {Link} from "react-router-dom";
import {isLoggedIn} from "../helpers/auth";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';

class RecipeContent extends React.Component {

    render() {
        const {recipe} = this.props;
        const instructionLines = recipe.instructions.split('\n');
        const loggedIn = isLoggedIn();

        return (
            <div className="card">
                <div className="flex-recipe">
                    <div className="recipe-image-container">
                        <div className="recipe-image-container-sub">
                            <img className="card-img-top"
                                 src={recipe.encodedImage ? `data:image/png;base64,${recipe.encodedImage}` :
                                     noRecipeImg}
                                 alt={recipe.name}/>
                            <div className="ingredients-tags-div">
                                <br/>

                                <div className="ratings-recipe">
                                    <p className="ingredients-title">
                                        <Trans>rating.general</Trans>
                                    </p>
                                    <RatingRecipe rating={recipe.rating} disabled={true}/>
                                    <br/>
                                    {loggedIn && <div>
                                        <p className="ingredients-title">
                                            <Trans>rating.user</Trans>
                                        </p>
                                        <RatingRecipe disabled={false}/>
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
                        <div className="recipe-ingredient-div ">
                            <p className="ingredients-title">
                                <Trans>ingredients</Trans>
                            </p>
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
                        {Object.keys(instructionLines).map(idx => (
                            <p className="recipe-instructions">{instructionLines[idx]}<br/></p>
                        ))}
                    </div>

                    <div className="recipe-body-bottom">
                        <div className="recipe-bottom-icon">

                            <div className="recipe-body-bottom">
                                <div className="recipe-bottom-icon">
                                    {isMyUser(recipe.userId) ? (
                                        <div className="float-right">
                                            <div className="float-right">
                                                <TooltipHover placement="top" message={<Trans>deleteRecipe</Trans>}
                                                              icon={
                                                                  <button className="bg-transparent">
                                                                      <DeleteIcon className="delete-ingredient-icon"/>
                                                                  </button>}
                                                />
                                            </div>
                                            <div className="float-right">
                                                <TooltipHover placement="top" message={<Trans>editRecipe</Trans>} icon={
                                                    <button className="bg-transparent">
                                                        <Link to={{
                                                            pathname: `/edit_recipe/${recipe.id}`,
                                                            recipe: recipe
                                                        }}>
                                                            <EditIcon className="edit-ingredient-icon"/>
                                                        </Link>
                                                    </button>}
                                                />
                                            </div>
                                        </div>) : ''
                                    }

                                    <TooltipHover placement="top" message={<Trans>cooklist.add</Trans>} icon={
                                        <button className="bg-transparent">
                                            <AddCircleIcon className="add-icon-cooklist"/>
                                        </button>}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
            ;
    }
}

export default RecipeContent;