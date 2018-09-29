import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Main from "./Sections/Main";

class App extends React.Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route path="/" 
            component={Main}
             />
          </Switch>
      </Router>
    );
  }
}

export default App;