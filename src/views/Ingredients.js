import React from 'react';
import axios from "axios";
import {SERVER_ADDR} from '../constants';
import RecipeCard from '../components/RecipeCard';
import Filters from '../components/Filters';
import Spinner from '../components/Spinner';
import {Link} from "react-router-dom";
import AddIngredientsModal from "../components/AddIngredientsModal";
import Button from "react-bootstrap/Button";

class Ingredients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            recipes: {},
            filters: {},
            showModal: false
        }
    }

    componentDidMount() {
        this.setState({fetching: false});
    }

    toggleModal = () => {
        console.log(this.state.showModal);
        this.setState({showModal: !this.state.showModal});
    };

    render() {
        const {fetching, recipes} = this.state;

        return (
            <section>
                <section className="main_container">

                </section>

                <AddIngredientsModal showModal={this.state.showModal} toggleModal={this.toggleModal}/>

                <Button className="btn-green add" onClick={this.toggleModal}>
                    +
                </Button>
            </section>
        );
    }
}

export default Ingredients;