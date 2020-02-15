import React from 'react';
import {Trans} from "react-i18next";
import TooltipHover from "./TooltipHover";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from "@material-ui/core/SvgIcon/SvgIcon";
import IconButton from "@material-ui/core/IconButton";

class IngredientRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const {ingredient, toggleDeleteModal, toggleEditModal, setSelectedIngredient} = this.props;

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
                            <IconButton className="myingredient-btn" onClick={() => {toggleDeleteModal(); setSelectedIngredient(ingredient);}}>
                                <DeleteIcon className="delete-ingredient-icon"/>
                            </IconButton>}
                        />
                    </div>
                    <div className="float-right">
                        <TooltipHover placement="top" message={<Trans>ingredient.editAmount</Trans>} icon={
                            <IconButton className="myingredient-btn" onClick={() => {toggleEditModal(); setSelectedIngredient(ingredient);}}>
                                <EditIcon className="edit-ingredient-icon"/>
                            </IconButton>}
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