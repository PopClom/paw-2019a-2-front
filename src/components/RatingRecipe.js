import React from 'react';

class RatingRecipe extends React.Component {
    render() {
        const rating = this.props.rating;

        return (
            <fieldset className="rating rating-recipe" disabled>
                {[...Array(10).keys()].reverse().map(i => {
                    const value = i/2 + 0.5;
                    return (
                        <>
                            <input readOnly key={`input-${value}`} type="radio" id={`rate-${value}`} value={value} checked={rating >= value}/>
                            <label key={`label-${value}`} className={i % 2 === 0 ? "half" : "full"} htmlFor={`rate-${value}`} />
                        </>
                    );
                })}
            </fieldset>
        );
    }
}

export default RatingRecipe;