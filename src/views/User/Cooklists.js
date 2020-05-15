import React from 'react';
import Button from "react-bootstrap/Button";
import {Trans} from "react-i18next";
import SimpleCard from "../../components/General/SimpleCard";
import {isMyUser} from "../../helpers";
import AddCooklistModal from "../../components/Modal/AddCooklistModal";
import axios from "axios";
import {SERVER_ADDR} from "../../constants";
import Spinner from "../../components/General/Spinner";
import TooltipHover from "../../components/General/TooltipHover";

class Cooklists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchingCooklist: true,
            cooklists: [],
            showAddModal: false,
        }
    }

    handleAddCooklist = (name) => {
        axios.post(`${SERVER_ADDR}/cooklists/`, {name: name}).then(response =>
            this.setState({cooklists: [...this.state.cooklists, response.data]})
        );
    };

    componentDidMount() {
        this.loadData(this.props);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.user.id !== prevProps.user.id) {
            this.setState({fetchingCooklist: true}, () => {
                this.loadData(this.props);
            });
        }
    }

    loadData(props) {
        axios.get(`${SERVER_ADDR}/cooklists/user/${props.user.id}`).then(response =>
            this.setState({cooklists: response.data.cooklists, fetchingCooklist: false}));
    }

    toggleAddModal = () => {
        this.setState({showAddModal: !this.state.showAddModal});
    };

    render() {
        const {fetchingCooklist, cooklists, showAddModal} = this.state;
        const {user} = this.props;

        return (
            <section>
                {isMyUser(user.id) ?
                    <h4 className="navigation-title pt-3"><Trans i18nKey="myCooklists"/></h4> :
                    <h4 className="navigation-title pt-3"><Trans i18nKey="cooklist.title"
                                                                 values={{0: user.username}}/></h4>}

                {fetchingCooklist ?
                    <section className="browse">
                        <Spinner/>
                    </section> :
                    <section>
                        <section className="browse">
                            {cooklists.length === 0 ?
                                (isMyUser(user.id) ?
                                    <h3 className="navigation-subtitle">
                                        <Trans i18nKey="noCookListsMy"/>
                                    </h3> :
                                    <h3 className="navigation-subtitle">
                                        <Trans i18nKey="noCookLists" values={{0: user.username}}/>
                                    </h3>) :
                                <div className="card-deck">
                                    {Object.keys(cooklists).map(idx => <SimpleCard key={idx} title={cooklists[idx].name}
                                                                                   link={`/cooklist/${cooklists[idx].id}`}/>)}
                                </div>}
                        </section>
                    </section>}

                <AddCooklistModal showModal={showAddModal} toggleModal={this.toggleAddModal} addCooklist={this.handleAddCooklist}/>

                {isMyUser(user.id) &&
                    <TooltipHover placement="top" message={<Trans>cooklist.addTitle</Trans>} icon={
                        <Button className="btn-green add" onClick={this.toggleAddModal}>+</Button>
                    }/>
                }
            </section>
        );
    }
}

export default Cooklists;