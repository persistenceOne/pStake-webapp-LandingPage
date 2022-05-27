import React from "react";
import { Route, Switch, BrowserRouter as Router  } from 'react-router-dom';
import './css/style.css';
import './App.css';

import RouteNotFound from './components/RouteNotFound';
import HomePage from './webpages/Homepage';
const App = () => {

  return (
      <>
          <Router>

              <React.Suspense fallback={<div>&nbsp;</div>}>

              <Switch>
                  <Route path="/" component={HomePage} />

                  <Route component={RouteNotFound}/>
        </Switch>
          </React.Suspense>

</Router>
      </>

  );
}

export default App;



