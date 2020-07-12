import React from 'react';
import { Link } from "react-router-dom";
import { Trans } from 'react-i18next';
import foodifyInlineImg from '../../assets/img/foodify_inline.png';
import {isLoggedIn, logout} from "../../helpers/auth";

const options = [{id: 'home', label: 'Home', path: '/'},
                 {id: 'users', label: 'Users', path: '/users'},
                 {id: 'myAccount', label: 'myAccount', path: '/user/me/account', subitems:
                         [
                             {id: 'recipes', label: 'recipes', path: '/user/me/recipes'},
                             {id: 'cooklists', label: 'lists', path: '/user/me/cooklists'},
                             {id: 'ingredients', label: 'ingredients', path: '/user/me/ingredients'},
                             {id: 'recentlyCooked', label: 'recentlyCooked', path: '/user/me/recently_cooked'},
                             {id: 'favouriteRecipes', label: 'favouriteRecipes', path: '/user/me/favourite_recipes'},
                             {id: 'statistics', label: 'myStatistics', path: '/user/me/statistics'}
                         ]
                 }];

class Sidebar extends React.Component {
    render() {
        const loggedIn = isLoggedIn();
        const path = this.props.location.pathname;

        return (
            <section className="navigation">
                <Link className="bg-transparent" to="/">
                    <img className="nav_logo" src={foodifyInlineImg} alt="logo"/>
                </Link>
                {options.map(option =>
                    (option.id !== 'myAccount' || loggedIn) &&
                    <div key={option.id} className="navigation__list">
                        <div className={"main-item-sidebar" + (path === option.path ? " item_active" : "")}>
                            <Link className={'float_left'} to={option.path}>
                                <Trans i18nKey={option.label}/>
                            </Link>
                        </div>
                        {option.subitems &&
                            <div className="sub-item-sidebar">
                                {option.subitems.map(item =>
                                    <Link key={item.id} to={item.path}
                                          className={"navigation__list__item" + (path === item.path ? " item_active" : "")}>
                                        <Trans i18nKey={item.label}/>
                                    </Link>
                                )}
                            </div>
                        }
                    </div>
                )}

                <div className="navigation__list">
                    <div className="main-item-sidebar log-out-sidebar">
                        {loggedIn ?
                            <Link className="float-left" onClick={logout} to={`/login`}>
                                <Trans i18nKey="logOut"/>
                            </Link>
                             :
                            <Link className="float-left" to={{ pathname: '/login', from: window.location.pathname }}>
                                <Trans i18nKey="logIn"/>
                            </Link>
                        }
                    </div>
                </div>
            </section>
        );
    }
}

export default Sidebar;