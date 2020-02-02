import React from 'react';
import {Link} from "react-router-dom";
import {Button, Card} from "react-bootstrap";
import {Trans, withTranslation} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import EditIngredientAmountModal from "./EditIngredientAmountModal";
import ConfirmationModal from "./ConfirmationModal";

class IngredientRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const {ingredient, t} = this.props;

        return (
            <li className="cookListRecipes-group-item list-group-item">
                <div className="float_left">
                    <p className="ingredient-user-title">
                        <Trans i18nKey={ingredient.name}/>
                    </p>
                </div>
                <div className="float-right">
                    <div className="float-right">

                        {/*/!*variable to delete modal*!/*/}
                        {/*<Trans i18nKey="ingredient.deleteWarning"*/}
                        {/*       arguments="${ingredientString}" var="deleteTitle"/>*/}

                        <button className="bg-transparent delete-btn" onClick={() => {this.props.toggleDeleteModal(); this.props.setSelectedIngredient(ingredient);}}>
                            <FontAwesomeIcon icon={faTrash} className="delete-ingredient-icon" size="2x"/>
                        </button>
                    </div>
                    <div className="float-right">
                        {/*<Trans i18nKey="${ingredient.ingredient.typeOfServing}"*/}
                        {/*       var="unit"/>*/}
                        {/*<Trans i18nKey="editIngredient"*/}
                        {/*       values={{0: ingredient.name}}*/}
                        {/*       var="editTitle"/>*/}

                        <button className="bg-transparent delete-btn" onClick={() => {this.props.toggleEditModal(); this.props.setSelectedIngredient(ingredient);}}>
                            <FontAwesomeIcon icon={faEdit} className="edit-ingredient-icon" size="2x"/>
                        </button>
                    </div>
                </div>
                <div className="float-right">
                    <span className="float-right badge badge-primary badge-ingredients">
                        {ingredient.amount === undefined ? 'undef' : ingredient.amount.toString()}
                        <Trans code={ingredient.typeOfServing}/>
                    </span>
                </div>

            </li>
        );
    }
}


const Extended = withTranslation()(IngredientRow);
Extended.static = IngredientRow.static;

export default Extended;