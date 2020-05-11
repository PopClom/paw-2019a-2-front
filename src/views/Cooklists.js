import React from 'react';
import Button from "react-bootstrap/Button";
import {Trans} from "react-i18next";
import SimpleCard from "../components/General/SimpleCard";
import {isMyUser} from "../helpers";
import AddCooklistModal from "../components/Modal/AddCooklistModal";
import UserBar from "../components/User/UserBar";
import axios from "axios";
import {SERVER_ADDR} from "../constants";
import {getUser} from "../helpers/auth";
import Spinner from "../components/General/Spinner";
import TooltipHover from "../components/General/TooltipHover";

class Cooklists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchingCooklist: true,
            fetchingUser: true,
            cooklists: [],
            showAddModal: false,
            user: {}
        }
    }

    handleAddCooklist = (name) => {
        axios.post(`${SERVER_ADDR}/cooklists/`, {name: name}).then(response =>
            this.setState({cooklists: [...this.state.cooklists, response.data]})
            //this.props.history.push(`/cooklists/${this.state.cooklist.user.id}`);
        );
    };

    componentDidMount() {
        this.loadData(this.props);
    };

    componentWillReceiveProps(nextProps) {
        this.setState({fetchingCooklist: true, fetchingUser: true}, () => {
            this.loadData(nextProps);
        });
    }

    loadData(props) {
        let userId = props.match.params.userId;
        if (userId === undefined) {
            userId = getUser().id;
            this.setState({user: getUser(), fetchingUser: false});
        } else {
            axios.get(`${SERVER_ADDR}/users/${userId}`).then(response =>
                this.setState({user: response.data, fetchingUser: false}));
        }
        axios.get(`${SERVER_ADDR}/cooklists/user/${userId}`).then(response =>
            this.setState({cooklists: response.data.cooklists, fetchingCooklist: false}));
    }

    toggleAddModal = () => {
        this.setState({showAddModal: !this.state.showAddModal});
    };

    render() {
        const {fetchingCooklist, fetchingUser, cooklists, showAddModal, user} = this.state;

        return (

            <section>
                <section className="main_container">
                    {fetchingCooklist || fetchingUser ?
                        <section className="browse">
                            <Spinner/>
                        </section> :
                        <section>
                            {isMyUser(user.id) ?
                                <h4 className="navigation-title pt-3"><Trans i18nKey="myCooklists"/></h4>
                                :
                                /*TODO*/
                                <h4 className="navigation-title pt-3"><Trans i18nKey="cooklist.title"
                                values={{0: user.username}}/></h4>
                            }
                            <section className="browse">

                                {cooklists.length === 0 ?
                                    (
                                        isMyUser(user.id) ?
                                            <h3 className="navigation-subtitle">
                                                <Trans i18nKey="noCookListsMy"/>
                                            </h3>
                                            :
                                            <h3 className="navigation-subtitle">
                                                <Trans i18nKey="noCookLists" values={{0: user.username}}/>
                                            </h3>
                                    ) : ''
                                }

                                <div className="card-deck">
                                    {Object.keys(cooklists).map(idx => <SimpleCard key={idx} title={cooklists[idx].name}
                                                                                   link={`/cooklist/${cooklists[idx].id}`}/>)}
                                </div>
                            </section>
                            <UserBar user={user}/>
                        </section>}
                </section>


                <AddCooklistModal showModal={showAddModal} toggleModal={this.toggleAddModal} addCooklist={this.handleAddCooklist}/>
                <TooltipHover placement="top" message={<Trans>cooklist.addTitle</Trans>} icon={
                    <Button className="btn-green add" onClick={this.toggleAddModal}>
                        <div style={{marginBottom: "25%"}}>+</div>
                    </Button>
                }/>
            </section>
        )
            ;
    }
}

export default Cooklists;