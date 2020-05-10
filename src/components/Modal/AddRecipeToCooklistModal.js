import React from 'react';
import {Trans} from 'react-i18next';
import {Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Formik} from "formik";
import {validateRecipeToCooklist} from "../../helpers/validations";
import axios from "axios";
import {SERVER_ADDR} from "../../constants";
import Select from "react-select";
import {getUser} from "../../helpers/auth";

class AddRecipeToCooklistModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cooklists: [],
            selectedCooklist: '',
            createNewCooklist: false,
        }
    }

    componentDidMount() {
        if (getUser() != null) {
            axios.get(`${SERVER_ADDR}/cooklists/user/${getUser().id}`, {params: {withRecipes: true}}).then(response => {
                let cooklists = response.data.cooklists.filter(cooklist => {
                    return !cooklist.recipes.some(recipe => recipe.id === this.props.recipeId);
                });
                this.setState({cooklists: cooklists}, () => console.log(response));
            });
        }
    }

    onSubmit = (values, {setSubmitting}) => {
        if (this.state.createNewCooklist || this.state.cooklists.length === 0) {
            axios.post(`${SERVER_ADDR}/cooklists/`, {name: values.name}).then(response => {
                this.setState({cooklists: [...this.state.cooklists, response.data]});
                axios.post(`${SERVER_ADDR}/cooklists/${response.data.id}/recipe/${this.props.recipeId}`);
                }
            );
        } else {
            axios.post(`${SERVER_ADDR}/cooklists/${values.selectedCooklist.id}/recipe/${this.props.recipeId}`).then(response => {
                    let cooklists = this.state.cooklists.filter(cooklist => cooklist.id !== values.selectedCooklist.id);
                    this.setState({cooklists: cooklists});
                }
            );
        }
        setSubmitting(false);
        this.props.toggleModal();
    };

    render() {
        const {cooklists, createNewCooklist} = this.state;

        if (!this.props.showModal) {
            return null;
        }

        return (

            <Modal show={this.props.showModal} onHide={this.props.toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Trans i18nKey="cooklist.addRecipe"/>
                    </Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={{
                        name: '',
                        selectedCooklist: ''
                    }}
                    validate={values => validateRecipeToCooklist(values, createNewCooklist || cooklists.length === 0)}
                    onSubmit={(values, {setSubmitting}) => {this.onSubmit(values, {setSubmitting})}}
                >
                    {({values, errors, handleChange, handleBlur, touched, handleSubmit, isSubmitting, setFieldValue}) => (
                        <Form onSubmit={handleSubmit}>
                            <Modal.Body>
                                <div>
                                    {(createNewCooklist || cooklists.length === 0) ?
                                        <div>
                                            {cooklists.length === 0 ?
                                                <p className="cooklist-add-recipe-empty"><Trans i18nKey="cooklist.addRecipe.empty"/></p>
                                                : ''
                                            }
                                            <Form.Row className="mb-4">
                                                <Form.Label>
                                                    <Trans i18nKey="cooklist.name"/>
                                                </Form.Label>
                                                <Form.Control value={values.name} name="name"
                                                              onChange={handleChange}
                                                              onBlur={handleBlur}
                                                              isInvalid={touched.name && !!errors.name}/>
                                                <Form.Control.Feedback type="invalid">
                                                    <Trans i18nKey={errors.name} values={{0: "3", 1: "100"}}/>
                                                </Form.Control.Feedback>
                                            </Form.Row>
                                        </div>
                                        :
                                        <Form.Row className="mb-4">
                                            <Select
                                                className="fullWidth"
                                                value={values.selectedCooklist}
                                                onChange={selectedOption => {
                                                    setFieldValue("selectedCooklist", selectedOption);
                                                }}
                                                options={cooklists}
                                                getOptionLabel={(cooklist) => cooklist.name}
                                                getOptionValue={(cooklist) => cooklist.id}
                                                placeholder={<Trans>cooklist.select</Trans>}/>
                                            {!!errors.selectedCooklist ?
                                                <p className="invalid-feedback d-block no-margin">
                                                    <Trans>{errors.selectedCooklist}</Trans>
                                                </p> : ''
                                            }
                                        </Form.Row>
                                    }
                                    {cooklists.length > 0 ?
                                        <Button className="btn-green"
                                                onClick={() => this.setState({createNewCooklist: !createNewCooklist})}>
                                            {createNewCooklist ? <Trans>cooklist.selectExisting</Trans> :
                                                <Trans>cooklist.selectNew</Trans>}
                                        </Button> : ''
                                    }
                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" className="btn-blue-grey" onClick={this.props.toggleModal}>
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

export default AddRecipeToCooklistModal;