import React from 'react';
import axios from "axios";
import {refresh} from "../helpers/auth";
import {SERVER_ADDR} from "../constants";
import Spinner from "../components/General/Spinner";

class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
    }

    componentDidMount() {
        const token = this.props.match.params.token;
        axios.post(`${SERVER_ADDR}/users/registration-confirm/${token}`,
            {headers: {'content-type': 'application/x-www-form-urlencoded;charset=utf-8'}}).then(response => {
            localStorage.setItem("token", response.data);
            refresh().then(() => this.props.history.replace(`/`));
        }).catch(() => this.setState({error: true}));
    }

    render() {
        return (
            !this.state.error ?
                <section className="main_container">
                    <section className="browse">
                        <Spinner/>
                    </section>
                </section> : 'Ocurrió un error'
        );
    }
}

export default Confirm;