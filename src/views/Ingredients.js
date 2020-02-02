import React from 'react';
import AddIngredientsModal from "../components/AddIngredientsModal";
import Button from "react-bootstrap/Button";
import {Trans, withTranslation} from "react-i18next";
import axios from "axios";
import {SERVER_ADDR} from "../constants";
import Spinner from "../components/Spinner";
import IngredientRow from "../components/IngredientRow";
import EditIngredientAmountModal from "../components/EditIngredientAmountModal";
import ConfirmationModal from "../components/ConfirmationModal";
import {onChange} from "../helpers/index"

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
        axios.get(`${SERVER_ADDR}/recipes/get_all_ingredients`).then(response => {
            response.data.ingredients.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            response.data.ingredients.forEach(function (ingredient) {
                ingredient.amount = 5;
            });
            this.setState({ingredients: response.data.ingredients});
        });

        this.setState({fetching: false});
    }

    removeIngredient = (ingredientToRemove) => {
        let ingredients = this.state.ingredients.filter(function(ingredient){
            return ingredient.id != ingredientToRemove.id;
        });
        this.setState({ingredients});
    };

    setSelectedIngredient = (ingredient) => {
        this.setState({selectedIngredient: ingredient});
    };

    toggleAddModal = () => {
        this.setState({showModal: !this.state.showModal});
    };

    toggleEditModal = () => {
        this.setState({showEditModal: !this.state.showEditModal});
        console.log(this.state.selectedIngredient);
    };

    toggleDeleteModal = () => {
        this.setState({showDeleteModal: !this.state.showDeleteModal});
    };

    render() {
        const {t} = this.props;
        const {fetching, ingredients, selectedIngredient} = this.state;

        return (
            <section>

                <section className="main_container">
                    <h4 className="navigation-title pt-3">
                        <Trans i18nKey="myIngredients"/>
                    </h4>

                    <section className="side-card-container">
                        <div className="card">
                            <div className="card-body card-body-user-bar" id="user-big-card">
                                <p>Barrita</p>
                            </div>
                        </div>
                    </section>

                    <div className="browse">

                        {!ingredients || !ingredients.length ?
                            <h3 className="navigation-subtitle">
                                <Trans i18nKey="noIngredients"/>
                            </h3> : ''}

                        <div className="card">

                            {fetching ? <Spinner/> :

                                <ul className="cookListRecipes-group list-group">
                                    {Object.keys(ingredients).map(index =>
                                        <IngredientRow key={index} ingredient={ingredients[index]} removeIngredient={this.removeIngredient}
                                                       setSelectedIngredient={this.setSelectedIngredient} toggleEditModal={this.toggleEditModal} toggleDeleteModal={this.toggleDeleteModal}/>
                                    )}
                                </ul>
                            }
                        </div>
                    </div>

                </section>

                <AddIngredientsModal showModal={this.state.showAddModal} toggleModal={this.toggleAddModal}/>
                <EditIngredientAmountModal ingredient={selectedIngredient} showModal={this.state.showEditModal} toggleModal={this.toggleEditModal}/>
                <ConfirmationModal title={t("ingredient.deleteWarning", {0: selectedIngredient.name})} description={t("cantUndone")}
                                   variant="danger" showModal={this.state.showDeleteModal}
                                   toggleModal={this.toggleDeleteModal} onConfirmation={() => this.removeIngredient(selectedIngredient)}/>

                <Button className="btn-green add" onClick={this.toggleModal}>
                    +
                </Button>
            </section>
        );
    }
}
const Extended = withTranslation()(Ingredients);
Extended.static = Ingredients.static;

export default Extended;