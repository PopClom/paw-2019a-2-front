import React from 'react';
import {Card, CardDeck, Form} from "react-bootstrap";
import {Trans, withTranslation} from "react-i18next";
import RecipeCard from "./RecipeCard";
import {Link} from "react-router-dom";
import UserImg from "../assets/img/user.png"
import {getUser} from "../helpers/auth";
import {isFollowingUser, isMyUser} from "../helpers";
import axios from "axios";
import {SERVER_ADDR} from "../constants";

class UserFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allOrders: [],
            allStatus: [],
            statusSelected: '',
            orderSelected: ''
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_ADDR}/users/get_orders`).then(response => {
            this.setState({
                allOrders: response.data.list,
                orderSelected: response.data.list[0]
            })
        });

        axios.get(`${SERVER_ADDR}/users/get_status`).then(response => {
            this.setState({
                allStatus: response.data.list,
                statusSelected: response.data.list[0]
            })
        });
    }

    onOrdersChange = (event) => {
        const id = event.target.id;
        this.setState({orderSelected: id});
    };

    onStatusChange = (event) => {
        const id = event.target.id;
        this.setState({statusSelected: id});
    };

    render() {
        const {allOrders, allStatus, statusSelected, orderSelected} = this.state;
        const {t} = this.props;

        return (

            <section className="side-card-container">
                <div className="card">
                    <div className="card-body" id="filters-big-card">
                        <div id="filters-card">
                            <h4>
                                <Trans i18nKey="searchFilters"/>
                            </h4>

                            <Form>

                                <Trans i18nKey="search" var="search"/>
                                <Form.Control path="searchBar" placeholder={t('search')}/>

                                <Form.Label className="text-filter">
                                    <Trans i18nKey="sortBy"/>
                                </Form.Label>

                                <div className="filter-items">
                                    {Object.keys(allOrders).map(idx =>
                                        <div className="custom-control custom-radio" key={idx}>
                                            <input type="radio" value={allOrders[idx]} className="custom-control-input"
                                                   id={allOrders[idx]} name="groupOrderFilter"
                                                   checked={orderSelected === allOrders[idx]}
                                                   onChange={this.onOrdersChange}/>
                                            <label className="custom-control-label" htmlFor={allOrders[idx]}>
                                                <Trans i18nKey={allOrders[idx]}/>
                                            </label>
                                        </div>)}
                                </div>

                                {getUser().admin ?
                                    <div>
                                        <label className="text-filter">
                                            <Trans i18nKey="status"/>
                                        </label>
                                        <div className="filter-items">
                                            {Object.keys(allStatus).map(idx =>
                                                <div className="custom-control custom-radio" key={idx}>
                                                    <input type="radio" value={allStatus[idx]}
                                                           className="custom-control-input"
                                                           id={allStatus[idx]} name="groupStatusFilter"
                                                           checked={statusSelected === allStatus[idx]}
                                                           onChange={this.onStatusChange}/>
                                                    <label className="custom-control-label" htmlFor={allStatus[idx]}>
                                                        <Trans i18nKey={allStatus[idx]}/>
                                                    </label>
                                                </div>)}
                                        </div>
                                    </div>
                                    : ''
                                }

                                <button className="btn btn-green btn-apply-filters" type="submit">
                                    <Trans i18nKey="confirm"/>
                                </button>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const Extended = withTranslation()(UserFilters);
Extended.static = UserFilters.static;

export default Extended;