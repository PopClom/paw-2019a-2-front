import React, {Fragment, useCallback} from 'react';
import axios from "axios";
import {SERVER_ADDR} from '../constants';
import RecipeCard from '../components/RecipeCard';
import Filters from '../components/Filters';
import Spinner from '../components/Spinner';
import {Link} from "react-router-dom";
import {Button, Card, Tab, Tabs} from "react-bootstrap";
import {Trans, withTranslation} from "react-i18next";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateRangePicker from "../components/DateRangePicker";
import DateFnsUtils from "@date-io/date-fns";
import enLocale from "date-fns/locale/en-US";
import esLocale from "date-fns/locale/es";
import i18next from "i18next";
import {Bar, Doughnut} from 'react-chartjs-2';

const localeMap = {
    en: enLocale,
    es: esLocale,
};

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
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
                                <Tab eventKey="general" title={<Trans i18nKey="statistics.general"/>} >
                                    <Tab.Content>
                                        <div className="tab-charts-content">
                                            <Bar ref="chart" data={data}/>
                                            <Doughnut data={data}/>
                                        </div>
                                    </Tab.Content>
                                </Tab>
                                <Tab eventKey="user" title={<Trans i18nKey="statistics.my"/>}>
                                    <Tab.Content>
                                        <div className="tab-charts-content">
                                            <Bar ref="chart" data={data}/>
                                            <Doughnut data={data}/>
                                        </div>
                                    </Tab.Content>
                                </Tab>
                            </Tabs>
                        </Card.Body>
                    </Card>

                </section>

                <section className="side-card-container">
                    <div className="card">
                        <div className="card-body card-body-user-bar">
                            <p>dsadsa</p>
                        </div>
                    </div>
                </section>
            </section>
        );
    }
}

const Extended = withTranslation()(Statistics);
Extended.static = Statistics.static;

export default Extended;