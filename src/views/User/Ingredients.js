import React from 'react';
import AddIngredientsModal from "../../components/Modal/AddIngredientsModal";
import Button from "react-bootstrap/Button";
import {Trans} from "react-i18next";
import axios from "axios";
import {SERVER_ADDR} from "../../constants";
import Spinner from "../../components/General/Spinner";
import IngredientRow from "../../components/Ingredient/IngredientRow";
import EditIngredientAmountModal from "../../components/Modal/EditIngredientAmountModal";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";
import TooltipHover from "../../components/General/TooltipHover";

class Ingredients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            ingredients: [],
            selectedIngredient: {},
            showAddModal: false,
            showEditModal: false,
            showDeleteModal: false
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_ADDR}/ingredient/`).then(response => {
            this.setState({ingredients: response.data.ingredients.sort(
                (a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)), fetching: false})
        });
    }

    handleAddIngredients = (ingredients) => {
        axios.post(`${SERVER_ADDR}/ingredient/`, {ingredients: ingredients}).then(()=> {
            let stateIngredients = this.state.ingredients;
            ingredients.forEach((newIngredient) => {
                let isPresent = false;
                stateIngredients.forEach((oldIngredient) => {
                    if (oldIngredient.id === newIngredient.id) {
                        isPresent = true;
                        oldIngredient.amount = (+oldIngredient.amount) + +(newIngredient.amount);
                    }
                });
                if (!isPresent)
                    stateIngredients.push(newIngredient);
            });
            this.setState({ingredients: stateIngredients});
        });
    };

    handleEditIngredient = (ingredient, amount) => {
        let newIngredient = ingredient;
        newIngredient.amount = amount;
        axios.post(`${SERVER_ADDR}/ingredient/edit`, newIngredient).then(() => ingredient.amount = amount);
    };

    handleRemoveIngredient = (ingredientToRemove) => {
        axios.delete(`${SERVER_ADDR}/ingredient/${ingredientToRemove.id}`).then(() => {
            let ingredients = this.state.ingredients.filter(function (ingredient) {
                return ingredient.id !== ingredientToRemove.id;
            });
            this.setState({ingredients});
        });
    };

    setSelectedIngredient = (ingredient) => {
        this.setState({selectedIngredient: ingredient});
    };

    toggleAddModal = () => {
        this.setState({showAddModal: !this.state.showAddModal});
    };

    toggleEditModal = () => {
        this.setState({showEditModal: !this.state.showEditModal});
    };

    toggleDeleteModal = () => {
        this.setState({showDeleteModal: !this.state.showDeleteModal});
    };

    render() {
        const {fetching, ingredients, selectedIngredient} = this.state;

        return (
            <section>
                <section>
                    <h4 className="navigation-title pt-3">
                        <Trans i18nKey="myIngredients"/>
                    </h4>

                    {fetching ?
                        <section className="browse">
                            <Spinner/>
                        </section> :
                        <section className="browse">
                            {!ingredients || !ingredients.length ?
                                <h3 className="navigation-subtitle">
                                    <Trans i18nKey="noIngredients"/>
                                </h3> :
                                <div className="card">
                                    <ul className="cookListRecipes-group list-group">
                                        {Object.keys(ingredients).map(index =>
                                            <IngredientRow key={index} ingredient={ingredients[index]}
                                                           setSelectedIngredient={this.setSelectedIngredient}
                                                           toggleEditModal={this.toggleEditModal}
                                                           toggleDeleteModal={this.toggleDeleteModal}/>
                                        )}
                                    </ul>
                                </div>}
                        </section>}
                </section>

                <AddIngredientsModal showModal={this.state.showAddModal} toggleModal={this.toggleAddModal}
                                     addIngredients={this.handleAddIngredients}/>
                <EditIngredientAmountModal ingredient={selectedIngredient} showModal={this.state.showEditModal}
                                           toggleModal={this.toggleEditModal} onEditIngredient={this.handleEditIngredient}/>
                <ConfirmationModal
                    title={<Trans i18nKey="ingredient.deleteWarning" values={{0: selectedIngredient.name}}/>}
                    description={<Trans>cantUndone</Trans>}
                    variant="danger" showModal={this.state.showDeleteModal}
                    toggleModal={this.toggleDeleteModal}
                    onConfirmation={() => this.handleRemoveIngredient(selectedIngredient)}/>

                <TooltipHover placement="top" message={<Trans>addIngredient.title</Trans>} icon={
                    <Button className="btn-green add" onClick={this.toggleAddModal}>+</Button>
                }/>
            </section>
        );
    }
}

export default Ingredients;