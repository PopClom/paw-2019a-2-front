import React from 'react';
import CooklistsImg from "../assets/img/recipes.jpg";
import {Trans} from "react-i18next";
import {Link} from "react-router-dom";

class AccountCard extends React.Component {
    render() {
        const {title, description, image, link} = this.props;

        return (
            <div className="card card-cascade card-recipe ">
                <div className="view view-cascade">
                    <div className="bg-dark">
                        <img className="card-img-top" src={image}/>
                        <a>
                            <div className="mask rgba-white-slight"/>
                        </a>
                    </div>
                </div>

                <div className="card-body">
                    <h4 className="card-title">
                        <strong>{title}</strong>
                    </h4>
                    <p className="card-text">{description}</p>
                    <Link to={link} className="stretched-link"/>
                </div>
            </div>
        );
    }
}

export default AccountCard;