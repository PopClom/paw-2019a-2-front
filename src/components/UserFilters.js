import React from 'react';
import {Card, CardDeck, Form} from "react-bootstrap";
import {Trans, withTranslation} from "react-i18next";
import RecipeCard from "./RecipeCard";
import {Link} from "react-router-dom";
import UserImg from "../assets/img/user.png"
import {getUser} from "../helpers/auth";
import {followsUser, isMyUser} from "../helpers";

class UserFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allOrders: [],

        }
    }


    render() {
        const {allOrders, orderSelected} = this.state;
        const {users, t} = this.props;

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
                                        <div className="custom-control custom-radio">
                                            <Form.Control type="radio" value={allOrders[idx]}
                                                          id={allOrders[idx]} name="groupOrderFilter"
                                                          checked={orderSelected === allOrders[idx]}
                                                          onChange={this.onOrdersChange}/>
                                            <Form.Label path="order">
                                                <Trans i18nKey="${order}"/>
                                            </Form.Label>
                                        </div>)}

                                </div>

                                {/*<c:if test="${isAdmin}">*/}
                                {/*    <label className="text-filter">*/}
                                {/*        <Trans i18nKey="status"/>*/}
                                {/*    </label>*/}
                                {/*    <div className="filter-items">*/}
                                {/*        <c:forEach var="status" items="${allStatus}">*/}
                                {/*            <div className="custom-control custom-radio">*/}
                                {/*                <form:radiobutton path="status" value="${status}" className="custom-control-input"*/}
                                {/*                                  id="${status}"*/}
                                {/*                                  name="groupOrderFilter"/>*/}
                                {/*                <form:label className="custom-control-label" path="status" htmlFor="${status}">*/}
                                {/*                    <Trans i18nKey="${status}"/>*/}
                                {/*                </form:label>*/}
                                {/*            </div>*/}
                                {/*        </c:forEach>*/}
                                {/*    </div>*/}
                                {/*</c:if>*/}

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