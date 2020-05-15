import React from 'react';
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";

class SimpleCard extends React.Component {
    render() {
        const {title, description, image, link} = this.props;

        return (
            <Card className="card-recipe">
                {image !== undefined && <Card.Img variant="top" src={image}/>}
                <Card.Body>
                    <h4 className="card-title">
                        <strong>{title}</strong>
                    </h4>
                    {description !== undefined && <p className="card-text">{description}</p>}
                    {link !== undefined && <Link to={link} className="stretched-link"/>}
                </Card.Body>
            </Card>
        );
    }
}

export default SimpleCard;