import React from 'react';
import {Trans, withTranslation} from 'react-i18next';
import IngredientSelector from "./IngredientSelector";
import {Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Formik} from "formik";
import {validateIngredients} from "../helpers/validations";

class AddIngredientsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: []
        }
    }

    render() {
        const {ingredients} = this.state;

        if (!this.props.showModal) {
            return null;
        }

        return (

            <Modal show={this.props.showModal} onHide={this.props.toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Trans i18nKey="addIngredient.title"/>
                    </Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={{
                        ingredients
                    }}
                    validate={values => validateIngredients(values)}
                    onSubmit={(values, {setSubmitting}) => {
                        console.log("asdasddsaSAD");
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({errors, handleSubmit, isSubmitting, setFieldValue}) => (
                        <Form onSubmit={handleSubmit}>
                            <Modal.Body>
                                <IngredientSelector name="ingredients"
                                                    onChange={(ingredients) => setFieldValue("ingredients", ingredients)}
                                                    error={errors.ingredients}/>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" className="btn-blue-grey" onClick={this.props.toggleModal}>
                                    <Trans i18nKey="close"/>
                                </Button>
                                <Button variant="primary" type="submit" disabled={isSubmitting} cssClass="btn-green">
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

const Extended = withTranslation()(AddIngredientsModal);
Extended.static = AddIngredientsModal.static;

export default Extended;