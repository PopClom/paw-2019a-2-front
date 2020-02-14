import React from 'react';
import Button from "react-bootstrap/Button";
import {Trans} from "react-i18next";
import SimpleCard from "../components/SimpleCard";
import {isMyUser} from "../helpers";
import AddCooklistModal from "../components/AddCooklistModal";
import UserBar from "../components/UserBar";
import axios from "axios";
import {SERVER_ADDR} from "../constants";
import {getUser} from "../helpers/auth";
import Spinner from "../components/Spinner";
import {Link} from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import ConfirmationModal from "../components/ConfirmationModal";

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

    deleteCooklist = () => {
        console.log("BORRAR COOKLIST")
    };

    deleteRecipeFromCooklist = () => {
        console.log("REMOVER RECETA");
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
                                    <h4 className="navigation-title float-left"> {cooklist.name}</h4>
                                    <div className="title-cooklist-btn">
                                        <IconButton onClick={this.toggleDeleteModal}>
                                            <DeleteIcon className="delete-ingredient-icon"/>
                                        </IconButton>
                                        <IconButton onClick={this.toggleEditModal}>
                                            <EditIcon className="edit-ingredient-icon"/>
                                        </IconButton>
                                    </div>
                                </div>
                                : <h4 className="navigation-title"> {cooklist.name}</h4>
                            }
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
                                        </div>
                                        :
                                        <h3 className="navigation-subtitle">
                                            <Trans i18nKey="emptyCooklist"/>
                                        </h3>
                                    :
                                    <div>
                                        {Object.keys(cooklist.recipes).map(idx => <RecipeCard key={idx}
                                                                                              recipe={cooklist.recipes[idx]}
                                                                                              onDelete={this.deleteRecipeFromCooklist}/>)}
                                    </div>
                                }
                            </section>
                            <UserBar user={cooklist.user}/>
                        </section>}
                </section>


                <ConfirmationModal title={<Trans i18nKey="cooklist.delete"/>}
                                   description={<Trans i18nKey="cooklist.deleteWarning"
                                                       values={{cooklistName: cooklist.name}}/>}
                                   variant="danger" showModal={showDeleteModal}
                                   toggleModal={this.toggleDeleteModal} onConfirmation={this.deleteCooklist}/>

            </section>
        )
            ;
    }
}

export default CooklistRecipes;