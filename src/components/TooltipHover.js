import React from 'react';
import {OverlayTrigger} from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";

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