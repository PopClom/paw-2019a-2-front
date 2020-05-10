import React from 'react';
import { Link } from "react-router-dom";
import { Trans } from 'react-i18next';
import foodifyInlineImg from '../../assets/img/foodify_inline.png';
import {isLoggedIn, logout} from "../../helpers/auth";

const options = [{id: 'home', label: 'Home', path: '/'},
                 {id: 'users', label: 'Users', path: '/users'},
                 {id: 'myAccount', label: 'myAccount', path: '/my_account', subitems:
                         [
                             {id: 'recipes', label: 'recipes', path: '/my_recipes'},
                             {id: 'cooklists', label: 'lists', path: '/my_cooklists'},
                             {id: 'ingredients', label: 'myIngredients', path: '/my_ingredients'},
                             {id: 'recentlyCooked', label: 'recentlyCooked', path: '/recently_cooked'},
                             {id: 'favouriteRecipes', label: 'yourFavourites', path: '/favourite_recipes'},
                             {id: 'statistics', label: 'myStatistics', path: '/statistics'}
                         ]
                 }];

class Sidebar extends React.Component {
    render() {
        const loggedIn = isLoggedIn();
        const path = this.props.match.params.id ? '/' + this.props.match.params.id : '/';

        return (
            <section className="navigation">
                <Link className="bg-transparent" to="/">
                    <img className="nav_logo" src={foodifyInlineImg} alt="logo"/>
                </Link>
                {options.map(option =>
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
                            <Link className="float-left" to={`/login`}>
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