import React from 'react';
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