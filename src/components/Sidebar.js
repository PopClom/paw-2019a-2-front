import React from 'react';
import { Link } from "react-router-dom";
import { Trans } from 'react-i18next';
import foodifyInlineImg from '../assets/img/foodify_inline.png';

const options = [{id: 'home', label: 'Home', path: '/'},
                 {id: 'users', label: 'Users', path: '/users'},
                 {id: 'myAccount', label: 'My account', path: '/my_account', subitems:
                         [
                             {id: 'recipes', label: 'Recipes', path: '/my_recipes'},
                             {id: 'cooklists', label: 'Cooklists', path: '/my_cooklists'},
                             {id: 'ingredients', label: 'Ingredientes', path: '/my_ingredients'},
                             {id: 'recentlyCooked', label: 'Recently cooked', path: '/recently_cooked'},
                             {id: 'favouriteRecipes', label: 'Favourite recipes', path: '/favourite_recipes'},
                             {id: 'statistics', label: 'Statistics', path: '/statistics'}
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
                                <Trans>{option.label}</Trans>
                            </Link>
                        </div>
                        {option.subitems &&
                            <div className="sub-item-sidebar">
                                {option.subitems.map(item =>
                                    <Link key={item.id} to={item.path}
                                          className={"navigation__list__item" + (path === item.path ? " item_active" : "")}>
                                        <Trans>{item.label}</Trans>
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
                                <Trans>Log Out</Trans>
                            </a> :
                            <a className="float-left" href="/login">
                                <Trans>Log In</Trans>
                            </a>
                        }
                    </div>
                </div>
            </section>
        );
    }
}

export default Sidebar;