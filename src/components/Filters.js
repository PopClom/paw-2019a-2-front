import React from 'react';
import {Trans, withTranslation} from 'react-i18next';
import axios from "axios";
import {SERVER_ADDR} from "../constants";
import Select from 'react-select';

class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: {},
            tagsCheckboxes: {},
            orderSelected: {},
            orders: {},
            allIngredients: {},
            selectedIngredients: {}
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_ADDR}/recipes/get_tags`).then(response => {
            this.setState({tags: response.data.tags});
            let tagsCheckboxes = {};
            Object.keys(this.state.tags).map(idx => tagsCheckboxes[this.state.tags[idx]] = false);
            this.setState({tagsCheckboxes});
            console.log(tagsCheckboxes);
        });

        axios.get(`${SERVER_ADDR}/recipes/get_orders`).then(response => {
            this.setState({
                orders: response.data.orders,
                orderSelected: response.data.orders[0]
            });
        });

        axios.get(`${SERVER_ADDR}/recipes/get_all_ingredients`).then(response => {
            this.setState({ allIngredients: response.data.ingredients});
        })
    }

    onSelectChange = (values) => {
      this.setState({selectedIngredients: values});
    };

    onOrdersChange(event) {
        const id = event.target.id;

        this.setState({orderSelected: id});
    }

    onTagsChange(event) {
        const val = event.target.checked;
        const id = event.target.id;

        let tagsCheckboxes = Object.assign({}, this.state.tagsCheckboxes, {[id]: val});
        this.setState({tagsCheckboxes});
    }

    render() {
        const {tags, orders, tagsCheckboxes, orderSelected, allIngredients} = this.state;
        const {t} = this.props;

        return (
            <div id="filters-card">
                <h4>
                    <Trans>Filters</Trans>
                </h4>

                <div>

                    <input className="form-control" placeholder="Search"/>

                    <label className="text-filter">
                        <Trans>sortBy</Trans>
                    </label>
                    <div className="filter-items">
                        {Object.keys(orders).map(idx =>
                            <div className="custom-control custom-radio" key={idx}>
                                <input type="radio" value={orders[idx]} className="custom-control-input"
                                       id={orders[idx]} name="groupOrderFilter"
                                       checked={this.state.orderSelected === orders[idx]}
                                       onChange={this.onOrdersChange.bind(this)}/>
                                <label className="custom-control-label" htmlFor={orders[idx]}>
                                    <Trans i18nKey={orders[idx]}/>
                                </label>
                            </div>
                        )}
                    </div>

                    <label className="text-filter">
                        <Trans i18nKey="cuisineType"/>
                    </label>
                    <div className="filter-items">
                        {Object.keys(tags).map(idx =>
                            <div className="custom-control custom-checkbox" key={idx}>
                                <input value={tags[idx]} className="custom-control-input" id={tags[idx]}
                                       name="groupTagFilter" type='checkbox'
                                       checked={this.state.tagsCheckboxes[tags[idx]]}
                                       onChange={this.onTagsChange.bind(this)}/>
                                <label className="custom-control-label" htmlFor={tags[idx]}>
                                    <Trans i18nKey={tags[idx]}/>
                                </label>
                            </div>
                        )}
                    </div>

                    <label className="text-filter">
                        <Trans>ingredientsFilter</Trans>
                    </label>
                    <div className="filter-items">
                        <div className="custom-control custom-checkbox filter-ingredients-item">
                            <input type="checkbox"  value="false" className="custom-control-input"
                                           id="withMyIngredients" name="groupIngredientsFilter"/>
                            <label className="custom-control-label"
                                        htmlFor="withMyIngredients">
                                <Trans>withMyIngredients</Trans>
                            </label>
                        </div>
                        <div className="filter-ingredients-group-label filter-ingredients-item">
                            <label  className="ingredientLabel">
                                <Trans>ingredients.Filter.Group</Trans>
                            </label>
                            <Select
                                onChange = {this.onSelectChange}
                                options = {allIngredients}
                                getOptionLabel = {(ingredient) => t(ingredient.name)}
                                getOptionValue = {(ingredient) => ingredient.id}
                                isMulti = "true"
                                menuPlacement = "top"
                                placeholder = {t('ingredient.selectMulti')}/>
                        </div>
                    </div>

                    <button className="btn btn-green btn-apply-filters"
                            onClick={() => this.props.onSearch(tagsCheckboxes, orderSelected)}>
                        <Trans>confirm</Trans>
                    </button>
                </div>
            </div>
        )
    }
}

const Extended = withTranslation()(Filters);
Extended.static = Filters.static;

export default Extended;