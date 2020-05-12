import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect
} from 'react-router-dom';
import Home from './views/Home';
import Recipe from './views/Recipe';
import Login from './views/Login';
import Register from './views/Register'
import Sidebar from './components/General/Sidebar';
import RecipeEditor from "./views/RecipeEditor";
import Users from "./views/Users";
import UserView from "./views/User/UserView";
import Error from "./components/General/Error";
import CooklistRecipes from "./views/CooklistRecipes";
import PrivateRoute from "./components/PrivateRoute";
import Confirm from "./views/Confirm";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/(login)" component={LoginContainer}/>
                <Route exact path="/(register)" component={LoginContainer}/>
                <Route component={DefaultContainer}/>
            </Switch>
        </Router>
    );
}

const LoginContainer = () => (
    <div className="fullHeight">
        <Route exact path="/" render={() => <Redirect to="/login"/>}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
    </div>
);

const DefaultContainer = () => (
    <div>
        <Switch>
            <Route path="/registration-confirm/:token" component={Confirm}/>
            <Route component={Sidebar}/>
        </Switch>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/recipe/:id" component={Recipe}/>
            <Route exact path="/create_recipe" component={RecipeEditor}/>
            <PrivateRoute exact path="/edit_recipe/:recipeId" component={RecipeEditor}/>
            <Route exact path="/cooklist/:cooklistId" component={CooklistRecipes}/>
            <Route exact path="/users" component={Users}/>
            <Route path="/user/:userId/:section" component={UserView}/>
            <Route path="/registration-confirm/:token"/>

            <Route render={() =>
                <section className="main_container">
                    <Error error="404"/>
                </section>}/>
        </Switch>
    </div>
);

export default App;