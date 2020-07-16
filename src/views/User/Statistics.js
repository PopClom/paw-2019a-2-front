import React from 'react';
import axios from "axios";
import {SERVER_ADDR} from '../../constants';
import Spinner from '../../components/General/Spinner';
import {Card, Tab, Tabs} from "react-bootstrap";
import {Trans, withTranslation} from "react-i18next";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateRangePicker from "../../components/General/DateRangePicker";
import DateFnsUtils from "@date-io/date-fns";
import enLocale from "date-fns/locale/en-US";
import esLocale from "date-fns/locale/es";
import i18next from "i18next";
import {Doughnut, HorizontalBar} from 'react-chartjs-2';
import {formatDate, formatDateAlternative} from "../../helpers";

const localeMap = {
    en: enLocale,
    es: esLocale,
};

const colors = ['#33FFCC', "#4CAF50", "#CDDC39", "#FFC107",
    "#FF5722", '#FF1A66', '#B33300', "#795548",
    "#9E9E9E", "#607D8B", '#FFB399', '#99FF99',
    '#FFFF99', '#00B3E6', '#3366E6', '#E6B333',
    '#B34D4D', '#80B300', '#809900', '#E6B3B3',
    '#6680B3', '#66991A', '#66664D', '#991AFF',
    '#E666FF', '#4DB3FF', '#1AB399', '#E666B3',
    '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33',
    '#999933', '#FF3380', '#CCCC00', '#66E64D',
    '#4D80CC', '#9900B3', '#4DB380', '#FF4D4D'];

const barStyle = {
    backgroundColor: 'rgba(132,255,99,0.4)',
    borderColor: 'rgba(132,255,99,1)',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(132,255,99,0.6)',
    hoverBorderColor: 'rgba(132,255,99,1)'
};

const doughnutStyle = {
    backgroundColor: colors,
    hoverBackgroundColor: colors
};

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchingMy: false,
            fetchingGeneral: false,
            show: false,
            selectedDate: {},
            locale: localeMap.en,
            dataIngredientsMy: {},
            dataTagsMy: {},
            dataIngredientsGeneral: {},
            dataTagsGeneral: {}
        }
    }

    componentDidMount() {
        if (i18next.language.substring(0, 2) === "es") {
            this.setState({locale: localeMap.es});
        }
        const beginDate = new Date();
        beginDate.setMonth(beginDate.getMonth() - 1);
        this.handleDateChange({begin: beginDate, end: new Date()});
    }

    handleDateChange = (selectedDate) => {
        this.setState({selectedDate: selectedDate, fetchingMy: true, fetchingGeneral: true, show: true});

        axios.get(`${SERVER_ADDR}/user/statistics`,
            {params: {from: formatDate(selectedDate.begin), to: formatDate(selectedDate.end)}})
            .then(response => {
                const dataIngredients = this.processData(response.data.ingredientStatistics.entry, barStyle);
                const dataTags = this.processData(response.data.tagStatistics.entry, doughnutStyle);
                this.setState({
                    dataIngredientsMy: dataIngredients,
                    dataTagsMy: dataTags,
                    fetchingMy: false
                });
            });

        axios.get(`${SERVER_ADDR}/users/statistics`,
            {params: {from: formatDate(selectedDate.begin), to: formatDate(selectedDate.end)}})
            .then(response => {
                const dataIngredients = this.processData(response.data.ingredientStatistics.entry, barStyle);
                const dataTags = this.processData(response.data.tagStatistics.entry, doughnutStyle);
                this.setState({
                    dataIngredientsGeneral: dataIngredients,
                    dataTagsGeneral: dataTags,
                    fetchingGeneral: false
                });
            });
    };

    processData = (entries, style) => {
        const {t} = this.props;
        const data = {
            labels: [],
            datasets: [{
                ...style,
                data: []
            }]
        };
        entries.forEach(item => {
            data.labels.push(t(item.key));
            data.datasets[0].data.push(item.value);
        });
        return data;
    };

    renderPlots = (dataIngredients, dataTag) => {
        console.log(dataTag);
        return (
            <Tab.Content>
                <h3 className="statistics-chart-title">
                    <Trans i18nKey="charts.bar.title"/>
                </h3>
                {dataIngredients.labels && dataIngredients.labels.length > 0 ?
                    <div>
                        <h3 className="statistics-chart-description">
                            <Trans i18nKey="charts.bar.description"/>
                        </h3>
                        <div className="tab-charts-content" style={{height: 60 * dataIngredients.labels.length}}>
                            <HorizontalBar data={dataIngredients}
                                           options={{
                                               legend: {display: false},
                                               maintainAspectRatio: false,
                                               scales: {
                                                   xAxes: [{
                                                       ticks: {
                                                           beginAtZero: true
                                                       }
                                                   }]
                                               }
                                           }}/>
                        </div>
                    </div> :
                    <div>
                        <h3 className="navigation-subtitle">
                            <Trans i18nKey="Chart.NoData"/>
                        </h3>
                    </div>}

                <h3 className="statistics-chart-title">
                    <Trans i18nKey="charts.tags.title"/>
                </h3>
                {dataTag.labels && dataTag.labels.length > 0 && Math.max(...dataTag.datasets[0].data) > 0 ?
                    <div>
                        <h3 className="statistics-chart-description">
                            <Trans i18nKey="charts.tags.description"/>
                        </h3>
                        <div className="tab-charts-content">
                            <Doughnut data={dataTag}/>
                        </div>
                    </div> :
                    <div>
                        <h3 className="navigation-subtitle">
                            <Trans i18nKey="Chart.NoData"/>
                        </h3>
                    </div>}
            </Tab.Content>
        );
    };

    render() {
        const {
            fetchingMy, fetchingGeneral, show, selectedDate, locale,
            dataIngredientsMy, dataTagsMy, dataIngredientsGeneral, dataTagsGeneral
        } = this.state;
        const {t} = this.props;

        console.log(this.state);
        return (
            <section>
                <h4 className="navigation-title pt-3"><Trans i18nKey="myStatistics"/></h4>

                <section className="browse">
                    <Card>
                        <Card.Title>
                            <div className="date-form">
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                                    <div className="date-range-picker">
                                        <DateRangePicker
                                            value={selectedDate}
                                            className="fullWidth"
                                            placeholder={selectedDate.begin &&
                                                (formatDateAlternative(selectedDate.begin) + " - " + formatDateAlternative(selectedDate.end))
                                            }
                                            onChange={values => this.handleDateChange(values)}/>
                                    </div>
                                </MuiPickersUtilsProvider>
                            </div>
                        </Card.Title>
                        {show &&
                        <Card.Body>
                            <Tabs defaultActiveKey="user" id="uncontrolled-tab-example" className="tab-border">
                                <Tab eventKey="user" title={<Trans i18nKey="statistics.my"/>}>
                                    {fetchingMy ? <Spinner/> :
                                        this.renderPlots(dataIngredientsMy, dataTagsMy)}
                                </Tab>
                                <Tab eventKey="general" title={<Trans i18nKey="statistics.general"/>}>
                                    {fetchingGeneral ? <Spinner/> :
                                        this.renderPlots(dataIngredientsGeneral, dataTagsGeneral)}
                                </Tab>
                            </Tabs>
                        </Card.Body>}
                    </Card>
                </section>
            </section>
        );
    }
}

const Extended = withTranslation()(Statistics);
Extended.static = Statistics.static;

export default Extended;