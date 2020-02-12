import React from 'react';
import Button from "react-bootstrap/Button";
import {Trans} from "react-i18next";
import SimpleCard from "../components/SimpleCard";
import {isMyUser} from "../helpers";
import AddCooklistModal from "../components/AddCooklistModal";
import UserBar from "../components/UserBar";
import axios from "axios";
import {SERVER_ADDR} from "../constants";
import {getUser} from "../helpers/auth";
import Spinner from "../components/Spinner";

class Cooklists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            cooklists: [],
            showAddModal: false,
            user: {}
        }
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        if (userId !== undefined)
            axios.get(`${SERVER_ADDR}/users/${userId}`).then(response =>
                this.setState({user: response.data, fetching: false}));
        else
            this.setState({user: getUser(), fetching: false})
    }

    toggleAddModal = () => {
        this.setState({showAddModal: !this.state.showAddModal});
    };

    render() {
        const {fetching, cooklists, userId, showAddModal, user} = this.state;

        return (

            <section>
                <section className="main_container">
                    {fetching ?
                        <section className="browse">
                            <Spinner/>
                        </section> :
                        <section>
                            {isMyUser(userId) ?
                                <h4 className="navigation-title pt-3"><Trans i18nKey="myCooklists"/></h4>
                                :
                                /*TODO*/
                                <h4 className="navigation-title pt-3"><Trans i18nKey="cooklist.title" values={{0:  "NOMBRE DE USUARIO"}}/></h4>
                            }
                            <section className="browse">

                                {Array.isArray(cooklists) && cooklists.length ?
                                    (
                                        isMyUser(userId) ?
                                            <h3 className="navigation-subtitle">
                                                <Trans i18nKey="noCookListsMy"/>
                                            </h3>
                                            :
                                            <h3 className="navigation-subtitle">
                                                <Trans i18nKey="noCookLists" arguments="${user.username}"/>
                                            </h3>
                                    ) : ''
                                }

                                <div className="card-deck">
                                    {Object.keys(cooklists).map(idx => <SimpleCard key={idx} title={cooklists[idx].name}
                                                                                   link={`/recipe/${cooklists[idx].id}`}/>)}
                                </div>
                            </section>
                            <UserBar user={user}/>
                        </section>}
                </section>


                <AddCooklistModal showModal={showAddModal} toggleModal={this.toggleAddModal}/>
                <Button className="btn-green add" onClick={this.toggleAddModal}>
                    +
                </Button>
            </section>
        )
            ;
    }
}

export default Cooklists;