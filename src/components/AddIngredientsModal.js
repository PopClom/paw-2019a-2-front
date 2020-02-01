import React from 'react';
import {Trans, withTranslation} from 'react-i18next';
import axios from "axios";
import {SERVER_ADDR} from "../constants";
import Select from 'react-select';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import IngredientSelector from "./IngredientSelector";
import {onChange} from "../helpers";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";

class AddIngredientsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
            ingredientsError: ""
        }
    }

    render() {
        console.log("ES: " + this.props.showModal);

        if(!this.props.showModal) {
            return null;
        }

        return (

            <Modal show={this.props.showModal} onHide={this.props.toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Trans i18nKey="addIngredient.title"/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <IngredientSelector ingredients={this.state.ingredients} ingredientsError={this.state.error} onChange={onChange.bind(this)}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="btn-blue-grey" onClick={this.props.toggleModal}>
                        <Trans i18nKey="close"/>
                    </Button>
                    <Button variant="primary" cssClass="btn-green">
                        <Trans i18nKey="confirm"/>
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const Extended = withTranslation()(AddIngredientsModal);
Extended.static = AddIngredientsModal.static;

export default Extended;