import React from 'react';
import {Trans} from 'react-i18next';
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";

class ConfirmationModal extends React.Component {

    render() {
        const {title, description, variant, showModal, toggleModal, onConfirmation} = this.props;

        if (!showModal) {
            return null;
        }

        return (
            <Modal show={showModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {description}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" className="btn-blue-grey" onClick={toggleModal}>
                        <Trans i18nKey="close"/>
                    </Button>
                    <Button variant={variant} type="submit" onClick={() => {toggleModal(); onConfirmation();}}>
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
    variant: "danger"
};

export default ConfirmationModal;