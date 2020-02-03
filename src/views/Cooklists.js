import React from 'react';
import Button from "react-bootstrap/Button";
import {Trans} from "react-i18next";
import SimpleCard from "../components/SimpleCard";
import {isMyUser} from "../helpers";
import AddCooklistModal from "../components/AddCooklistModal";

class Cooklists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            cooklists: [],
            userId: 0,
            showAddModal: false
        }
    }

    componentDidMount() {
        this.setState({fetching: false});
    }

    toggleAddModal = () => {
        this.setState({showAddModal: !this.state.showAddModal});
    };

    render() {
        const {t} = this.props;
        const {fetching, cooklists, userId, showAddModal} = this.state;

        return (

            <section>
                <section className="main_container">
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

                    <section className="side-card-container">
                        <div className="card">
                            <div className="card-body card-body-user-bar" id="user-big-card">
                                Barrita
                            </div>
                        </div>
                    </section>
                </section>


                <AddCooklistModal showModal={this.state.showAddModal} toggleModal={this.toggleAddModal}/>
                <Button className="btn-green add" onClick={this.toggleAddModal}>
                    +
                </Button>
            </section>
        )
            ;
    }
}

export default Cooklists;