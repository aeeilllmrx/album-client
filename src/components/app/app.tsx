import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import { Finder } from '../finder/finder';
import { Header } from '../header/header';
import { Map } from '../map/map';
import { Viewer } from '../viewer/viewer';

export function App() {
  const [content, setContent] = useState('');

  const countries = ['Greece', 'India', 'Argentina'];

  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <Header />
                <Map setTooltipCountry={setContent} />
                <ReactTooltip>{content}</ReactTooltip>
              </div>
            )}
          />
          <Route
            exact
            path="/home"
            render={() => (
              <div>
                <Header />
                <Map setTooltipCountry={setContent} />
                <ReactTooltip>{content}</ReactTooltip>
              </div>
            )}
          />
          <Route
            path="/travel/random"
            render={() => (
              <Redirect
                to={
                  '/travel/' +
                  countries[Math.floor(Math.random() * countries.length)]
                }
              />
            )}
          />
          <Route
            path="/travel/:country"
            render={(props) => (
              <div>
                <Header />
                <Viewer country={props.match.params.country} />
              </div>
            )}
          />
          <Route
            path="/search/:text"
            render={(props) => (
              <div>
                <Header />
                <Finder text={props.match.params.text} />
              </div>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}
