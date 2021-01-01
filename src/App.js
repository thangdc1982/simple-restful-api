import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Todos from './Todos';
import TodoForm from './TodoForm';

function App() {
  const LinkStyle = {
    "textDecoration": "none"
  };


  return (
    <div className="container">      
      <Router>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link to="/" className="nav-link active" style={LinkStyle}>
              Todo List
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/addTodo" className="nav-link" style={LinkStyle}>
              Add New Todo
            </Link>
          </li>          
        </ul>
        <Switch>
          <Route path="/" exact>
            <Todos />
          </Route>
          <Route path="/addTodo">
            <div>
              <h1>New Todo Item</h1>            
              <div>
                <TodoForm />
              </div>
            </div>
          </Route>
        </Switch>
      </Router>                
    </div>
  );
}

export default App;
