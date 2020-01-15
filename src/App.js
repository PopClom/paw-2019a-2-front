import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './views/Home';
import Recipe from './views/Recipe';
import Sidebar from './components/Sidebar';

function App() {
  return (
      <Router>
          <Route path='/:id?' component={Sidebar} />
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/recipe/:id" component={Recipe} />
          </Switch>
      </Router>
  );
}

export default App;
