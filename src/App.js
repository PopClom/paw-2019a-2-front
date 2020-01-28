import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './views/Home';
import Recipe from './views/Recipe';
import Login from './views/Login'
import Sidebar from './components/Sidebar';

function App({t}) {
    return (
        <Router>
            <Route path='/:id?' component={Sidebar}/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/recipe/:id" component={Recipe}/>
                <Route exact path="/login" component={Login}/>
            </Switch>
        </Router>
    );
}

export default App;
