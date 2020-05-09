import React from 'react';
import {Trans} from 'react-i18next';
import IngredientSelector from "../Ingredient/IngredientSelector";
import {Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Formik} from "formik";
import {validateIngredientAmount, validateIngredients} from "../../helpers/validations";
import TooltipHover from "../TooltipHover";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {SERVER_ADDR} from "../../constants";

class EditIngredientAmountModal extends React.Component {
    render() {
        const {showModal, toggleModal, ingredient, onEditIngredient} = this.props;

        if (!showModal) {
            return null;
        }

        return (

            <Modal show={showModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Trans i18nKey="addIngredient.title"/>
                    </Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={{
                        amount: ingredient.amount
                    }}
                    validate={values => validateIngredientAmount(values)}
                    onSubmit={(values, {setSubmitting}) => {
                        onEditIngredient(ingredient, values.amount);
                        setSubmitting(false);
                        toggleModal();
                    }}
                >
                    {({values, errors, handleChange, handleBlur, touched, handleSubmit, isSubmitting}) => (
                        <Form onSubmit={handleSubmit}>
                            <Modal.Body>
                                <Form.Row className="mb-4">
                                    <Form.Label>
                                        <Trans i18nKey="addIngredient.amount"/>
                                        &ensp;<Trans>({ingredient.typeOfServing})</Trans>
                                    </Form.Label>
                                    <Form.Control value={values.amount} type="number" step="0.01" name="amount"
                                                  onChange={handleChange}
                                                  onBlur={handleBlur} isInvalid={touched.amount &&!!errors.amount}/>
                                    <Form.Control.Feedback type="invalid">
                                        <Trans>{errors.amount}</Trans>
                                    </Form.Control.Feedback>
                                </Form.Row>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" className="btn-blue-grey" onClick={toggleModal}>
                                    <Trans i18nKey="close"/>
                                </Button>
                                <Button variant="primary" type="submit" disabled={isSubmitting} className="btn-green">
                                    <Trans i18nKey="confirm"/>
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        )
    }
}

EditIngredientAmountModal.defaultProps = {
    ingredient: {}
};

export default EditIngredientAmountModal;