import React from 'react';
import {OverlayTrigger} from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import {Trans} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

class TooltipHover extends React.Component {
    render() {
        const {placement,message, icon} = this.props;

        return (
                <OverlayTrigger
                    placement={placement}
                    overlay={
                        <Tooltip>
                            {message}
                        </Tooltip>
                    }>
                    {icon}
                </OverlayTrigger>
        );
    }
}

export default TooltipHover;