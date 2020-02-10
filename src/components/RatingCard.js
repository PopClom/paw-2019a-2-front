import React from 'react';

class RatingCard extends React.Component {
    render() {
        const rating = this.props.rating;

        return (
            <fieldset className="rating rating-card" disabled>
                {[...Array(20).keys()].reverse().map(i => {
                    const idx = Math.floor(i / 2);
                    const value = idx/2 + 0.5;
                    if (i % 2 === 0)
                        return <label key={`label-${value}`} className={idx % 2 === 0 ? "half" : "full"} htmlFor={`rate-${value}`} />;
                    else
                        return <input readOnly key={`input-${value}`} type="radio" id={`rate-${value}`} value={value} checked={rating >= value}/>;
                })}
            </fieldset>
        );
    }
}

export default RatingCard;