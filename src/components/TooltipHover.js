import React from 'react';
import {OverlayTrigger, Popover, PopoverContent, PopoverTitle} from "react-bootstrap";

class TooltipHover extends React.Component {
    render() {
        const {placement,message, icon} = this.props;

        return (
                <OverlayTrigger
                    placement={placement}
                    overlay={
                        <Popover className={"popover-" + placement}>
                            <PopoverContent className="text-white-smoke">
                                {message}
                            </PopoverContent>
                        </Popover>
                    }>
                    {icon}
                </OverlayTrigger>
        );
    }
}

TooltipHover.defaultProps = {
    placement: "right"
};

export default TooltipHover;