import React from 'react';
import {Trans} from "react-i18next";
import {isMyUser} from "../helpers";
import AddCooklistModal from "../components/Modal/AddCooklistModal";
import UserBar from "../components/User/UserBar";
import axios from "axios";
import {SERVER_ADDR} from "../constants";
import Spinner from "../components/General/Spinner";
import {Link} from "react-router-dom";
import RecipeCard from "../components/Recipe/RecipeCard";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import ConfirmationModal from "../components/Modal/ConfirmationModal";
import TooltipHover from "../components/General/TooltipHover";

class CooklistRecipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            cooklist: {},
            showDeleteModal: false,
            showEditModal: false
        }
    }

    componentDidMount() {
        let cooklistId = this.props.match.params.cooklistId;
        axios.get(`${SERVER_ADDR}/cooklists/${cooklistId}`).then(response =>
            this.setState({cooklist: response.data, fetching: false}));
    }

    handleDeleteCooklist = () => {
        axios.delete(`${SERVER_ADDR}/cooklists/${this.state.cooklist.id}`).then(() => {
            this.props.history.replace(`/user/me/cooklists`);
        });
    };

    handleDeleteRecipeFromCooklist = (recipeId) => {
        axios.delete(`${SERVER_ADDR}/cooklists/${this.state.cooklist.id}/recipe/${recipeId}`).then(() => {
            let newCooklist = this.state.cooklist;
            newCooklist.recipes = newCooklist.recipes.filter((recipe) => recipe.id !== recipeId);
            this.setState({cooklist: newCooklist});
        });
    };

    handleEditCooklist = (name) => {
        const id = this.state.cooklist.id;
        axios.put(`${SERVER_ADDR}/cooklists/${id}`, {id: id, name: name}).then(response =>
            this.setState({cooklist: {...this.state.cooklist, name: name,}})
        );
    };

    toggleEditModal = () => {
        this.setState({showEditModal: !this.state.showEditModal});
    };

    toggleDeleteModal = () => {
        this.setState({showDeleteModal: !this.state.showDeleteModal});
    };

    render() {
        const {fetching, cooklist, showDeleteModal, showEditModal} = this.state;

        return (

            <section>
                <section className="main_container">
                    {fetching ?
                        <section className="browse">
                            <Spinner/>
                        </section> :
                        <section>
                            {isMyUser(cooklist.user.id) ?
                                <div>
                                    <h4 className="navigation-title pt-3 float-left"> {cooklist.name}</h4>
                                    <div className="navigation-title pt-3 title-cooklist-btn">
                                        <TooltipHover placement="bottom" message={<Trans>cooklist.delete</Trans>} icon={
                                            <IconButton onClick={this.toggleDeleteModal}>
                                                <DeleteIcon className="delete-ingredient-icon"/>
                                            </IconButton>}
                                        />
                                        <TooltipHover placement="bottom" message={<Trans>cooklist.edit</Trans>} icon={
                                            <IconButton onClick={this.toggleEditModal}>
                                                <EditIcon className="edit-ingredient-icon"/>
                                            </IconButton>}
                                        />
                                    </div>
                                </div> :
                                <h4 className="navigation-title pt-3"> {cooklist.name}</h4>}

                            <section className="browse">
                                {cooklist.recipes.length === 0 ?
                                    isMyUser(cooklist.user.id) ?
                                        <div>
                                            <h3 className="navigation-subtitle">
                                                <Trans i18nKey="emptyMyCooklist"/>
                                            </h3>
                                            <Link to={"/"}>
                                                <button className="btn btn-green navigation-help-button">
                                                    <Trans i18nKey="goToSeeRecipes"/>
                                                </button>
                                            </Link>
                                        </div> :
                                        <h3 className="navigation-subtitle">
                                            <Trans i18nKey="emptyCooklist"/>
                                        </h3> :
                                    <div>
                                        <div className="card-deck">
                                            {Object.keys(cooklist.recipes).map(idx => <RecipeCard key={idx}
                                                                                                  recipe={cooklist.recipes[idx]}
                                                                                                  onDelete={this.handleDeleteRecipeFromCooklist}/>)}
                                        </div>
                                    </div>}
                            </section>

                            <UserBar user={cooklist.user}/>
                        </section>}
                </section>

                <AddCooklistModal showModal={showEditModal} toggleModal={this.toggleEditModal} cooklist={cooklist}
                                  editCooklist={this.handleEditCooklist}/>

                <ConfirmationModal title={<Trans i18nKey="cooklist.delete"/>}
                                   description={<Trans i18nKey="cooklist.deleteWarning"
                                                       values={{cooklistName: cooklist.name}}/>}
                                   variant="danger" showModal={showDeleteModal}
                                   toggleModal={this.toggleDeleteModal} onConfirmation={this.handleDeleteCooklist}/>

            </section>
        )
            ;
    }
}

export default CooklistRecipes;