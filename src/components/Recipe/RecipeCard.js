import React from 'react';
import {Link} from "react-router-dom";
import noRecipeImg from '../../assets/img/no_recipe_image.png';
import RatingCard from "./RatingCard";
import {Card} from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmationModal from "../Modal/ConfirmationModal";
import {Trans} from "react-i18next";

class RecipeCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteModal: false,
        }
    }

    toggleDeleteModal = () => {
        this.setState({showDeleteModal: !this.state.showDeleteModal});
    };

    onConfirmation = (recipeId) => {
        this.props.onDelete(recipeId);
    };

    render() {
        const {recipe, onDelete} = this.props;

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
                {onDelete !== undefined &&
                    <div className="delete-from-cooklist">
                        <IconButton onClick={this.toggleDeleteModal}>
                            <DeleteIcon className="delete-ingredient-icon"/>
                        </IconButton>
                        <ConfirmationModal title={<Trans i18nKey="cooklist.removeRecipe"/>} description={<Trans i18nKey="cooklist.removeRecipeWarning" values={{recipeName: recipe.name}}/>}
                                           variant="danger" showModal={this.state.showDeleteModal}
                                           toggleModal={this.toggleDeleteModal} onConfirmation={() => this.onConfirmation(recipe.id)}/>
                    </div>}
            </Card>
        );
    }
}

export default RecipeCard;