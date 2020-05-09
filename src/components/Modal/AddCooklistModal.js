import React from 'react';
import {Trans} from 'react-i18next';
import {Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Formik} from "formik";
import {validateCooklistName} from "../../helpers/validations";
import axios from "axios";
import {SERVER_ADDR} from "../../constants";

class AddCooklistModal extends React.Component {
    render() {
        const {showModal, toggleModal, addCooklist, editCooklist, cooklist} = this.props;
        const isCreating = cooklist === undefined;

        if (!this.props.showModal) {
            return null;
        }

        return (

            <Modal show={showModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Trans i18nKey="cooklist.addTitle"/>
                    </Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={{
                        name: isCreating ? "" : cooklist.name,
                    }}
                    validate={values => validateCooklistName(values)}
                    onSubmit={(values, {setSubmitting}) => {
                        let params = {name: values.name};
                        if(isCreating) {
                            axios.post(`${SERVER_ADDR}/cooklists/create`, params).then(response =>
                                addCooklist(response.data)
                            );
                        } else {
                            console.log("Editando");
                            params.id = cooklist.id;
                            axios.post(`${SERVER_ADDR}/cooklists/edit`, params).then(response =>
                                editCooklist(params)
                            );
                        }
                        setSubmitting(false);
                        toggleModal();
                    }}
                >
                    {({values, errors, handleChange, handleBlur, touched, handleSubmit, isSubmitting}) => (
                        <Form onSubmit={handleSubmit}>
                            <Modal.Body>
                                <Form.Row className="mb-4">
                                    <Form.Label>
                                        <Trans i18nKey="cooklist.name"/>
                                    </Form.Label>
                                    <Form.Control value={values.name} name="name"
                                                  onChange={handleChange}
                                                  onBlur={handleBlur} isInvalid={touched.name && !!errors.name}/>
                                    <Form.Control.Feedback type="invalid">
                                        <Trans>{errors.name}</Trans>
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

export default AddCooklistModal;