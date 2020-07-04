import React from 'react';
import {Trans, withTranslation} from "react-i18next";
import axios from "axios";
import {SERVER_ADDR} from "../../constants";
import {isUserAdmin} from "../../helpers";

class UserFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: '',
            allOrders: [],
            allStatus: [],
            statusSelected: '',
            orderSelected: ''
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_ADDR}/users/orders`).then(response => {
            this.setState({
                allOrders: response.data.list,
                orderSelected: response.data.list[0]
            })
        });

        axios.get(`${SERVER_ADDR}/users/status`).then(response => {
            this.setState({
                allStatus: response.data.list,
                statusSelected: response.data.list[0]
            })
        });
    }

    onOrdersChange = (event) => {
        const id = event.target.id;
        this.setState({orderSelected: id}, () => {
            this.props.onUpdate(this.state.searchString, this.state.orderSelected, this.state.statusSelected)
        });
    };

    onStatusChange = (event) => {
        const id = event.target.id;
        this.setState({statusSelected: id}, () => {
            this.props.onUpdate(this.state.searchString, this.state.orderSelected, this.state.statusSelected)
        });
    };

    onChangeSearchString = (event) => {
        const val = event.target.value;
        this.setState({searchString: val}, () => {
            this.props.onUpdate(this.state.searchString, this.state.orderSelected, this.state.statusSelected)
        });
    };

    render() {
        const {searchString, allOrders, allStatus, orderSelected, statusSelected} = this.state;
        const {t, onApply} = this.props;

        return (
            <section className="side-card-container">
                <div className="card">
                    <div className="card-body" id="filters-big-card">
                        <div id="filters-card">
                            <h4>
                                <Trans i18nKey="searchFilters"/>
                            </h4>

                            <div>
                                <input className="form-control" placeholder={t('search')}
                                       value={searchString} onChange={this.onChangeSearchString}/>

                                <label className="text-filter">
                                    <Trans i18nKey="sortBy"/>
                                </label>
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

                                {isUserAdmin() &&
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
                                    </div>}

                                <button className="btn btn-green btn-apply-filters"
                                        onClick={onApply}>
                                    <Trans i18nKey="confirm"/>
                                </button>
                            </div>
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