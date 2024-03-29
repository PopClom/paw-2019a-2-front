import React from 'react';
import {Trans, withTranslation} from 'react-i18next';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {Form} from "react-bootstrap";
import TooltipHover from "../General/TooltipHover";
import {MuiPickersUtilsProvider, TimePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
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
        this.props.steps.forEach(step => {
            if (step.seconds) {
                const m = Math.floor(step.seconds / 60);
                const s = step.seconds % 60;
                step.timer = new Date(defaultDate);
                step.timer.setSeconds(s);
                step.timer.setMinutes(m);
                step.timerChecked = true;
            }
        });
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
        this.props.steps[index].timer = selectedTime;
        this.props.steps[index].seconds = selectedTime.getMinutes() * 60 + selectedTime.getSeconds();
        this.props.onChange();
    };

    handleSwitchChange = (event, index) => {
        this.props.steps[index].timerChecked = event.target.checked;
        if (event.target.checked) {
            if (this.props.steps[index].timer)
                this.handleDateChange(this.props.steps[index].timer, index);
        } else {
            this.props.steps[index].seconds = 0;
        }
        this.props.onChange();
    };

    handleDescriptionChange = (event, index) => {
        this.props.steps[index].description = event.target.value;
        this.props.onChange();
    };

    componentDidMount() {
        this.setState({rows: this.props.steps.length}, ()  => {
            if (this.state.rows < 1)
                this.addStep();
        });
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
                                    <Trans i18nKey={error !== undefined ? error[index] : ''} values={{0: "10", 1: "1000"}}/>
                                </Form.Control.Feedback>
                            </div>
                            <div className="float-right">
                                <div className="step-timepicker step-timerswitch-text"><Form.Check
                                    type="switch"
                                    checked={steps[index].timerChecked ? steps[index].timerChecked : false}
                                    onChange={value => this.handleSwitchChange(value, index)}
                                    id={`step-timer-${index}`}
                                    label={<Trans>timer.timer</Trans>}
                                /></div>
                                <br/>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <TimePicker
                                        disabled={!steps[index].timerChecked}
                                        value={(steps[index] === undefined || steps[index].timer === undefined) ? defaultDate : steps[index].timer}
                                        onChange={value => this.handleDateChange(value, index)}
                                        className="step-timepicker"
                                        ampm={false}
                                        openTo="minutes"
                                        views={["minutes", "seconds"]}
                                        format="mm:ss"
                                        label=<Trans i18nKey="Recipe.minutesAndSeconds"/>
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
                            </div>
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </div>

                    </Form.Row>
                ))}

                <div className="form-row mb-4">
                    <Button className="new-ingredient-btn"
                            onClick={this.removeStep}>
                        <DeleteIcon/>
                        <Trans i18nKey="Recipe.removeStep"/>
                    </Button>
                    <button type="button" className="btn btn-green new-ingredient-btn"
                            onClick={this.addStep}>
                        <AddCircleIcon/>&nbsp;
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