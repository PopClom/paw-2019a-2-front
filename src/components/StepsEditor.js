import React from 'react';
import {Trans, withTranslation} from 'react-i18next';
import axios from "axios";
import {SERVER_ADDR} from "../constants";
import Select from 'react-select';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Form} from "react-bootstrap";
import TooltipHover from "./TooltipHover";
import {MuiPickersUtilsProvider, TimePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {AccessAlarm} from "@material-ui/icons";
import Button from "react-bootstrap/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from '@material-ui/icons/AddCircle';

const defaultDate = new Date(2020, 1, 1, 0, 0, 0, 0);

class StepsEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: 0
        }
    }

    addStep = () => {
        this.props.steps[this.state.rows] = {};
        this.setState(({rows}) => ({rows: rows + 1}));
    };

    removeStep = () => {
        if (this.state.rows > 1) {
            this.props.steps[this.state.rows - 1] = {};
            this.setState(({rows}) => ({rows: rows - 1}));
        }
    };

    handleDateChange = (selectedTime, index) => {
        console.log(index);
        console.log(this.props.steps);
        this.props.steps[index].timer = selectedTime;
        console.log(selectedTime);
        this.props.onChange();
    };

    handleDescriptionChange = (event, index) => {
        this.props.steps[index].description = event.target.value;
        this.props.onChange();
    };

    componentDidMount() {
        this.setState({rows: this.props.steps.length});
        console.log(this.props.steps);
        if (this.state.rows < 1)
            this.addStep();
    }


    render() {
        const {steps, error, t} = this.props;

        return (
            <div>
                {Array.from({length: this.state.rows}, (_, index) => (
                    <Form.Row className="mb-4" key={index}>

                        <Form.Label>
                            <Trans i18nKey="Recipe.instructions"/>
                        </Form.Label>
                        <TooltipHover placement="right" message={<Trans>instructions.title</Trans>}
                                      icon={<FontAwesomeIcon className="tooltip-recipe"
                                                             icon={faInfoCircle}/>}/>

                        <div className="fullWidth">
                            <div className="div-textarea float-left">
                                <Form.Control as="textarea" name="instructions" className="step-textarea"
                                              value={steps[index] === undefined ? '' : steps[index].description}
                                              placeholder={t('recipe.stepPlaceholder', {stepNumber: index + 1})}
                                              onChange={event => this.handleDescriptionChange(event, index)}
                                              isInvalid={error !== undefined && !!error[index]}
                                />
                                <Form.Control.Feedback type="invalid">
                                    <Trans>{error !== undefined ? error[index] : ''}</Trans>
                                </Form.Control.Feedback>
                            </div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <TimePicker
                                    value={(steps[index] === undefined || steps[index].timer === undefined) ? defaultDate : steps[index].timer}
                                    onChange={value => this.handleDateChange(value, index)}
                                    className="step-timepicker"
                                    ampm={false}
                                    openTo="minutes"
                                    views={["minutes", "seconds"]}
                                    format="mm:ss"
                                    label="Minutes and seconds"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton className="no-outline">
                                                    <AccessAlarm/>
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </div>

                    </Form.Row>
                ))}

                <div className="form-row mb-4">
                    <Button variant="danger" className="new-ingredient-btn"
                            onClick={this.removeStep}>
                        <DeleteIcon/>
                        <Trans i18nKey="Recipe.removeStep"/>
                    </Button>
                    <button type="button" className="btn btn-green new-ingredient-btn"
                            onClick={this.addStep}>
                        <AddCircleIcon/>
                        <Trans i18nKey="Recipe.addStep"/>
                    </button>
                </div>
            </div>
        )
    }
}


const Extended = withTranslation()(StepsEditor);
Extended.static = StepsEditor.static;

export default Extended;