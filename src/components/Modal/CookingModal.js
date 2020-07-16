import React from 'react';
import {Trans} from 'react-i18next';
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class CookingModal extends React.Component {
    render() {
        const {missingIngredients, showModal, toggleModal} = this.props;

        return (
            <Modal show={showModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Trans i18nKey="recipe.cook"/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {Object.keys(missingIngredients).length > 0 ?
                        <>
                            <p><Trans i18nKey="cantCooked"/></p>
                            {Object.keys(missingIngredients).map(idx => {
                                const missingIngredient = missingIngredients[idx];
                                return <div key={idx} className="missing-ingredients-container">
                                    <div className="missing-ingredient-name">
                                        <FontAwesomeIcon
                                            className="missing-ingredient-circle fa-xs"
                                            icon={faCircle}/>
                                        <p>{missingIngredient.name}</p>
                                    </div>
                                    <div className="missing-ingredient-amount">
                                        <p>{missingIngredient.amount} {missingIngredient.typeOfServing}</p>
                                    </div>
                                </div>
                            })}
                            <p className="mt-4"><Trans i18nKey="cookWithoutIngredients"/></p>
                        </>
                        :
                        <p><Trans i18nKey="cookWithIngredients"/></p>
                    }
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" className="btn-blue-grey" onClick={toggleModal}>
                        <Trans i18nKey="close"/>
                    </Button>
                    <Button type="submit" className="btn-green" onClick={() => {toggleModal();}}>
                        <Trans i18nKey="confirm"/>
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default CookingModal;