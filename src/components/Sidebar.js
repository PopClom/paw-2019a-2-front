import React from 'react';
import { Link } from "react-router-dom";
import { Trans } from 'react-i18next';
import foodifyInlineImg from '../assets/img/foodify_inline.png';

const options = [{id: 'home', label: 'Home', path: '/'},
                 {id: 'users', label: 'Users', path: '/users'},
                 {id: 'myAccount', label: 'myAccount', path: '/my_account', subitems:
                         [
                             {id: 'recipes', label: 'recipes', path: '/my_recipes'},
                             {id: 'cooklists', label: 'myCooklists', path: '/my_cooklists'},
                             {id: 'ingredients', label: 'myIngredients', path: '/my_ingredients'},
                             {id: 'recentlyCooked', label: 'recentlyCooked', path: '/recently_cooked'},
                             {id: 'favouriteRecipes', label: 'yourFavourites', path: '/favourite_recipes'},
                             {id: 'statistics', label: 'myStatistics', path: '/statistics'}
                         ]
                 }];
const loggedIn = false;

class Sidebar extends React.Component {
    render() {
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
                            <a className="float-left" href="/logout">
                                <Trans i18nKey="logOut"/>
                            </a> :
                            <a className="float-left" href="/login">
                                <Trans i18nKey="logIn"/>
                            </a>
                        }
                    </div>
                </div>
            </section>
        );
    }
}

export default Sidebar;