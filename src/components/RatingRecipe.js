import React from 'react';

class RatingRecipe extends React.Component {
    render() {
        const {rating, onClick} = this.props;

        return (
            <fieldset className="rating rating-recipe" disabled={!onClick}>
                {[...Array(20).keys()].reverse().map(i => {
                    const idx = Math.floor(i / 2);
                    const value = idx/2 + 0.5;
                    if (i % 2 === 0)
                        return <label onClick={() => onClick(value)}
                                      key={`label-${value}`}
                                      className={idx % 2 === 0 ? "half" : "full"}
                                      htmlFor={`rate-${value}`} />;
                    else
                        return <input readOnly
                                      key={`input-${value}`}
                                      type="radio"
                                      id={`rate-${value}`}
                                      value={value}
                                      checked={rating >= value}/>;
                })}
            </fieldset>
        );
    }
}

export default RatingRecipe;