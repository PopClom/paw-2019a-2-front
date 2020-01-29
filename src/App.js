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
import Sidebar from './components/Sidebar';

function App({t}) {
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
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
    </div>
);

const DefaultContainer = () => (
    <div>
        <Route path='/:id?' component={Sidebar}/>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/recipe/:id" component={Recipe}/>
        </Switch>
    </div>
);

export default App;
