import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import OverviewPage from './pages/overview-page';
import OfficesPage from './pages/offices-page';
import RoomsPage from './pages/rooms-page';
import store from "./store"

import './App.css';
import './index.css';
import 'semantic-ui-css/semantic.min.css';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={OverviewPage} />
        <Route exact path="/:_id" component={OfficesPage} />
        <Route exact path="/:_id/:_office" component={RoomsPage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'));
