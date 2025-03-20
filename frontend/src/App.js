import logo from './logo.svg';
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// components
import { GeoPoints } from './containers/GeoPoints';

function App() {
  return (
    <Router>
      <Switch>
        // 登録地点一覧ページ
        <Route
          exaxt
          path="/geo_points">
          <GeoPoints />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
