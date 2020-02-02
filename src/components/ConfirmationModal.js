import React from 'react';
import {Trans, withTranslation} from 'react-i18next';
import IngredientSelector from "./IngredientSelector";
import {Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Formik} from "formik";
import {validateIngredientAmount, validateIngredients} from "../helpers/validations";
import TooltipHover from "./TooltipHover";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

class ConfirmationModal extends React.Component {

    render() {
        const {title, description, variant, showModal} = this.props;

        console.log(variant);

        if (!showModal) {
            return null;
        }

        return (
            <Modal show={showModal} onHide={this.props.toggleModal}>
                <Modal.Header>
                    <Modal.Title>
                        <Trans>{title}</Trans>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Trans>{description}</Trans>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" className="btn-blue-grey" onClick={this.props.toggleModal}>
                        <Trans i18nKey="close"/>
                    </Button>
                    <Button variant={variant} type="submit" onClick={() => {this.props.toggleModal(); this.props.onConfirmation();}} className="btn-green">
                        <Trans i18nKey="confirm"/>
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

ConfirmationModal.defaultProps = {
    title: '',
    description: '',
    variant: ''
};

export default ConfirmationModal;