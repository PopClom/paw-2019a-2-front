import React, {Fragment, useCallback} from 'react';
import axios from "axios";
import {SERVER_ADDR} from '../constants';
import RecipeCard from '../components/RecipeCard';
import Filters from '../components/Filters';
import Spinner from '../components/Spinner';
import {Link} from "react-router-dom";
import {Button, Card, Tab, Tabs, ThemeProvider} from "react-bootstrap";
import {Trans, withTranslation} from "react-i18next";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateRangePicker from "../components/DateRangePicker";
import DateFnsUtils from "@date-io/date-fns";
import enLocale from "date-fns/locale/en-US";
import esLocale from "date-fns/locale/es";
import i18next from "i18next";
import {Doughnut, HorizontalBar} from 'react-chartjs-2';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import UserBar from "../components/UserBar";
import {getUser} from "../helpers/auth";

const localeMap = {
    en: enLocale,
    es: esLocale,
};

const colors = ["#2196F3", "#00BCD4", "#4CAF50", "#CDDC39", "#FFC107",
    "#FF5722", "#795548", "#9E9E9E", "#607D8B", "#9C27B0", "#3F51B5",
    '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            backgroundColor: colors,
            hoverBackgroundColor: colors,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            selectedDates: [],
            locale: localeMap.en
        }
    }

    componentDidMount() {
        if (i18next.language.substring(0, 2) === "es") {
            this.setState({locale: localeMap.es});
        }
    }

    handleDateChange = (selectedDate) => {
        this.setState({selectedDate});
        console.log(selectedDate);
    };


    render() {
        const {fetching, selectedDates, locale} = this.state;
        const {t} = this.props;

        return (
                <section className="main_container">

                    <h4 className="navigation-title pt-3"><Trans i18nKey="myStatistics"/></h4>

                    <section className="browse">

                        <Card>
                            <Card.Title>
                                <div className="date-form">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                                        <div className="date-range-picker">
                                            <DateRangePicker value={selectedDates} className="fullWidth"
                                                             placeholder={t('date.range')}
                                                             onChange={values => this.handleDateChange(values)}/>
                                        </div>
                                    </MuiPickersUtilsProvider>
                                </div>
                            </Card.Title>
                            <Card.Body>
                                <Tabs defaultActiveKey="general" id="uncontrolled-tab-example" className="tab-border">
                                    <Tab eventKey="general" title={<Trans i18nKey="statistics.general"/>}>
                                        <Tab.Content>
                                            <div className="tab-charts-content">
                                                <HorizontalBar ref="chart" data={data} options={{
                                                    legend: {
                                                        display: false
                                                    }
                                                }}/>
                                                <Doughnut data={data}/>
                                            </div>
                                        </Tab.Content>
                                    </Tab>
                                    <Tab eventKey="user" title={<Trans i18nKey="statistics.my"/>}>
                                        <Tab.Content>
                                            <div className="tab-charts-content">
                                                <HorizontalBar ref="chart" data={data} options={{
                                                    legend: {
                                                        display: false
                                                    }
                                                }}/>
                                                <Doughnut data={data}/>
                                            </div>
                                        </Tab.Content>
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                        </Card>

                    </section>

                    <UserBar user={getUser()}/>
                </section>
        );
    }
}

const Extended = withTranslation()(Statistics);
Extended.static = Statistics.static;

export default Extended;