import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
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
import {NotificationContainer} from 'react-notifications';

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route component={DefaultContainer}/>
            </Switch>
        </Router>
    );
}

const DefaultContainer = () => (
    <div>
        <Switch>
            <Route path="/registration-confirm/:token" component={Confirm}/>
            <Route component={Sidebar}/>
        </Switch>
        <Switch>
            <Route path="/registration-confirm/:token"/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/recipe/:id" component={Recipe}/>
            <Route exact path="/create_recipe" component={RecipeEditor}/>
            <PrivateRoute exact path="/edit_recipe/:recipeId" component={RecipeEditor}/>
            <Route exact path="/cooklist/:cooklistId" component={CooklistRecipes}/>
            <Route exact path="/users" component={Users}/>
            <Route path="/user/:userId/:section" component={UserView}/>

            <Route render={() =>
                <section className="main_container">
                    <Error error="404"/>
                </section>}/>
        </Switch>
        <NotificationContainer/>
    </div>
);

export default App;