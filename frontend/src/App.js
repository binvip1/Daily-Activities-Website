import React from 'react';
import './App.css';
import Nav from './navigate'
import TodoApp from './TodoApp'
import Home from './HomePage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/TodoApp" component={TodoApp}/>
        </Switch>
      </div>
    </Router>
  );
}



export default App;
