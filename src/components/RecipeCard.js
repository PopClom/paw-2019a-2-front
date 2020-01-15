import React from 'react';
import { Link } from "react-router-dom";
import noRecipeImg from '../assets/img/no_recipe_image.png';
import RatingCard from "./RatingCard";

class RecipeCard extends React.Component {
    render() {
        const {recipe} = this.props;

        return (
            <div className="card card-cascade card-recipe">
                <Link className="custom-card" to={`/recipe/${recipe.id}`}>
                    {/*Card image*/}
                    <div className="bg-dark">
                        <img className="card-img-top"
                             src={recipe.encodedImage ? `data:image/png;base64,${recipe.encodedImage}` :
                                 noRecipeImg}
                             alt={recipe.name}/>
                    </div>

                    {/*Card content*/}
                    <div className="card-body card-body-cascade">
                        <h4 className="card-title recipe-card-title"><strong>
                            {recipe.name}
                        </strong></h4>
                        <p className="card-text recipe-card-description">
                            {recipe.description}
                        </p>
                        {recipe.tags.map(tag =>
                            <p key={tag} className="pink-text-tag">
                                {tag}
                            </p>
                        )}

                        <div className="rating-container">
                            <RatingCard rating={recipe.rating} />
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default RecipeCard;