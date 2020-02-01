import React from 'react';
import {Link} from "react-router-dom";
import {Card, Image} from "react-bootstrap";

class AccountCard extends React.Component {
    render() {
        const {title, description, image, link} = this.props;

        return (
            <Card className="card-recipe">
                <Card.Img variant="top" src={image}/>
                <Card.Body>
                    <h4 className="card-title">
                        <strong>{title}</strong>
                    </h4>
                    <p className="card-text">{description}</p>
                    <Link to={link} className="stretched-link"/>
                </Card.Body>
            </Card>
        );
    }
}

export default AccountCard;