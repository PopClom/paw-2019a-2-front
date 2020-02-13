import React from 'react';
import FoodifyImg from '../assets/img/foodify.png'
import {Trans} from "react-i18next";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

class Error extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorsMap: new Map([["400", "badRequest"], ["403", "forbidden"], ["404", "not_found"], ["other", "error_explanation"]])
        }
    }

    render() {
        const {error} = this.props;
        const {errorsMap} = this.state;

        return (
            <section className="horizontal-centered-wrapper">
                <div className="horizontal-centered error-div">
                    <img className="logo_error_new" src={FoodifyImg} alt="LOGO"/>
                    <h2 className="font-weight-light align-content-center">
                        <Trans i18nKey="apology"/>
                        <br/>
                        <Trans i18nKey={errorsMap.get(error)}/>
                    </h2>
                    <Link to={`/`}>
                        <Button className="btn-green">
                            <Trans i18nKey="goMainPage"/>
                        </Button>
                    </Link>
                </div>
            </section>
        );
    }
}

Error.defaultProps = {
    error: "other"
};

export default Error;