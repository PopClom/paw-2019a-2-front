import React from 'react';
import axios from "axios";
import {refresh} from "../helpers/auth";
import {SERVER_ADDR} from "../constants";
import Spinner from "../components/General/Spinner";
import Error from "../components/General/Error";

class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
    }

    componentDidMount() {
        const token = this.props.match.params.token;
        axios.post(`${SERVER_ADDR}/registration/tokens/${token}`,
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
                </section> : <Error error="400"/>
        );
    }
}

export default Confirm;