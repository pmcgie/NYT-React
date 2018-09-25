import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Main from "./components/Main";

// const App = () => (<Router>
//     <div>
//       <Switch>
//         <Route path="/" component={Main} />
//       </Switch>
//     </div>
//   </Router>);

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