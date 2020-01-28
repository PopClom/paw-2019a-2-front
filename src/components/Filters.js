import React from 'react';
import { Trans } from 'react-i18next';
import axios from "axios";
import {SERVER_ADDR} from "../constants";

class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: {},
            tagsCheckboxes: {},
            orderSelected: {},
            orders: {}
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
                orderSelected: response.data.orders[0]
            });
        });
    }

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
        const {tags, orders} = this.state;

        return (
            <div id="filters-card">
                <h4>
                    <Trans>Filters</Trans>
                </h4>

                <form autoComplete="off" action="/" method="get"
                           encType="multipart/form-data">

                    <input className="form-control" path="searchBar" placeholder="Search"/>

                    <label className="text-filter">
                        <Trans>sortBy</Trans>
                    </label>
                    <div className="filter-items">
                        {Object.keys(orders).map(idx =>
                            <div className="custom-control custom-radio">
                                <input type="radio" path="order" value={orders[idx]} className="custom-control-input"
                                       id={orders[idx]} name="groupOrderFilter" checked={this.state.orderSelected === orders[idx]}
                                       onChange={this.onOrdersChange.bind(this)}/>
                                <label className="custom-control-label" path="order" htmlFor={orders[idx]}>
                                    <Trans i18nKey={orders[idx]} />
                                </label>
                            </div>
                        )}
                    </div>

                    <label className="text-filter">
                        <Trans i18nKey="cuisineType"/>
                    </label>
                    <div className="filter-items">
                        {Object.keys(tags).map(idx =>
                            <div className="custom-control custom-checkbox">
                                <input path="tags" value={tags[idx]} className="custom-control-input" id={tags[idx]}
                                          name="groupTagFilter" type='checkbox' checked={this.state.tagsCheckboxes[tags[idx]]}
                                          onChange={this.onTagsChange.bind(this)}/>
                                <label className="custom-control-label" path="tags" htmlFor={tags[idx]}>
                                    <Trans i18nKey={tags[idx]}/>
                                </label>
                            </div>
                        )}
                    </div>

                    <button className="btn btn-green btn-apply-filters" type="submit">
                        <Trans>confirm</Trans>
                    </button>
                </form>
            </div>
        )
    }
}


export default Filters;