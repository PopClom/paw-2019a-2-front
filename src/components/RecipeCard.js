import React from 'react';
import { Link } from "react-router-dom";
import noRecipeImg from '../assets/img/no_recipe_image.png';
import RatingCard from "./RatingCard";
import {Card} from "react-bootstrap";

class RecipeCard extends React.Component {
    render() {
        const {recipe} = this.props;

        return (
            <Card className="card-recipe">
                <Link className="custom-card" to={`/recipe/${recipe.id}`}>
                    <Card.Img variant="top"
                              src={recipe.image ? `data:image/png;base64,${recipe.image}` : noRecipeImg}
                              alt={recipe.name}/>
                    <Card.Body>
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
                            <RatingCard rating={recipe.rating}/>
                        </div>
                    </Card.Body>
                </Link>
            </Card>
        );
    }
}

export default RecipeCard;