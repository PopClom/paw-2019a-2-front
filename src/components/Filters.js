import React from 'react';
import {Trans, withTranslation} from 'react-i18next';
import axios from "axios";
import {SERVER_ADDR} from "../constants";
import Select from 'react-select';

class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: '',
            tags: [],
            tagsCheckboxes: [],
            orderSelected: '',
            orders: {},
            allIngredients: {},
            selectedIngredients: {},
            withMyIngredients: false
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_ADDR}/recipes/get_tags`).then(response => {
            this.setState({tags: response.data.tags});
            let tagsCheckboxes = {};
            Object.keys(this.state.tags).map(idx => tagsCheckboxes[this.state.tags[idx]] = false);
            this.setState({tagsCheckboxes});
        });

        axios.get(`${SERVER_ADDR}/recipes/get_orders`).then(response => {
            this.setState({
                orders: response.data.orders,
                orderSelected: response.data.orders[2]
            });
        });

        axios.get(`${SERVER_ADDR}/recipes/get_all_ingredients`).then(response => {
            response.data.ingredients.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            this.setState({ allIngredients: response.data.ingredients});
        })
    }

    onSelectChange = (values) => {
      this.setState({selectedIngredients: values});
    };

    onOrdersChange = (event) => {
        const id = event.target.id;
        this.setState({orderSelected: id});
    };

    onTagsChange = (event) => {
        const val = event.target.checked;
        const id = event.target.id;

        let tagsCheckboxes = Object.assign({}, this.state.tagsCheckboxes, {[id]: val});
        this.setState({tagsCheckboxes});
    };

    onWithMyIngredientsChange = (event) => {
        const val = event.target.checked;
        this.setState({withMyIngredients: val});
    };

    onChangeSearchString = (event) => {
        const val = event.target.value;
        this.setState({searchString: val});
    };

    render() {
        const {searchString, tags, orders, tagsCheckboxes, orderSelected, allIngredients,
            selectedIngredients, withMyIngredients} = this.state;
        const{t} = this.props;

        return (
            <div id="filters-card">
                <h4>
                    <Trans>Filters</Trans>
                </h4>

                <div>

                    <input className="form-control" placeholder="Search"
                           value={searchString} onChange={this.onChangeSearchString}/>

                    <label className="text-filter">
                        <Trans>sortBy</Trans>
                    </label>
                    <div className="filter-items">
                        {Object.keys(orders).map(idx =>
                            <div className="custom-control custom-radio" key={idx}>
                                <input type="radio" value={orders[idx]} className="custom-control-input"
                                       id={orders[idx]} name="groupOrderFilter"
                                       checked={orderSelected === orders[idx]}
                                       onChange={this.onOrdersChange}/>
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
                                <input type="checkbox" value={tags[idx]} className="custom-control-input" id={tags[idx]}
                                       name="groupTagFilter"
                                       checked={tagsCheckboxes[idx]}
                                       onChange={this.onTagsChange}/>
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
                                   id="withMyIngredients" name="groupIngredientsFilter"
                                   checked={withMyIngredients} onChange={this.onWithMyIngredientsChange}/>
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
                                getOptionLabel = {(ingredient) => <Trans>{ingredient.name}</Trans>}
                                getOptionValue = {(ingredient) => t(ingredient.name)}
                                isMulti = "true"
                                menuPlacement = "top"
                                placeholder = {<Trans>ingredient.selectMulti</Trans>}/>
                        </div>
                    </div>

                    <button className="btn btn-green btn-apply-filters"
                            onClick={() => this.props.onSearch(searchString, tagsCheckboxes, orderSelected,
                                selectedIngredients, withMyIngredients)}>
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