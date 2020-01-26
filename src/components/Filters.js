import React from 'react';
import { Trans } from 'react-i18next';
import axios from "axios";
import {SERVER_ADDR} from "../constants";

class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: {},
            tagsCheckboxes: {}
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_ADDR}/recipes/get_tags`).then(response => {
            this.setState({tags: response.data.tags});
            let tagsCheckboxes = {};
            Object.keys(this.state.tags).map(idx => tagsCheckboxes[this.state.tags[idx]] = false);
            this.setState({tagsCheckboxes});
        });
    }

    onTagsChange(event) {
        const val = event.target.checked;
        const id = event.target.id;


        let tagsCheckboxes = Object.assign({}, this.state.tagsCheckboxes, {[id]: val});
        this.setState({tagsCheckboxes});
    }

    render() {
        const {tags} = this.state;

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
                            </div>)}
                    </div>

                    <button className="btn btn-green btn-apply-filters" type="submit">
                        <Trans>confirm</Trans>
                    </button>
                </form>
            </div>
        )
    }
}

/*
<div className="filter-items">
                        <c:forEach var="order" items="${allOrders}">
                            <div className="custom-control custom-radio">
                                <form:radiobutton path="order" value="${order}" className="custom-control-input"
                                                  id="${order}" name="groupOrderFilter"/>
                                <form:label className="custom-control-label" path="order" htmlFor="${order}">
                                    <spring:message code="${order}"/>
                                </form:label>
                            </div>
                        </c:forEach>
                    </div>

                    <label className="text-filter">
                        <spring:message code="cuisineType"/>
                    </label>
                    <div className="filter-items">
                        <c:forEach var="tag" items="${allTags}">
                            <div className="custom-control custom-checkbox">
                                <form:checkbox path="tags" value="${tag}" className="custom-control-input" id="${tag}"
                                               name="groupTagFilter"/>
                                <form:label className="custom-control-label" path="tags" htmlFor="${tag}">
                                    <spring:message code="${tag}"/>
                                </form:label>
                            </div>
                        </c:forEach>
                    </div>

                    <label className="text-filter">
                        <spring:message code="ingredientsFilter"/>
                    </label>
                    <div className="filter-items">
                        <c:if test="${!guest}">
                            <div className="custom-control custom-checkbox filter-ingredients-item">
                                <form:checkbox path="withMyIngredients" value="false" className="custom-control-input"
                                               id="withMyIngredients" name="groupIngredientsFilter"
                                               onclick="disable_select_ingredient()"/>
                                <form:label className="custom-control-label" path="withMyIngredients"
                                            htmlFor="withMyIngredients">
                                    <spring:message code="withMyIngredients"/>
                                </form:label>
                            </div>
                        </c:if>
                        <div className="filter-ingredients-group-label filter-ingredients-item">
                            <form:label path="ingredients" cssClass="ingredientLabel">
                                <spring:message code="ingredients.Filter.Group"/>
                            </form:label>
                            <form:select path="ingredients" cssClass="form-control mb-4 select-ingredient-multiple"
                                         multiple="multiple">
                                <c:forEach var="ingredient_type" items="${allIngredients}">
                                    <form:option value="${ingredient_type.id}">
                                        <spring:message code="${ingredient_type.name}"/>
                                    </form:option>
                                </c:forEach>
                            </form:select>
                        </div>
                    </div>
 */

export default Filters;