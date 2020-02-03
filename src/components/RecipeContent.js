import React from 'react';
import { formatNumber } from '../helpers';
import { Trans } from 'react-i18next';
import RatingRecipe from "./RatingRecipe";
import noRecipeImg from "../assets/img/no_recipe_image.png";

class RecipeContent extends React.Component {
    render() {
        const {recipe} = this.props;
        const isGuest = false;

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
                                    <RatingRecipe rating={recipe.rating}/>
                                    <br/>
                                    {!isGuest && <div>
                                        <p className="ingredients-title">
                                            <Trans>rating.user</Trans>
                                        </p>
                                        <RatingRecipe />
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
                                            <p className="recipe-nutritional-type"><Trans>{recipe.nutritionalInfo[idx].type}</Trans></p>
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
                                        <p className="ingredients-serving"><Trans>{recipe.ingredients[idx].typeOfServing}</Trans></p>
                                        <p className="ingredients-amount">{formatNumber(recipe.ingredients[idx].amount)}&nbsp;</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <p className="ingredients-title">
                            <Trans>instructions</Trans>
                        </p>
                        {recipe.instructions.split('\n').map(instructionLine => (
                            <p className="recipe-instructions">{instructionLine}<br/></p>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

/*
<c:if test="${!guest}">
                            <div className="recipe-body-bottom">
                                <div className="recipe-bottom-icon">

                                    <c:if test="${editable}">
                                        <div className="float-right">
                                            <button data-toggle="modal" id="delete-recipe-modal"
                                                    data-target="#delete-recipe" className="bg-transparent delete-btn">
                                                <i className="fas fa-trash fa-2x red-ic"></i>
                                            </button>
                                        </div>
                                        <div className="float-right">
                                            <c:url value="/edit_recipe" var="editRecipeUrl">
                                                <c:param name="recipeId" value="${recipe.id}"/>
                                            </c:url>
                                            <a href="${editRecipeUrl}">
                                                <button className="bg-transparent">
                                                    <i className="fas fa-edit fa-2x grey-ic"></i>
                                                </button>
                                            </a>
                                        </div>
                                    </c:if>

                                    <div className="float-right">
                                        <spring:message code="cooklist.add" var="addToCooklist"/>
                                        <span className="tooltip-test" title="${addToCooklist}">
                                        <c:choose>
                                            <c:when test="${empty cookLists}">
                                                <button data-toggle="modal" id="add-recipe-cooklist-modal"
                                                        data-target="#new-cooklist" className="bg-transparent">
                                                <i className="fas fa-plus-circle fa-2x green-ic"></i>
                                            </c:when>
                                            <c:otherwise>
                                                <button data-toggle="modal" id="add-recipe-cooklist-modal"
                                                        data-target="#add-recipe-cooklist" className="bg-transparent">
                                                <i className="fas fa-plus-circle fa-2x green-ic"></i>
                                            </button>
                                            </c:otherwise>
                                        </c:choose>
                                    </span>
                                    </div>

                                </div>
                            </div>
                        </c:if>
 */

export default RecipeContent;