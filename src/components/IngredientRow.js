import React from 'react';
import {Link} from "react-router-dom";
import {Button, Card} from "react-bootstrap";
import {Trans} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlusCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import EditIngredientAmountModal from "./EditIngredientAmountModal";
import ConfirmationModal from "./ConfirmationModal";
import TooltipHover from "./TooltipHover";

class IngredientRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const {ingredient} = this.props;

        return (
            <li className="cookListRecipes-group-item list-group-item">
                <div className="float_left">
                    <p className="ingredient-user-title">
                        <Trans i18nKey={ingredient.name}/>
                    </p>
                </div>
                <div className="float-right">
                    <div className="float-right">
                        <TooltipHover placement="top" message={<Trans>ingredient.delete</Trans>} icon={
                            <button className="bg-transparent delete-btn" onClick={() => {this.props.toggleDeleteModal(); this.props.setSelectedIngredient(ingredient);}}>
                                <FontAwesomeIcon icon={faTrash} className="delete-ingredient-icon" size="2x"/>
                            </button>}
                        />
                    </div>
                    <div className="float-right">
                        <TooltipHover placement="top" message={<Trans>ingredient.editAmount</Trans>} icon={
                            <button className="bg-transparent delete-btn" onClick={() => {this.props.toggleEditModal(); this.props.setSelectedIngredient(ingredient);}}>
                                <FontAwesomeIcon icon={faEdit} className="edit-ingredient-icon" size="2x"/>
                            </button>}
                        />
                    </div>
                </div>
                <div className="float-right">
                    <span className="float-right badge badge-primary badge-ingredients">
                        {ingredient.amount + ' '} <Trans i18nKey={ingredient.typeOfServing}/>
                    </span>
                </div>

            </li>
        );
    }
}

export default IngredientRow;