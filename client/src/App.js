import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// Components 
import Login from "./components/Login";
import BubblePage from './components/BubblePage';
import PrivateRoute from './components/PrivateRoute';

import "./styles.scss";

function App() {
  const [colorList, setColorList] = useState([]);
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/protected">Bubble Page</Link>
          </li>
        </ul>
        <Switch>
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <PrivateRoute exact path="/protected" component={BubblePage} />
        {/* <Route path="/login" component={Login} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
