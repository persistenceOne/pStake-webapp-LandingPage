import React, {useEffect} from "react";
import {Route, Routes, useLocation} from "react-router-dom"
import './css/style.css';
import './App.css';
import ReactGA from 'react-ga4';

import RouteNotFound from './components/RouteNotFound';
import HomePage from './webpages/Homepage';
import {ANALYTICS_MEASURE_ID} from "./constants/config";

ReactGA.initialize(ANALYTICS_MEASURE_ID)

const trackPage = page => {
    ReactGA.set({ page });
    ReactGA.send(page);
};

const App = () => {
    let location = useLocation();

    useEffect(() => {
        const page = location.pathname;
        trackPage(page);
    }, [location]);

  return (
      <>
          <Routes>
              <Route
                  path='/'
                  element={
                      <HomePage/>
                  }
              />
              <Route
                  element={
                      <RouteNotFound/>
                  }
              />
          </Routes>

      </>

  );
}

export default App;



