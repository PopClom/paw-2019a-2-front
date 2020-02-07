import React from 'react';

class RatingRecipe extends React.Component {
    render() {
        const rating = this.props.rating;
        const disabled = this.props.disabled;

        return (
            <fieldset className="rating rating-recipe" disabled={disabled}>
                {[...Array(20).keys()].reverse().map(i => {
                    const idx = Math.floor(i / 2);
                    const value = idx/2 + 0.5;
                    if (i % 2 === 0)
                        return <input readOnly key={`input-${value}`} type="radio" id={`rate-${value}`} value={value} checked={rating >= value}/>;
                    else
                        return <label key={`label-${value}`} className={idx % 2 === 0 ? "half" : "full"} htmlFor={`rate-${value}`} />;
                })}
            </fieldset>
        );
    }
}

export default RatingRecipe;