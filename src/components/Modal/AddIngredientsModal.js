import React from 'react';
import {Trans} from 'react-i18next';
import IngredientSelector from "../Ingredient/IngredientSelector";
import {Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Formik} from "formik";
import {validateIngredientsAdd} from "../../helpers/validations";

class AddIngredientsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: []
        }
    }

    render() {
        const {toggleModal, showModal, addIngredients} = this.props;

        if (!this.props.showModal) {
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
                        ingredients: []
                    }}
                    validate={values => validateIngredientsAdd(values)}
                    onSubmit={(values, {setSubmitting}) => {
                        addIngredients(values.ingredients);
                        setSubmitting(false);
                        toggleModal();
                    }}
                >
                    {({errors, handleSubmit, isSubmitting, validateForm, values}) => (
                        <Form onSubmit={handleSubmit}>
                            <Modal.Body>
                                <IngredientSelector name="ingredients" ingredients={values.ingredients}
                                                    onChange={() => validateForm()}
                                                    error={errors.ingredients}/>
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

export default AddIngredientsModal;